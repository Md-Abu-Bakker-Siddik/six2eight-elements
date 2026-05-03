/**
 * Before/after comparison + custom center-mode carousel (vanilla JS, no Swiper).
 */
(function () {
	"use strict";

	function clamp(value, min, max) {
		return Math.min(max, Math.max(min, value));
	}

	function initCompare(root) {
		if (!root || root.nodeType !== 1) {
			return;
		}
		if (root.getAttribute("data-s2e-compare-init") === "1") {
			return;
		}
		root.setAttribute("data-s2e-compare-init", "1");

		var inner = root.querySelector(".s2e-compare__inner");
		var afterLayer = root.querySelector(".s2e-compare__after");
		var handle = root.querySelector(".s2e-compare__handle");
		var knob = root.querySelector(".s2e-compare__handle-knob");
		if (!inner || !afterLayer) {
			return;
		}

		function stopCarouselBubble(e) {
			e.stopPropagation();
		}

		if (handle) {
			handle.addEventListener("pointerdown", stopCarouselBubble, true);
			handle.addEventListener("touchstart", stopCarouselBubble, { passive: true, capture: true });
			handle.addEventListener("mousedown", stopCarouselBubble, true);
		}
		if (knob) {
			knob.addEventListener("pointerdown", stopCarouselBubble, true);
			knob.addEventListener("touchstart", stopCarouselBubble, { passive: true, capture: true });
			knob.addEventListener("mousedown", stopCarouselBubble, true);
		}
		root.querySelectorAll(".s2e-transformation__badge").forEach(function (badge) {
			badge.addEventListener("pointerdown", stopCarouselBubble, true);
			badge.addEventListener("touchstart", stopCarouselBubble, { passive: true, capture: true });
			badge.addEventListener("mousedown", stopCarouselBubble, true);
		});

		var dragging = false;
		var activePointerId = null;
		var captureEl = null;

		function setPosition(clientX) {
			var rect = inner.getBoundingClientRect();
			if (!rect.width) {
				return;
			}
			var x = clientX - rect.left;
			var p = clamp((x / rect.width) * 100, 0, 100);
			afterLayer.style.clipPath = "inset(0 0 0 " + p + "%)";
			if (handle) {
				handle.style.left = p + "%";
				handle.setAttribute("aria-valuenow", String(Math.round(p)));
			}
		}

		function detachDocumentListeners() {
			document.removeEventListener("pointermove", onDocumentPointerMove, true);
			document.removeEventListener("pointerup", onDocumentPointerUp, true);
			document.removeEventListener("pointercancel", onDocumentPointerUp, true);
		}

		function stopDrag(e) {
			if (!dragging) {
				return;
			}
			dragging = false;
			activePointerId = null;
			detachDocumentListeners();
			if (e && typeof e.pointerId === "number" && captureEl) {
				try {
					captureEl.releasePointerCapture(e.pointerId);
				} catch (err) {
					/* noop */
				}
			}
			captureEl = null;
		}

		function onDocumentPointerMove(e) {
			if (!dragging) {
				return;
			}
			if (activePointerId !== null && e.pointerId !== activePointerId) {
				return;
			}
			setPosition(e.clientX);
			e.preventDefault();
		}

		function onDocumentPointerUp(e) {
			stopDrag(e);
		}

		function onInnerPointerDown(e) {
			if (e.button !== undefined && e.button !== 0) {
				return;
			}
			if (e.target && e.target.closest && e.target.closest(".s2e-transformation__badge")) {
				e.stopPropagation();
				return;
			}
			if (e.target && e.target.closest && e.target.closest("a[href]")) {
				return;
			}
			e.stopPropagation();
			dragging = true;
			activePointerId = e.pointerId;
			captureEl = inner;
			try {
				inner.setPointerCapture(e.pointerId);
			} catch (err) {
				captureEl = null;
			}
			setPosition(e.clientX);
			e.preventDefault();
			document.addEventListener("pointermove", onDocumentPointerMove, true);
			document.addEventListener("pointerup", onDocumentPointerUp, true);
			document.addEventListener("pointercancel", onDocumentPointerUp, true);
		}

		function onLostPointerCapture() {
			if (!dragging) {
				return;
			}
			dragging = false;
			activePointerId = null;
			detachDocumentListeners();
			captureEl = null;
		}

		inner.addEventListener("pointerdown", onInnerPointerDown, { passive: false, capture: true });
		inner.addEventListener("lostpointercapture", onLostPointerCapture);

		window.addEventListener(
			"resize",
			function () {
				var p = 50;
				if (handle) {
					var left = handle.style.left;
					p = parseFloat(left);
					if (!isFinite(p) || left === "") {
						p = 50;
					}
					p = clamp(p, 0, 100);
					handle.style.left = p + "%";
				} else {
					var m = afterLayer.style.clipPath.match(/inset\(\s*0\s+0\s+0\s+([\d.]+)%\s*\)/);
					if (m) {
						p = clamp(parseFloat(m[1]), 0, 100);
					}
				}
				afterLayer.style.clipPath = "inset(0 0 0 " + clamp(p, 0, 100) + "%)";
			},
			{ passive: true }
		);

		var r = inner.getBoundingClientRect();
		setPosition(r.left + r.width * 0.5);
	}

	function initTransformationRack(section) {
		if (!section) {
			return;
		}
		var rack = section.querySelector("[data-s2e-transformation-rack]");
		var viewport = section.querySelector("[data-s2e-transformation-viewport]");
		var strip = section.querySelector("[data-s2e-transformation-strip]");
		if (!rack || !viewport || !strip) {
			return;
		}

		if (rack.__s2eRackDestroy) {
			try {
				rack.__s2eRackDestroy();
			} catch (e1) {
				/* noop */
			}
			rack.__s2eRackDestroy = null;
		}

		var originalCells = Array.prototype.slice.call(strip.querySelectorAll("[data-s2e-slide]"));
		var count = originalCells.length;
		if (!count) {
			return;
		}

		var nav = section.querySelector("[data-s2e-transformation-nav]");
		var prevBtn = section.querySelector("[data-s2e-carousel-prev]");
		var nextBtn = section.querySelector("[data-s2e-carousel-next]");
		var curEl = section.querySelector("[data-s2e-current]");
		var totalEl = section.querySelector("[data-s2e-total]");
		var autoplayMs = parseInt(section.getAttribute("data-s2e-autoplay-ms") || "0", 10);
		if (!isFinite(autoplayMs)) {
			autoplayMs = 0;
		}

		/**
		 * Clone first and last slides so the track can loop without visible gaps.
		 * Order: [clone of last] [real 0] … [real n-1] [clone of first]
		 */
		function prepareSlideClone(node) {
			var cloneEl = node.cloneNode(true);
			cloneEl.setAttribute("data-s2e-slide-clone", "1");
			cloneEl.classList.remove("is-active");
			cloneEl.querySelectorAll("[data-s2e-compare-init]").forEach(function (mark) {
				mark.removeAttribute("data-s2e-compare-init");
			});
			return cloneEl;
		}

		var useLoop = count > 1;
		var cells = [];
		var slideIndex = 0;
		var len = count;

		if (useLoop) {
			var firstOriginal = originalCells[0];
			var leadingLastClone = prepareSlideClone(originalCells[count - 1]);
			var trailingFirstClone = prepareSlideClone(originalCells[0]);
			strip.insertBefore(leadingLastClone, firstOriginal);
			strip.appendChild(trailingFirstClone);
			cells = Array.prototype.slice.call(strip.querySelectorAll("[data-s2e-slide]"));
			len = cells.length;
			var initSlide = parseInt(section.getAttribute("data-s2e-initial-slide") || "0", 10);
			if (!isFinite(initSlide) || initSlide < 0) {
				initSlide = 0;
			}
			if (initSlide > count - 1) {
				initSlide = count - 1;
			}
			slideIndex = initSlide + 1;
		} else {
			cells = originalCells.slice();
			slideIndex = 0;
		}

		var autoplayTimer = null;
		var imgListeners = [];
		var stripTransitionSmooth = "transform 0.7s cubic-bezier(0.25, 0.82, 0.25, 1)";
		var skipTransitionEnd = false;
		var loopJumpBusy = false;

		function getStripTranslateX() {
			var style = window.getComputedStyle(strip);
			var m = style.transform || style.webkitTransform;
			if (!m || m === "none") {
				return 0;
			}
			var mat = m.match(/matrix(?:3d)?\(([^)]+)\)/);
			if (!mat) {
				return 0;
			}
			var p = mat[1].split(",").map(function (s) {
				return parseFloat(String(s).trim(), 10);
			});
			if (p.length === 16) {
				return isFinite(p[12]) ? p[12] : 0;
			}
			return isFinite(p[4]) ? p[4] : 0;
		}

		function logicalDisplayIndex() {
			if (!useLoop) {
				return slideIndex + 1;
			}
			if (slideIndex === 0) {
				return count;
			}
			if (slideIndex === len - 1) {
				return 1;
			}
			return slideIndex;
		}

		function updateFraction() {
			var n = logicalDisplayIndex();
			if (curEl) {
				curEl.textContent = String(n);
			}
			if (totalEl) {
				totalEl.textContent = String(count);
			}
		}

		function initCompareOnActiveSlide() {
			var cell = cells[slideIndex];
			if (!cell) {
				return;
			}
			var root = cell.querySelector('[data-s2e-compare="1"]');
			if (root) {
				initCompare(root);
			}
		}

		function syncActiveClass() {
			cells.forEach(function (c, i) {
				c.classList.toggle("is-active", i === slideIndex);
			});
		}

		/**
		 * Center the active slide in the viewport.
		 * - Normal: move by delta from current translate (no snap to 0) so transitions stay smooth.
		 * - Instant: reset to 0, measure absolute translate (used after clone loop jump).
		 * - Clamp is skipped on clone endpoints so the loop jump does not fight the viewport clamp.
		 */
		function updateSlider(instant) {
			syncActiveClass();
			var active = cells[slideIndex];
			if (!active) {
				return;
			}

			var vRect = viewport.getBoundingClientRect();
			var vw = vRect.width;
			var onCloneEdge = useLoop && (slideIndex === 0 || slideIndex === len - 1);

			if (instant) {
				strip.style.transition = "none";
				strip.style.transform = "translate3d(0,0,0)";
				void strip.offsetWidth;
				var a0 = active.getBoundingClientRect();
				var s0 = strip.getBoundingClientRect();
				var sll0 = s0.left - vRect.left;
				var slr0 = s0.right - vRect.left;
				var center0 = vw * 0.5 - a0.width * 0.5;
				var ideal0 = center0 - (a0.left - vRect.left);
				var min0 = -sll0;
				var max0 = vw - slr0;
				var offset =
					onCloneEdge || max0 < min0
						? ideal0
						: clamp(ideal0, min0, max0);
				skipTransitionEnd = true;
				strip.style.transform = "translate3d(" + offset + "px,0,0)";
				void strip.offsetWidth;
				strip.style.transition = stripTransitionSmooth;
				requestAnimationFrame(function () {
					requestAnimationFrame(function () {
						requestAnimationFrame(function () {
							skipTransitionEnd = false;
						});
					});
				});
				return;
			}

			var aRect = active.getBoundingClientRect();
			var curX = getStripTranslateX();
			var center = vw * 0.5 - aRect.width * 0.5;
			var delta = center - (aRect.left - vRect.left);
			var nextX = curX + delta;
			if (!useLoop) {
				strip.style.transition = "none";
				strip.style.transform = "translate3d(0,0,0)";
				void strip.offsetWidth;
				aRect = active.getBoundingClientRect();
				var sRect = strip.getBoundingClientRect();
				var sll1 = sRect.left - vRect.left;
				var slr1 = sRect.right - vRect.left;
				var ideal1 = vw * 0.5 - aRect.width * 0.5 - (aRect.left - vRect.left);
				var mn = -sll1;
				var mx = vw - slr1;
				nextX = mx < mn ? ideal1 : clamp(ideal1, mn, mx);
			}

			strip.style.transition = stripTransitionSmooth;
			void strip.offsetWidth;
			strip.style.transform = "translate3d(" + nextX + "px,0,0)";
		}

		function layoutFromScratch() {
			updateSlider(false);
		}

		function syncNavDisabled() {
			if (prevBtn) {
				prevBtn.disabled = count <= 1;
			}
			if (nextBtn) {
				nextBtn.disabled = count <= 1;
			}
		}

		function go(delta) {
			if (count <= 1) {
				return;
			}
			var next = slideIndex + delta;
			if (useLoop) {
				next = clamp(next, 0, len - 1);
			} else if (next < 0 || next > len - 1) {
				return;
			}
			slideIndex = next;
			updateFraction();
			updateSlider(false);
			initCompareOnActiveSlide();
			syncNavDisabled();
		}

		function onStripTransitionEnd(e) {
			if (e.target !== strip || e.propertyName !== "transform") {
				return;
			}
			if (skipTransitionEnd || !useLoop || loopJumpBusy) {
				return;
			}
			if (slideIndex === len - 1) {
				loopJumpBusy = true;
				slideIndex = 1;
				updateFraction();
				updateSlider(true);
				initCompareOnActiveSlide();
				requestAnimationFrame(function () {
					loopJumpBusy = false;
				});
			} else if (slideIndex === 0) {
				loopJumpBusy = true;
				slideIndex = len - 2;
				updateFraction();
				updateSlider(true);
				initCompareOnActiveSlide();
				requestAnimationFrame(function () {
					loopJumpBusy = false;
				});
			}
		}

		if (useLoop) {
			strip.addEventListener("transitionend", onStripTransitionEnd);
		}

		function onPrevClick() {
			go(-1);
		}

		function onNextClick() {
			go(1);
		}

		function clearAutoplay() {
			if (autoplayTimer) {
				clearInterval(autoplayTimer);
				autoplayTimer = null;
			}
		}

		function startAutoplay() {
			clearAutoplay();
			if (count <= 1 || autoplayMs < 1500) {
				return;
			}
			autoplayTimer = window.setInterval(function () {
				go(1);
			}, Math.max(1500, autoplayMs));
		}

		function onResize() {
			updateSlider(false);
		}

		var dragSwipe = null;
		var dragThreshold = 48;

		function swipeTargetsCarousel(e) {
			var t = e.target;
			if (!t || !t.closest) {
				return false;
			}
			if (t.closest("[data-s2e-transformation-nav]")) {
				return false;
			}
			if (t.closest(".s2e-compare__handle")) {
				return false;
			}
			if (t.closest(".s2e-transformation__badge")) {
				return false;
			}
			var slide = t.closest("[data-s2e-slide]");
			if (slide) {
				if (slide.classList.contains("is-active") && t.closest(".s2e-compare__inner")) {
					return false;
				}
				return true;
			}
			return t === viewport;
		}

		function endDragSwipe(pointerId) {
			if (!dragSwipe || dragSwipe.id !== pointerId) {
				return;
			}
			try {
				viewport.releasePointerCapture(pointerId);
			} catch (eRel) {
				/* noop */
			}
			dragSwipe = null;
		}

		function onViewportPointerDown(e) {
			if (count <= 1) {
				return;
			}
			if (e.pointerType === "mouse" && e.button !== 0) {
				return;
			}
			if (!swipeTargetsCarousel(e)) {
				return;
			}
			dragSwipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
			try {
				viewport.setPointerCapture(e.pointerId);
			} catch (eCap) {
				/* noop */
			}
		}

		function onViewportPointerMove(e) {
			if (!dragSwipe || e.pointerId !== dragSwipe.id) {
				return;
			}
			var dx = e.clientX - dragSwipe.x;
			var dy = e.clientY - dragSwipe.y;
			if (Math.abs(dx) < dragThreshold || Math.abs(dx) < Math.abs(dy)) {
				return;
			}
			if (dx < 0) {
				go(1);
			} else {
				go(-1);
			}
			endDragSwipe(e.pointerId);
		}

		function onViewportPointerUp(e) {
			endDragSwipe(e.pointerId);
		}

		viewport.addEventListener("pointerdown", onViewportPointerDown);
		viewport.addEventListener("pointermove", onViewportPointerMove);
		viewport.addEventListener("pointerup", onViewportPointerUp);
		viewport.addEventListener("pointercancel", onViewportPointerUp);

		if (prevBtn) {
			prevBtn.addEventListener("click", onPrevClick);
		}
		if (nextBtn) {
			nextBtn.addEventListener("click", onNextClick);
		}

		window.addEventListener("resize", onResize, { passive: true });

		strip.querySelectorAll("img").forEach(function (img) {
			var fn = function () {
				layoutFromScratch();
			};
			if (img.complete) {
				fn();
			} else {
				img.addEventListener("load", fn, { once: true });
				imgListeners.push({ img: img, fn: fn });
			}
		});

		if (nav) {
			nav.style.display = count <= 1 ? "none" : "";
		}
		updateFraction();
		layoutFromScratch();
		initCompareOnActiveSlide();
		syncNavDisabled();
		startAutoplay();

		rack.__s2eRackDestroy = function () {
			clearAutoplay();
			window.removeEventListener("resize", onResize);
			if (useLoop) {
				strip.removeEventListener("transitionend", onStripTransitionEnd);
			}
			strip.querySelectorAll("[data-s2e-slide-clone]").forEach(function (cloneNode) {
				if (cloneNode.parentNode) {
					cloneNode.parentNode.removeChild(cloneNode);
				}
			});
			viewport.removeEventListener("pointerdown", onViewportPointerDown);
			viewport.removeEventListener("pointermove", onViewportPointerMove);
			viewport.removeEventListener("pointerup", onViewportPointerUp);
			viewport.removeEventListener("pointercancel", onViewportPointerUp);
			if (dragSwipe) {
				try {
					viewport.releasePointerCapture(dragSwipe.id);
				} catch (eEnd) {
					/* noop */
				}
				dragSwipe = null;
			}
			if (prevBtn) {
				prevBtn.removeEventListener("click", onPrevClick);
			}
			if (nextBtn) {
				nextBtn.removeEventListener("click", onNextClick);
			}
			imgListeners.forEach(function (entry) {
				entry.img.removeEventListener("load", entry.fn);
			});
			imgListeners = [];
			strip.style.transform = "";
			strip.style.transition = "";
		};
	}

	function initTransformationSection(section) {
		if (!section) {
			return;
		}
		initTransformationRack(section);
	}

	function bootDocument() {
		document.querySelectorAll(".s2e-transformation").forEach(initTransformationSection);
	}

	function scopeToElement(scope) {
		if (!scope) {
			return null;
		}
		if (scope.nodeType === 1) {
			return scope;
		}
		if (scope.jquery && scope[0]) {
			return scope[0];
		}
		return null;
	}

	function initInScope(scope) {
		var el = scopeToElement(scope);
		if (!el || !el.querySelectorAll) {
			return;
		}
		if (el.classList && el.classList.contains("s2e-transformation")) {
			initTransformationSection(el);
			return;
		}
		el.querySelectorAll(".s2e-transformation").forEach(initTransformationSection);
	}

	window.s2eEightReinitInScope = function (scope) {
		var el = scopeToElement(scope);
		if (!el) {
			return;
		}
		var sections = [];
		if (el.classList && el.classList.contains("s2e-transformation")) {
			sections.push(el);
		} else {
			sections = Array.prototype.slice.call(el.querySelectorAll(".s2e-transformation"));
		}
		if (!sections.length && el.closest) {
			var one = el.closest(".s2e-transformation");
			if (one) {
				sections.push(one);
			}
		}
		sections.forEach(function (sec) {
			var rack = sec.querySelector("[data-s2e-transformation-rack]");
			if (rack && rack.__s2eRackDestroy) {
				rack.__s2eRackDestroy();
			}
			sec.querySelectorAll("[data-s2e-compare-init]").forEach(function (node) {
				node.removeAttribute("data-s2e-compare-init");
			});
			initTransformationSection(sec);
		});
	};

	var elementorHooksRegistered = false;

	function registerElementorHooks() {
		var hooks = window.elementorFrontend && window.elementorFrontend.hooks;
		if (!hooks) {
			return false;
		}
		if (elementorHooksRegistered) {
			return true;
		}
		elementorHooksRegistered = true;
		var types = ["s2e-transformation-slider", "s2e-transformation-slider.default"];
		types.forEach(function (type) {
			hooks.addAction("frontend/element_ready/" + type, initInScope);
		});
		return true;
	}

	function tryRegisterElementorHooks(attemptsLeft) {
		if (registerElementorHooks()) {
			bootDocument();
			return;
		}
		if (attemptsLeft > 0) {
			setTimeout(function () {
				tryRegisterElementorHooks(attemptsLeft - 1);
			}, 80);
		}
	}

	function boot() {
		bootDocument();
		tryRegisterElementorHooks(80);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", boot);
	} else {
		boot();
	}
})();
