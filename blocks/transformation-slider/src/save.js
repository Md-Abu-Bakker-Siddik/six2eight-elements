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
	} = attributes;

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
					<div className="swiper s2e-transformation__swiper" data-s2e-transformation-swiper>
						<div className="swiper-wrapper">
							{slides.map((slide, i) => (
								<div className="swiper-slide" key={i}>
									<CompareSave slide={slide} />
								</div>
							))}
						</div>
					</div>
					<nav className="s2e-transformation__nav" data-s2e-transformation-nav aria-label="Project slides">
						<button
							type="button"
							className="s2e-transformation__nav-btn s2e-transformation__nav-btn--prev"
							data-s2e-swiper-prev
							aria-label="Previous slide"
						>
							<span aria-hidden="true">&#8249;</span>
						</button>
						<span className="s2e-transformation__nav-fraction" aria-live="polite">
							<span data-s2e-current>1</span> / <span data-s2e-total>{count}</span>
						</span>
						<button
							type="button"
							className="s2e-transformation__nav-btn s2e-transformation__nav-btn--next"
							data-s2e-swiper-next
							aria-label="Next slide"
						>
							<span aria-hidden="true">&#8250;</span>
						</button>
					</nav>
				</div>
			</div>
		</section>
	);
}
