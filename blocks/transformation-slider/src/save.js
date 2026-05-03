import { useBlockProps, RichText } from '@wordpress/block-editor';

function CompareSave({ slide }) {
	return (
		<div className="s2e-transformation__compare s2e-compare" data-s2e-compare="1">
			<div className="s2e-compare__inner">
				<div className="s2e-compare__layer s2e-compare__before">
					{slide.beforeUrl ? (
						<img src={slide.beforeUrl} alt="" loading="lazy" />
					) : null}
				</div>
				<div
					className="s2e-compare__layer s2e-compare__after"
					style={{ clipPath: 'inset(0 0 0 50%)' }}
				>
					{slide.afterUrl ? (
						<img src={slide.afterUrl} alt="" loading="lazy" />
					) : null}
				</div>
				<div
					className="s2e-compare__handle"
					role="slider"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={50}
					tabIndex={0}
					aria-label="Before and after"
				>
					<span className="s2e-compare__handle-knob" aria-hidden="true">
						<span className="s2e-compare__handle-arrows">{'\u2039\u203A'}</span>
					</span>
				</div>
				<span className="s2e-transformation__badge s2e-transformation__badge--before">
					{slide.beforeLabel || 'Before'}
				</span>
				<span className="s2e-transformation__badge s2e-transformation__badge--after">
					{slide.afterLabel || 'After'}
				</span>
			</div>
		</div>
	);
}

export default function save({ attributes }) {
	const {
		headlinePrefix,
		headlineAccent,
		subheadline,
		slides,
		mainIndex,
		showHeader = true,
		showNav = true,
		showNavArrows = true,
	} = attributes;

	const showArrowsInNav = showNav !== false && showNavArrows !== false;

	const sectionClass =
		's2e-transformation' + (showHeader === false ? ' s2e-transformation--header-off' : '');

	const count = slides.length || 1;
	const idx = Math.max(0, Math.min(mainIndex || 0, count - 1));

	const blockProps = useBlockProps.save({
		className: sectionClass,
		'data-s2e-transformation': '1',
		'data-s2e-slide-count': String(count),
		'data-s2e-initial-slide': String(idx),
		'data-s2e-autoplay-ms': '5000',
	});

	return (
		<section {...blockProps}>
			<div className="s2e-transformation__inner">
				{showHeader !== false ? (
					<header className="s2e-transformation__header">
						<h2 className="s2e-transformation__headline">
							<RichText.Content
								tagName="span"
								className="s2e-transformation__headline-sans"
								value={headlinePrefix}
							/>
							<RichText.Content
								tagName="span"
								className="s2e-transformation__headline-serif"
								value={headlineAccent}
							/>
						</h2>
						<RichText.Content
							tagName="p"
							className="s2e-transformation__sub"
							value={subheadline}
						/>
					</header>
				) : null}
				<div
					className={
						's2e-transformation__track' +
						(count <= 1 ? ' s2e-transformation__track--single' : '')
					}
					data-s2e-track
				>
					<div className="s2e-transformation__rack" data-s2e-transformation-rack>
						<div className="s2e-transformation__viewport" data-s2e-transformation-viewport>
							<div className="s2e-transformation__strip" data-s2e-transformation-strip>
								{slides.map((slide, i) => (
									<div
										className={
											's2e-transformation__cell' + (i === idx ? ' is-active' : '')
										}
										data-s2e-slide
										key={i}
									>
										<CompareSave slide={slide} />
									</div>
								))}
							</div>
						</div>
					</div>
					{showNav !== false ? (
						<nav className="s2e-transformation__nav" data-s2e-transformation-nav aria-label="Project slides">
							{showArrowsInNav ? (
								<button
									type="button"
									className="s2e-transformation__nav-btn s2e-transformation__nav-btn--prev"
									data-s2e-carousel-prev
									aria-label="Previous slide"
								>
									<span aria-hidden="true">&#8249;</span>
								</button>
							) : null}
							<span className="s2e-transformation__nav-fraction" aria-live="polite">
								<span data-s2e-current>1</span> / <span data-s2e-total>{count}</span>
							</span>
							{showArrowsInNav ? (
								<button
									type="button"
									className="s2e-transformation__nav-btn s2e-transformation__nav-btn--next"
									data-s2e-carousel-next
									aria-label="Next slide"
								>
									<span aria-hidden="true">&#8250;</span>
								</button>
							) : null}
						</nav>
					) : null}
				</div>
			</div>
		</section>
	);
}
