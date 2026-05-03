import { __ } from '@wordpress/i18n';
import { isEmpty } from '@wordpress/rich-text';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	Button,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { stripRichTextSoftBreaks } from './utils';

const SINGLE_LINE_RICH_TEXT_PROPS = {
	allowedFormats: [],
	disableLineBreaks: true,
};

export default function Edit({ attributes, setAttributes, clientId }) {
	const { accentText, headingText, steps } = attributes;
	const stepList = Array.isArray(steps) ? steps : [];

	const isSelected = useSelect(
		(select) => select(blockEditorStore).isBlockSelected(clientId),
		[clientId]
	);

	const showAccentField = !isEmpty(accentText) || isSelected;
	const showHeadingField = !isEmpty(headingText) || isSelected;
	const showHeader = showAccentField || showHeadingField;

	const blockProps = useBlockProps({
		className: 's2e-project-steps s2e-project-steps--editor',
	});

	const updateStep = (index, patch) => {
		const next = stepList.map((row, i) => (i === index ? { ...row, ...patch } : row));
		setAttributes({ steps: next });
	};

	const addStep = () => {
		setAttributes({
			steps: [
				...stepList,
				{
					number: '',
					title: __('New step', 'six2eight-elements'),
					description: '',
					active: true,
				},
			],
		});
	};

	const removeStep = (index) => {
		setAttributes({ steps: stepList.filter((_, i) => i !== index) });
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Steps', 'six2eight-elements')} initialOpen>
					<Button variant="primary" onClick={addStep}>
						{__('Add step', 'six2eight-elements')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div className="s2e-project-steps__inner">
				{showHeader ? (
					<header className="s2e-project-steps__header">
						{showAccentField ? (
							<RichText
								tagName="p"
								className="s2e-project-steps__accent"
								value={accentText}
								onChange={(v) =>
									setAttributes({ accentText: stripRichTextSoftBreaks(v) })
								}
								placeholder={__('Accent heading', 'six2eight-elements')}
								{...SINGLE_LINE_RICH_TEXT_PROPS}
							/>
						) : null}
						{showHeadingField ? (
							<RichText
								tagName="h2"
								className="s2e-project-steps__heading"
								value={headingText}
								onChange={(v) =>
									setAttributes({ headingText: stripRichTextSoftBreaks(v) })
								}
								placeholder={__('Main heading', 'six2eight-elements')}
								{...SINGLE_LINE_RICH_TEXT_PROPS}
							/>
						) : null}
					</header>
				) : null}

				<div className="s2e-project-steps__timeline">
					{stepList.map((step, index) => {
						const num =
							step.number && String(step.number).trim() !== ''
								? step.number
								: String(index + 1).padStart(2, '0');
						const itemClass =
							's2e-project-steps__item' + (step.active ? ' is-active' : '');
						return (
							<div className={itemClass} key={index}>
								<div className="s2e-project-steps__marker">
									<span className="s2e-project-steps__number">{num}</span>
								</div>
								<div className="s2e-project-steps__body">
									<TextControl
										label={__('Step number (optional)', 'six2eight-elements')}
										value={step.number}
										onChange={(v) => updateStep(index, { number: v })}
									/>
									<RichText
										tagName="h3"
										className="s2e-project-steps__step-title"
										value={step.title}
										onChange={(v) =>
											updateStep(index, { title: stripRichTextSoftBreaks(v) })
										}
										placeholder={__('Title', 'six2eight-elements')}
										{...SINGLE_LINE_RICH_TEXT_PROPS}
									/>
									<RichText
										tagName="p"
										className="s2e-project-steps__step-desc"
										value={step.description}
										onChange={(v) => updateStep(index, { description: v })}
										placeholder={__('Description', 'six2eight-elements')}
									/>
									<ToggleControl
										label={__('Active', 'six2eight-elements')}
										checked={!!step.active}
										onChange={(v) => updateStep(index, { active: v })}
									/>
									<Button
										isDestructive
										variant="link"
										onClick={() => removeStep(index)}
									>
										{__('Remove step', 'six2eight-elements')}
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
