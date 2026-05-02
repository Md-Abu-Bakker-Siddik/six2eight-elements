import { __ } from '@wordpress/i18n';
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
} from '@wordpress/components';

function ComparePreview({ slide, position }) {
	const isMain = position === 'main';
	const before = slide.beforeUrl;
	const after = slide.afterUrl;
	const classes =
		's2e-transformation__compare s2e-compare' + (isMain ? ' is-main' : ' is-peek');

	return (
		<div className={classes} {...(isMain ? { 'data-s2e-compare': '1' } : {})}>
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
				{isMain ? (
					<div className="s2e-compare__handle" role="presentation" tabIndex={-1}>
						<span className="s2e-compare__handle-knob" aria-hidden="true">
							<span className="s2e-compare__handle-arrows">&lt; &gt;</span>
						</span>
					</div>
				) : null}
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
	const { headlinePrefix, headlineAccent, subheadline, slides, mainIndex } = attributes;

	const blockProps = useBlockProps({
		className: 's2e-transformation s2e-transformation--editor',
	});

	const count = slides.length || 1;
	const idx = Math.max(0, Math.min(mainIndex, count - 1));
	const prev = (idx - 1 + count) % count;
	const next = (idx + 1) % count;

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
		<section {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Slides', 'six2eight-elements')} initialOpen>
					<RangeControl
						label={__('Center slide index', 'six2eight-elements')}
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

				<div className="s2e-transformation__track" data-s2e-track>
					{count > 1 ? (
						<ComparePreview slide={slides[prev]} position="peek" />
					) : null}
					<ComparePreview slide={slides[idx]} position="main" />
					{count > 1 ? (
						<ComparePreview slide={slides[next]} position="peek" />
					) : null}
				</div>
			</div>
		</section>
	);
}