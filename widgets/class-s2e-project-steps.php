<?php
/**
 * Elementor: Project Steps (vertical timeline).
 *
 * @package Six2eight_Elements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Repeater;
use Elementor\Widget_Base;

/**
 * Class S2E_Project_Steps
 */
class S2E_Project_Steps extends Widget_Base {

	/**
	 * Widget slug.
	 */
	public function get_name() {
		return 's2e-project-steps';
	}

	/**
	 * Title.
	 */
	public function get_title() {
		return esc_html__( 'S2E Project Steps', 'six2eight-elements' );
	}

	/**
	 * Icon.
	 */
	public function get_icon() {
		return 'eicon-time-line';
	}

	/**
	 * Category.
	 */
	public function get_categories() {
		return array( S2E_Elements_Elementor::CATEGORY_SLUG );
	}

	/**
	 * Keywords.
	 */
	public function get_keywords() {
		return array( 'timeline', 'steps', 'process', 'six2eight' );
	}

	/**
	 * Style deps.
	 */
	public function get_style_depends() {
		return array( S2E_Elements_Assets::STYLE_HANDLE );
	}

	/**
	 * Script deps.
	 */
	public function get_script_depends() {
		return array();
	}

	/**
	 * Register controls.
	 */
	protected function register_controls() {
		$this->register_content_section();
		$this->register_style_section();
	}

	/**
	 * Content tab.
	 */
	private function register_content_section() {
		$this->start_controls_section(
			'section_content',
			array(
				'label' => esc_html__( 'Content', 'six2eight-elements' ),
			)
		);

		$this->add_control(
			'accent_heading',
			array(
				'label'       => esc_html__( 'Accent Heading', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => esc_html__( 'A Proven Process', 'six2eight-elements' ),
				'label_block' => true,
			)
		);

		$this->add_control(
			'main_heading',
			array(
				'label'       => esc_html__( 'Main Heading', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => esc_html__( 'for Floors That Last', 'six2eight-elements' ),
				'label_block' => true,
			)
		);

		$repeater = new Repeater();

		$repeater->add_control(
			'step_number',
			array(
				'label'       => esc_html__( 'Step Number', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '01',
				'description' => esc_html__( 'Leave empty to auto-number from order.', 'six2eight-elements' ),
			)
		);

		$repeater->add_control(
			'step_title',
			array(
				'label'       => esc_html__( 'Title', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => esc_html__( 'Step Title', 'six2eight-elements' ),
				'label_block' => true,
			)
		);

		$repeater->add_control(
			'step_description',
			array(
				'label'       => esc_html__( 'Description', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXTAREA,
				'default'     => esc_html__( 'Describe this step of your process.', 'six2eight-elements' ),
				'rows'        => 4,
				'label_block' => true,
			)
		);

		$repeater->add_control(
			'step_active',
			array(
				'label'        => esc_html__( 'Active', 'six2eight-elements' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'Yes', 'six2eight-elements' ),
				'label_off'    => esc_html__( 'No', 'six2eight-elements' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			)
		);

		$this->add_control(
			'steps_list',
			array(
				'label'       => esc_html__( 'Steps', 'six2eight-elements' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => array(
					array(
						'step_title'       => esc_html__( 'Surface Preparation', 'six2eight-elements' ),
						'step_description' => esc_html__( 'We begin by deep-cleaning the surface to remove contaminants and ensure a strong bond.', 'six2eight-elements' ),
						'step_active'      => 'yes',
					),
					array(
						'step_title'       => esc_html__( 'Surface Readiness', 'six2eight-elements' ),
						'step_description' => esc_html__( 'Once prepped, we assess and refine the surface so it is ready for the coating system.', 'six2eight-elements' ),
						'step_active'      => 'yes',
					),
					array(
						'step_title'       => esc_html__( 'System Application', 'six2eight-elements' ),
						'step_description' => esc_html__( 'A specialized primer is applied, followed by the topcoat layers to specification.', 'six2eight-elements' ),
						'step_active'      => '',
					),
					array(
						'step_title'       => esc_html__( 'Cure & Set', 'six2eight-elements' ),
						'step_description' => esc_html__( 'Unlike traditional systems, this process cures efficiently so you can return to use sooner.', 'six2eight-elements' ),
						'step_active'      => '',
					),
				),
				'title_field' => '{{{ step_title }}}',
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Style tab.
	 */
	private function register_style_section() {
		$this->start_controls_section(
			'section_layout',
			array(
				'label' => esc_html__( 'Layout & Background', 'six2eight-elements' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'content_max_width',
			array(
				'label'      => esc_html__( 'Content Max Width', 'six2eight-elements' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array(
					'px' => array(
						'min' => 320,
						'max' => 900,
					),
					'%'  => array(
						'min' => 50,
						'max' => 100,
					),
				),
				'default'    => array(
					'size' => 640,
					'unit' => 'px',
				),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-project-steps__inner' => 'max-width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'section_padding',
			array(
				'label'      => esc_html__( 'Section Padding', 'six2eight-elements' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-project-steps' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'default'    => array(
					'top'    => '64',
					'right'  => '40',
					'bottom' => '64',
					'left'   => '40',
					'unit'   => 'px',
				),
			)
		);

		$this->add_responsive_control(
			'inner_padding',
			array(
				'label'      => esc_html__( 'Content inset (inner)', 'six2eight-elements' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'description' => esc_html__( 'Extra padding around the heading and timeline (helps text clear tight columns).', 'six2eight-elements' ),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-project-steps__inner' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'default'    => array(
					'top'    => '0',
					'right'  => '24',
					'bottom' => '0',
					'left'   => '24',
					'unit'   => 'px',
				),
			)
		);

		$this->add_responsive_control(
			'step_body_padding',
			array(
				'label'      => esc_html__( 'Step text padding', 'six2eight-elements' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'description' => esc_html__( 'Padding around each step title and description.', 'six2eight-elements' ),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-project-steps__body' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'default'    => array(
					'top'    => '0',
					'right'  => '16',
					'bottom' => '0',
					'left'   => '0',
					'unit'   => 'px',
				),
			)
		);

		$this->add_group_control(
			\Elementor\Group_Control_Background::get_type(),
			array(
				'name'     => 'section_background',
				'label'    => esc_html__( 'Background', 'six2eight-elements' ),
				'types'    => array( 'classic', 'gradient' ),
				'selector' => '{{WRAPPER}} .s2e-project-steps',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_typography',
			array(
				'label' => esc_html__( 'Typography', 'six2eight-elements' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'accent_typography',
				'label'    => esc_html__( 'Accent Heading', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-project-steps__accent',
			)
		);

		$this->add_control(
			'accent_color',
			array(
				'label'     => esc_html__( 'Accent Color', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__accent' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'heading_typography',
				'label'    => esc_html__( 'Main Heading', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-project-steps__heading',
			)
		);

		$this->add_control(
			'heading_color',
			array(
				'label'     => esc_html__( 'Main Heading Color', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__heading' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'step_title_typography',
				'label'    => esc_html__( 'Step Title', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-project-steps__step-title',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'step_desc_typography',
				'label'    => esc_html__( 'Step Description', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-project-steps__step-desc',
			)
		);

		$this->add_control(
			'step_number_color',
			array(
				'label'     => esc_html__( 'Step Number Text', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#0a1921',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__number' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'step_number_bg',
			array(
				'label'     => esc_html__( 'Step Number Background', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__number' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'timeline_line_color',
			array(
				'label'       => esc_html__( 'Timeline Line', 'six2eight-elements' ),
				'description' => esc_html__( 'Used at the top of the line; it fades toward the bottom automatically.', 'six2eight-elements' ),
				'type'        => Controls_Manager::COLOR,
				'default'     => 'rgba(255, 255, 255, 0.38)',
				'selectors'   => array(
					'{{WRAPPER}} .s2e-project-steps__timeline' => '--s2e-steps-line: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_states',
			array(
				'label' => esc_html__( 'Active / Inactive Steps', 'six2eight-elements' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'active_title_color',
			array(
				'label'     => esc_html__( 'Active Title', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__item.is-active .s2e-project-steps__step-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'active_desc_color',
			array(
				'label'     => esc_html__( 'Active Description', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => 'rgba(255, 255, 255, 0.78)',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__item.is-active .s2e-project-steps__step-desc' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'inactive_title_color',
			array(
				'label'     => esc_html__( 'Inactive Title', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => 'rgba(255, 255, 255, 0.48)',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__item:not(.is-active) .s2e-project-steps__step-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'inactive_desc_color',
			array(
				'label'     => esc_html__( 'Inactive Description', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => 'rgba(255, 255, 255, 0.36)',
				'selectors' => array(
					'{{WRAPPER}} .s2e-project-steps__item:not(.is-active) .s2e-project-steps__step-desc' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'step_spacing',
			array(
				'label'                => esc_html__( 'Space Between Steps', 'six2eight-elements' ),
				'description'          => esc_html__( 'Set separately for desktop, tablet, and mobile in the responsive icons.', 'six2eight-elements' ),
				'type'                 => Controls_Manager::SLIDER,
				'size_units'           => array( 'px' ),
				'devices'              => array( 'desktop', 'tablet', 'mobile' ),
				'frontend_available'   => true,
				'range'                => array(
					'px' => array(
						'min' => 0,
						'max' => 160,
					),
				),
				'default'              => array(
					'size' => 120,
					'unit' => 'px',
				),
				'tablet_default'       => array(
					'size' => 72,
					'unit' => 'px',
				),
				'mobile_default'       => array(
					'size' => 48,
					'unit' => 'px',
				),
				'selectors'            => array(
					'{{WRAPPER}} .s2e-project-steps__item + .s2e-project-steps__item' => 'margin-top: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'header_margin_bottom',
			array(
				'label'      => esc_html__( 'Header Bottom Spacing', 'six2eight-elements' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'default'    => array(
					'size' => 32,
					'unit' => 'px',
				),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-project-steps__header' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Render widget output on the frontend.
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();

		S2E_Elements_Assets::enqueue_frontend();

		$accent = isset( $settings['accent_heading'] ) ? $settings['accent_heading'] : '';
		$main   = isset( $settings['main_heading'] ) ? $settings['main_heading'] : '';

		?>
		<section class="s2e-project-steps">
			<div class="s2e-project-steps__inner">
				<header class="s2e-project-steps__header">
					<?php if ( $accent ) : ?>
						<p class="s2e-project-steps__accent"><?php echo esc_html( $accent ); ?></p>
					<?php endif; ?>
					<?php if ( $main ) : ?>
						<h2 class="s2e-project-steps__heading"><?php echo esc_html( $main ); ?></h2>
					<?php endif; ?>
				</header>
				<div class="s2e-project-steps__timeline">
					<?php
					$index = 0;
					foreach ( $settings['steps_list'] as $item ) {
						++$index;
						$num    = ! empty( $item['step_number'] ) ? $item['step_number'] : str_pad( (string) $index, 2, '0', STR_PAD_LEFT );
						$active = ( isset( $item['step_active'] ) && 'yes' === $item['step_active'] );
						$class  = 's2e-project-steps__item' . ( $active ? ' is-active' : '' );
						?>
						<div class="<?php echo esc_attr( $class ); ?>">
							<div class="s2e-project-steps__marker">
								<span class="s2e-project-steps__number"><?php echo esc_html( $num ); ?></span>
							</div>
							<div class="s2e-project-steps__body">
								<?php if ( ! empty( $item['step_title'] ) ) : ?>
									<h4 class="s2e-project-steps__step-title"><?php echo esc_html( $item['step_title'] ); ?></h4>
								<?php endif; ?>
								<?php if ( ! empty( $item['step_description'] ) ) : ?>
									<p class="s2e-project-steps__step-desc"><?php echo esc_html( $item['step_description'] ); ?></p>
								<?php endif; ?>
							</div>
						</div>
						<?php
					}
					?>
				</div>
			</div>
		</section>
		<?php
	}
}
