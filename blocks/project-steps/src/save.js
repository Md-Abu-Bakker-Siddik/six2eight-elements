import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { accentText, headingText, steps } = attributes;

	const blockProps = useBlockProps.save({
		className: 's2e-project-steps',
	});

	return (
		<section {...blockProps}>
			<div className="s2e-project-steps__inner">
				<header className="s2e-project-steps__header">
					<RichText.Content
						tagName="p"
						className="s2e-project-steps__accent"
						value={accentText}
					/>
					<RichText.Content
						tagName="h2"
						className="s2e-project-steps__heading"
						value={headingText}
					/>
				</header>
				<div className="s2e-project-steps__timeline">
					{steps.map((step, index) => {
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
									<RichText.Content
										tagName="h3"
										className="s2e-project-steps__step-title"
										value={step.title}
									/>
									<RichText.Content
										tagName="p"
										className="s2e-project-steps__step-desc"
										value={step.description}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
