import { __ } from '@wordpress/i18n';
import { useRef, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

function ComparePreview({ slide }) {
	const before = slide.beforeUrl;
	const after = slide.afterUrl;

	return (
		<div className="s2e-transformation__compare s2e-compare" data-s2e-compare="1">
			<div className="s2e-compare__inner">
				<div className="s2e-compare__layer s2e-compare__before">
					{before ? <img src={before} alt="" /> : null}
				</div>
				<div
					className="s2e-compare__layer s2e-compare__after"
					style={{ clipPath: 'inset(0 0 0 50%)' }}
				>
					{after ? <img src={after} alt="" /> : null}
				</div>
				<div className="s2e-compare__handle" role="presentation" tabIndex={-1}>
					<span className="s2e-compare__handle-knob" aria-hidden="true">
						<span className="s2e-compare__handle-arrows">{'\u2039\u203A'}</span>
					</span>
				</div>
				<span className="s2e-transformation__badge s2e-transformation__badge--before">
					{slide.beforeLabel || __('Before', 'six2eight-elements')}
				</span>
				<span className="s2e-transformation__badge s2e-transformation__badge--after">
					{slide.afterLabel || __('After', 'six2eight-elements')}
				</span>
			</div>
		</div>
	);
}

export default function Edit({ attributes, setAttributes }) {
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
		's2e-transformation s2e-transformation--editor' +
		(showHeader === false ? ' s2e-transformation--header-off' : '');

	const ref = useRef(null);
	const blockProps = useBlockProps({
		ref,
		className: sectionClass,
		'data-s2e-transformation': '1',
	});

	const count = slides.length || 1;
	const idx = Math.max(0, Math.min(mainIndex, count - 1));

	useEffect(() => {
		if (typeof window !== 'undefined' && window.s2eEightReinitInScope && ref.current) {
			window.s2eEightReinitInScope(ref.current);
		}
	}, [slides, mainIndex, showHeader, showNav, showNavArrows]);

	const updateSlide = (index, patch) => {
		const nextSlides = slides.map((row, i) =>
			i === index ? { ...row, ...patch } : row
		);
		setAttributes({ slides: nextSlides });
	};

	const addSlide = () => {
		setAttributes({
			slides: [
				...slides,
				{
					beforeId: 0,
					beforeUrl: '',
					afterId: 0,
					afterUrl: '',
					beforeLabel: __('Before', 'six2eight-elements'),
					afterLabel: __('After', 'six2eight-elements'),
				},
			],
		});
	};

	const removeSlide = (index) => {
		if (slides.length < 2) {
			return;
		}
		const nextSlides = slides.filter((_, i) => i !== index);
		setAttributes({
			slides: nextSlides,
			mainIndex: Math.min(mainIndex, nextSlides.length - 1),
		});
	};

	return (
		<section
			{...blockProps}
			data-s2e-slide-count={String(count)}
			data-s2e-initial-slide={String(idx)}
			data-s2e-autoplay-ms="5000"
		>
			<InspectorControls>
				<PanelBody title={__('Layout', 'six2eight-elements')} initialOpen>
					<ToggleControl
						label={__('Show header (headline + sub)', 'six2eight-elements')}
						checked={showHeader !== false}
						onChange={(v) => setAttributes({ showHeader: v })}
					/>
					<ToggleControl
						label={__('Show navigation bar', 'six2eight-elements')}
						help={__(
							'Counter and arrows live in this bar. Turn off to hide the whole bar.',
							'six2eight-elements'
						)}
						checked={showNav !== false}
						onChange={(v) => setAttributes({ showNav: v })}
					/>
					<ToggleControl
						label={__('Show prev / next arrows', 'six2eight-elements')}
						help={__(
							'Slide counter stays visible when arrows are hidden.',
							'six2eight-elements'
						)}
						checked={showNavArrows !== false}
						onChange={(v) => setAttributes({ showNavArrows: v })}
						disabled={showNav === false}
					/>
				</PanelBody>
				<PanelBody title={__('Slides', 'six2eight-elements')} initialOpen>
					<RangeControl
						label={__('Initial centered slide', 'six2eight-elements')}
						min={0}
						max={Math.max(0, count - 1)}
						value={idx}
						onChange={(v) => setAttributes({ mainIndex: v })}
					/>
					<Button variant="primary" onClick={addSlide}>
						{__('Add comparison', 'six2eight-elements')}
					</Button>
				</PanelBody>
				{slides.map((slide, index) => (
					<PanelBody
						key={index}
						title={__('Comparison', 'six2eight-elements') + ' ' + (index + 1)}
						initialOpen={false}
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									updateSlide(index, {
										beforeId: media.id,
										beforeUrl: media.url,
									})
								}
								allowedTypes={['image']}
								value={slide.beforeId}
								render={({ open }) => (
									<Button variant="secondary" onClick={open}>
										{slide.beforeUrl
											? __('Replace before', 'six2eight-elements')
											: __('Before image', 'six2eight-elements')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									updateSlide(index, {
										afterId: media.id,
										afterUrl: media.url,
									})
								}
								allowedTypes={['image']}
								value={slide.afterId}
								render={({ open }) => (
									<Button variant="secondary" onClick={open} style={{ marginTop: 8 }}>
										{slide.afterUrl
											? __('Replace after', 'six2eight-elements')
											: __('After image', 'six2eight-elements')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						<TextControl
							label={__('Before label', 'six2eight-elements')}
							value={slide.beforeLabel}
							onChange={(v) => updateSlide(index, { beforeLabel: v })}
						/>
						<TextControl
							label={__('After label', 'six2eight-elements')}
							value={slide.afterLabel}
							onChange={(v) => updateSlide(index, { afterLabel: v })}
						/>
						<Button
							isDestructive
							variant="link"
							onClick={() => removeSlide(index)}
							disabled={slides.length < 2}
						>
							{__('Remove comparison', 'six2eight-elements')}
						</Button>
					</PanelBody>
				))}
			</InspectorControls>

			<div className="s2e-transformation__inner">
				{showHeader !== false ? (
					<header className="s2e-transformation__header">
						<h2 className="s2e-transformation__headline">
							<RichText
								tagName="span"
								className="s2e-transformation__headline-sans"
								value={headlinePrefix}
								onChange={(v) => setAttributes({ headlinePrefix: v })}
								placeholder={__('See the', 'six2eight-elements')}
								allowedFormats={[]}
							/>
							<RichText
								tagName="span"
								className="s2e-transformation__headline-serif"
								value={headlineAccent}
								onChange={(v) => setAttributes({ headlineAccent: v })}
								placeholder={__('Transformation', 'six2eight-elements')}
								allowedFormats={[]}
							/>
						</h2>
						<RichText
							tagName="p"
							className="s2e-transformation__sub"
							value={subheadline}
							onChange={(v) => setAttributes({ subheadline: v })}
							placeholder={__('Supporting copy', 'six2eight-elements')}
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
										<ComparePreview slide={slide} />
									</div>
								))}
							</div>
						</div>
					</div>
					{showNav !== false ? (
						<nav
							className="s2e-transformation__nav"
							data-s2e-transformation-nav
							aria-label={__('Project slides', 'six2eight-elements')}
						>
							{showArrowsInNav ? (
								<button
									type="button"
									className="s2e-transformation__nav-btn s2e-transformation__nav-btn--prev"
									data-s2e-carousel-prev
									aria-label={__('Previous slide', 'six2eight-elements')}
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
									aria-label={__('Next slide', 'six2eight-elements')}
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
