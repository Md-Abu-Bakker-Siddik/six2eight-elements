<?php
/**
 * Elementor: Transformation (before/after) slider.
 *
 * @package Six2eight_Elements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Image_Size;
use Elementor\Repeater;
use Elementor\Widget_Base;

/**
 * Class S2E_Transformation_Slider
 */
class S2E_Transformation_Slider extends Widget_Base {

	/**
	 * Widget slug.
	 */
	public function get_name() {
		return 's2e-transformation-slider';
	}

	/**
	 * Title.
	 */
	public function get_title() {
		return esc_html__( 'S2E Transformation Slider', 'six2eight-elements' );
	}

	/**
	 * Icon.
	 */
	public function get_icon() {
		return 'eicon-slider-push';
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
		return array( 'before', 'after', 'comparison', 'slider', 'six2eight' );
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
		return array( S2E_Elements_Assets::SCRIPT_HANDLE );
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
			'section_header',
			array(
				'label' => esc_html__( 'Header', 'six2eight-elements' ),
			)
		);

		$this->add_control(
			'show_header',
			array(
				'label'        => esc_html__( 'Show Header', 'six2eight-elements' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'Yes', 'six2eight-elements' ),
				'label_off'    => esc_html__( 'Off', 'six2eight-elements' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			)
		);

		$this->add_control(
			'headline_prefix',
			array(
				'label'       => esc_html__( 'Headline (Sans)', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => esc_html__( 'See the', 'six2eight-elements' ),
				'label_block' => true,
				'condition'   => array(
					'show_header' => 'yes',
				),
			)
		);

		$this->add_control(
			'headline_accent',
			array(
				'label'       => esc_html__( 'Headline (Serif Accent)', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => esc_html__( 'Transformation', 'six2eight-elements' ),
				'label_block' => true,
				'condition'   => array(
					'show_header' => 'yes',
				),
			)
		);

		$this->add_control(
			'subheadline',
			array(
				'label'       => esc_html__( 'Subheadline', 'six2eight-elements' ),
				'type'        => Controls_Manager::TEXTAREA,
				'default'     => esc_html__( 'See how homeowners across the region are transforming garages, driveways, and outdoor areas into cleaner, safer, more usable spaces.', 'six2eight-elements' ),
				'rows'        => 4,
				'label_block' => true,
				'condition'   => array(
					'show_header' => 'yes',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_slides',
			array(
				'label' => esc_html__( 'Comparisons', 'six2eight-elements' ),
			)
		);

		$repeater = new Repeater();

		$repeater->add_control(
			'before_image',
			array(
				'label' => esc_html__( 'Before Image', 'six2eight-elements' ),
				'type'  => Controls_Manager::MEDIA,
			)
		);

		$repeater->add_control(
			'after_image',
			array(
				'label' => esc_html__( 'After Image', 'six2eight-elements' ),
				'type'  => Controls_Manager::MEDIA,
			)
		);

		$repeater->add_control(
			'before_label',
			array(
				'label'   => esc_html__( 'Before Label', 'six2eight-elements' ),
				'type'    => Controls_Manager::TEXT,
				'default' => esc_html__( 'Before', 'six2eight-elements' ),
			)
		);

		$repeater->add_control(
			'after_label',
			array(
				'label'   => esc_html__( 'After Label', 'six2eight-elements' ),
				'type'    => Controls_Manager::TEXT,
				'default' => esc_html__( 'After', 'six2eight-elements' ),
			)
		);

		$this->add_control(
			'slides',
			array(
				'label'       => esc_html__( 'Slides', 'six2eight-elements' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => array(
					array(),
				),
				'title_field' => esc_html__( 'Comparison', 'six2eight-elements' ),
			)
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			array(
				'name'    => 'slide_images',
				'default' => 'large',
			)
		);

		$this->add_control(
			'carousel_autoplay',
			array(
				'label'        => esc_html__( 'Autoplay', 'six2eight-elements' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'Yes', 'six2eight-elements' ),
				'label_off'    => esc_html__( 'No', 'six2eight-elements' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			)
		);

		$this->add_control(
			'carousel_autoplay_delay',
			array(
				'label'       => esc_html__( 'Autoplay interval (ms)', 'six2eight-elements' ),
				'type'        => Controls_Manager::NUMBER,
				'min'         => 2000,
				'max'         => 20000,
				'step'        => 500,
				'default'     => 5000,
				'condition'   => array(
					'carousel_autoplay' => 'yes',
				),
			)
		);

		$this->add_control(
			'carousel_show_nav',
			array(
				'label'       => esc_html__( 'Navigation bar', 'six2eight-elements' ),
				'description' => esc_html__( 'Show the row below the slider (counter and optional arrows). Turn off to hide the entire bar.', 'six2eight-elements' ),
				'type'        => Controls_Manager::SWITCHER,
				'label_on'    => esc_html__( 'Show', 'six2eight-elements' ),
				'label_off'   => esc_html__( 'Hide', 'six2eight-elements' ),
				'return_value' => 'yes',
				'default'     => 'yes',
			)
		);

		$this->add_control(
			'carousel_show_arrows',
			array(
				'label'        => esc_html__( 'Prev / Next arrows', 'six2eight-elements' ),
				'description'  => esc_html__( 'Show arrow buttons inside the navigation bar (counter stays if arrows are off).', 'six2eight-elements' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'Show', 'six2eight-elements' ),
				'label_off'    => esc_html__( 'Hide', 'six2eight-elements' ),
				'return_value' => 'yes',
				'default'      => 'yes',
				'condition'    => array(
					'carousel_show_nav' => 'yes',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Style tab.
	 */
	private function register_style_section() {
		$this->start_controls_section(
			'section_wrap',
			array(
				'label' => esc_html__( 'Section', 'six2eight-elements' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			\Elementor\Group_Control_Background::get_type(),
			array(
				'name'     => 'wrap_background',
				'label'    => esc_html__( 'Background', 'six2eight-elements' ),
				'types'    => array( 'classic', 'gradient' ),
				'selector' => '{{WRAPPER}} .s2e-transformation',
			)
		);

		$this->add_responsive_control(
			'wrap_padding',
			array(
				'label'      => esc_html__( 'Padding', 'six2eight-elements' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-transformation' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'default'    => array(
					'top'    => '72',
					'right'  => '24',
					'bottom' => '72',
					'left'   => '24',
					'unit'   => 'px',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_header_style',
			array(
				'label'     => esc_html__( 'Header Typography', 'six2eight-elements' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'show_header' => 'yes',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'headline_sans_typography',
				'label'    => esc_html__( 'Headline Sans', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-transformation__headline-sans',
			)
		);

		$this->add_control(
			'headline_sans_color',
			array(
				'label'     => esc_html__( 'Headline Sans Color', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#111111',
				'selectors' => array(
					'{{WRAPPER}} .s2e-transformation__headline-sans' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'headline_accent_typography',
				'label'    => esc_html__( 'Headline Serif', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-transformation__headline-serif',
			)
		);

		$this->add_control(
			'headline_accent_color',
			array(
				'label'     => esc_html__( 'Headline Serif Color', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#1b3d54',
				'selectors' => array(
					'{{WRAPPER}} .s2e-transformation__headline-serif' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'sub_typography',
				'label'    => esc_html__( 'Subheadline', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-transformation__sub',
			)
		);

		$this->add_control(
			'sub_color',
			array(
				'label'     => esc_html__( 'Subheadline Color', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#6b7280',
				'selectors' => array(
					'{{WRAPPER}} .s2e-transformation__sub' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'header_spacing',
			array(
				'label'      => esc_html__( 'Space Below Header', 'six2eight-elements' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'default'    => array(
					'size' => 40,
					'unit' => 'px',
				),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-transformation__header' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_slider_style',
			array(
				'label' => esc_html__( 'Slider & Labels', 'six2eight-elements' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'slider_border_color',
			array(
				'label'     => esc_html__( 'Frame Color', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#1b3d54',
				'selectors' => array(
					'{{WRAPPER}} .s2e-transformation__cell.is-active .s2e-transformation__compare' => 'border-color: {{VALUE}};',
					'{{WRAPPER}} .s2e-transformation' => '--s2e-brand-navy: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'slider_border_width',
			array(
				'label'      => esc_html__( 'Frame Width', 'six2eight-elements' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min' => 0,
						'max' => 16,
					),
				),
				'default'    => array(
					'size' => 7,
					'unit' => 'px',
				),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-transformation__cell.is-active .s2e-transformation__compare' => 'border-width: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .s2e-transformation' => '--s2e-transformation-frame: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'slider_radius',
			array(
				'label'      => esc_html__( 'Corner Radius', 'six2eight-elements' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'default'    => array(
					'size' => 32,
					'unit' => 'px',
				),
				'selectors'  => array(
					'{{WRAPPER}} .s2e-transformation' => '--s2e-transformation-center-border-radius: {{SIZE}}{{UNIT}}; --s2e-transformation-center-image-radius: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'badge_typography',
				'label'    => esc_html__( 'Before/After Labels', 'six2eight-elements' ),
				'selector' => '{{WRAPPER}} .s2e-transformation__badge',
			)
		);

		$this->add_control(
			'badge_bg',
			array(
				'label'     => esc_html__( 'Label Background', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#1b3d54',
				'selectors' => array(
					'{{WRAPPER}} .s2e-transformation' => '--s2e-transformation-badge-bg: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'badge_color',
			array(
				'label'     => esc_html__( 'Label Text', 'six2eight-elements' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .s2e-transformation' => '--s2e-transformation-badge-fg: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'thumb_gap',
			array(
				'label'       => esc_html__( 'Slide gap (space between)', 'six2eight-elements' ),
				'description' => esc_html__( 'Gap between slides in the carousel rack.', 'six2eight-elements' ),
				'type'        => Controls_Manager::SLIDER,
				'size_units'  => array( 'px' ),
				'default'     => array(
					'size' => 0,
					'unit' => 'px',
				),
				'selectors'   => array(
					'{{WRAPPER}} .s2e-transformation' => '--s2e-transformation-rack-gap: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'side_slide_scale_pct',
			array(
				'label'       => esc_html__( 'Side slides scale (%)', 'six2eight-elements' ),
				'description' => esc_html__( 'Percent of the center slide size; lower = smaller side peeks.', 'six2eight-elements' ),
				'type'        => Controls_Manager::NUMBER,
				'min'         => 50,
				'max'         => 100,
				'step'        => 1,
				'default'     => 85,
				'selectors'   => array(
					'{{WRAPPER}} .s2e-transformation' => '--s2e-transformation-side-scale: calc({{VALUE}} / 100);',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Render one comparison cell (one carousel slide).
	 *
	 * @param array $item     Repeater item.
	 * @param array $settings Widget settings.
	 */
	private function render_compare_cell( $item, $settings ) {
		$before = isset( $item['before_image'] ) ? $item['before_image'] : array();
		$after  = isset( $item['after_image'] ) ? $item['after_image'] : array();

		$before_label = ! empty( $item['before_label'] ) ? $item['before_label'] : esc_html__( 'Before', 'six2eight-elements' );
		$after_label  = ! empty( $item['after_label'] ) ? $item['after_label'] : esc_html__( 'After', 'six2eight-elements' );

		$before_html = '';
		$after_html  = '';

		if ( ! empty( $before['id'] ) ) {
			$before_html = Group_Control_Image_Size::get_attachment_image_html(
				array_merge( $settings, array( 'before_image' => $before ) ),
				'slide_images',
				'before_image'
			);
		} elseif ( ! empty( $before['url'] ) ) {
			$before_html = sprintf( '<img src="%s" alt="" />', esc_url( $before['url'] ) );
		}

		if ( ! empty( $after['id'] ) ) {
			$after_html = Group_Control_Image_Size::get_attachment_image_html(
				array_merge( $settings, array( 'after_image' => $after ) ),
				'slide_images',
				'after_image'
			);
		} elseif ( ! empty( $after['url'] ) ) {
			$after_html = sprintf( '<img src="%s" alt="" />', esc_url( $after['url'] ) );
		}

		?>
		<div class="s2e-transformation__compare s2e-compare" data-s2e-compare="1">
			<div class="s2e-compare__inner">
				<div class="s2e-compare__layer s2e-compare__before">
					<?php echo $before_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
				<div class="s2e-compare__layer s2e-compare__after" style="clip-path: inset(0 0 0 50%);">
					<?php echo $after_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
				<div class="s2e-compare__handle" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" tabindex="0" aria-label="<?php echo esc_attr__( 'Before and after', 'six2eight-elements' ); ?>">
					<span class="s2e-compare__handle-knob" aria-hidden="true">
						<span class="s2e-compare__handle-arrows">&#8249;&#8250;</span>
					</span>
				</div>
				<span class="s2e-transformation__badge s2e-transformation__badge--before"><?php echo esc_html( $before_label ); ?></span>
				<span class="s2e-transformation__badge s2e-transformation__badge--after"><?php echo esc_html( $after_label ); ?></span>
			</div>
		</div>
		<?php
	}

	/**
	 * Render widget output on the frontend.
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		S2E_Elements_Assets::enqueue_frontend();

		$slides = isset( $settings['slides'] ) ? $settings['slides'] : array();
		if ( empty( $slides ) ) {
			return;
		}

		$count       = count( $slides );
		$show_header = ! isset( $settings['show_header'] ) || 'yes' === $settings['show_header'];

		$autoplay_ms = 0;
		if ( $count > 1 && ( ! isset( $settings['carousel_autoplay'] ) || 'yes' === $settings['carousel_autoplay'] ) ) {
			$autoplay_ms = isset( $settings['carousel_autoplay_delay'] ) ? (int) $settings['carousel_autoplay_delay'] : 5000;
			if ( $autoplay_ms < 1500 ) {
				$autoplay_ms = 1500;
			}
		}

		$show_carousel_nav    = ! isset( $settings['carousel_show_nav'] ) || 'yes' === $settings['carousel_show_nav'];
		$show_carousel_arrows = $show_carousel_nav && ( ! isset( $settings['carousel_show_arrows'] ) || 'yes' === $settings['carousel_show_arrows'] );

		$section_class = 's2e-transformation';
		if ( ! $show_header ) {
			$section_class .= ' s2e-transformation--header-off';
		}

		$track_class = 's2e-transformation__track';
		if ( $count <= 1 ) {
			$track_class .= ' s2e-transformation__track--single';
		}

		?>
		<section class="<?php echo esc_attr( $section_class ); ?>" data-s2e-transformation="1" data-s2e-slide-count="<?php echo (int) $count; ?>" data-s2e-initial-slide="0" data-s2e-autoplay-ms="<?php echo esc_attr( (string) (int) $autoplay_ms ); ?>">
			<div class="s2e-transformation__inner">
				<?php if ( $show_header ) : ?>
					<header class="s2e-transformation__header">
						<h2 class="s2e-transformation__headline">
							<span class="s2e-transformation__headline-sans"><?php echo esc_html( $settings['headline_prefix'] ); ?></span>
							<?php if ( ! empty( $settings['headline_accent'] ) ) : ?>
								<span class="s2e-transformation__headline-serif"> <?php echo esc_html( $settings['headline_accent'] ); ?></span>
							<?php endif; ?>
						</h2>
						<?php if ( ! empty( $settings['subheadline'] ) ) : ?>
							<p class="s2e-transformation__sub"><?php echo esc_html( $settings['subheadline'] ); ?></p>
						<?php endif; ?>
					</header>
				<?php endif; ?>
				<div class="<?php echo esc_attr( $track_class ); ?>" data-s2e-track>
					<div class="s2e-transformation__rack" data-s2e-transformation-rack>
						<div class="s2e-transformation__viewport" data-s2e-transformation-viewport>
							<div class="s2e-transformation__strip" data-s2e-transformation-strip>
								<?php
								$slide_i = 0;
								foreach ( $slides as $slide_item ) {
									$cell_class = 's2e-transformation__cell' . ( 0 === $slide_i ? ' is-active' : '' );
									echo '<div class="' . esc_attr( $cell_class ) . '" data-s2e-slide>';
									$this->render_compare_cell( $slide_item, $settings );
									echo '</div>';
									++$slide_i;
								}
								?>
							</div>
						</div>
					</div>
					<?php if ( $show_carousel_nav ) : ?>
						<nav class="s2e-transformation__nav" data-s2e-transformation-nav aria-label="<?php echo esc_attr__( 'Project slides', 'six2eight-elements' ); ?>">
							<?php if ( $show_carousel_arrows ) : ?>
								<button type="button" class="s2e-transformation__nav-btn s2e-transformation__nav-btn--prev" data-s2e-carousel-prev aria-label="<?php echo esc_attr__( 'Previous slide', 'six2eight-elements' ); ?>">
									<span aria-hidden="true">&#8249;</span>
								</button>
							<?php endif; ?>
							<span class="s2e-transformation__nav-fraction" aria-live="polite">
								<span data-s2e-current>1</span> / <span data-s2e-total><?php echo (int) $count; ?></span>
							</span>
							<?php if ( $show_carousel_arrows ) : ?>
								<button type="button" class="s2e-transformation__nav-btn s2e-transformation__nav-btn--next" data-s2e-carousel-next aria-label="<?php echo esc_attr__( 'Next slide', 'six2eight-elements' ); ?>">
									<span aria-hidden="true">&#8250;</span>
								</button>
							<?php endif; ?>
						</nav>
					<?php endif; ?>
				</div>
			</div>
		</section>
		<?php
	}
}
