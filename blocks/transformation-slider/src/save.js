import { useBlockProps, RichText } from '@wordpress/block-editor';

function CompareSave({ slide, position }) {
	const isMain = position === 'main';
	const classes =
		's2e-transformation__compare s2e-compare' + (isMain ? ' is-main' : ' is-peek');

	return (
		<div className={classes} {...(isMain ? { 'data-s2e-compare': '1' } : {})}>
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
				{isMain ? (
					<div
						className="s2e-compare__handle"
						role="slider"
						aria-valuemin="0"
						aria-valuemax="100"
						aria-valuenow="50"
						tabIndex={0}
					>
						<span className="s2e-compare__handle-knob" aria-hidden="true">
							<span className="s2e-compare__handle-arrows">&lt; &gt;</span>
						</span>
					</div>
				) : null}
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
	const { headlinePrefix, headlineAccent, subheadline, slides, mainIndex } = attributes;

	const blockProps = useBlockProps.save({
		className: 's2e-transformation',
	});

	const count = slides.length || 1;
	const idx = Math.max(0, Math.min(mainIndex || 0, count - 1));
	const prev = (idx - 1 + count) % count;
	const next = (idx + 1) % count;

	return (
		<section {...blockProps} data-s2e-transformation>
			<div className="s2e-transformation__inner">
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
				<div className="s2e-transformation__track" data-s2e-track>
					{count > 1 ? (
						<CompareSave slide={slides[prev]} position="peek" />
					) : null}
					<CompareSave slide={slides[idx]} position="main" />
					{count > 1 ? (
						<CompareSave slide={slides[next]} position="peek" />
					) : null}
				</div>
			</div>
		</section>
	);
}