<?php
/**
 * Shared frontend/editor assets.
 *
 * @package Six2eight_Elements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class S2E_Elements_Assets
 */
class S2E_Elements_Assets {

	/**
	 * Singleton.
	 *
	 * @var self|null
	 */
	private static $instance = null;

	/**
	 * Handle for shared stylesheet.
	 */
	const STYLE_HANDLE = 'six2eight-elements-css';

	/**
	 * Handle for shared script.
	 */
	const SCRIPT_HANDLE = 'six2eight-elements-js';

	/**
	 * Instance.
	 *
	 * @return self
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'register_shared' ), 0 );
		add_action( 'elementor/frontend/after_register_styles', array( $this, 'register_shared' ) );
		add_action( 'elementor/editor/after_enqueue_scripts', array( $this, 'enqueue_editor_preview' ) );
	}

	/**
	 * Register shared CSS/JS (enqueued by blocks, Elementor widgets, or editor preview).
	 */
	public function register_shared() {
		if ( wp_style_is( self::STYLE_HANDLE, 'registered' ) ) {
			return;
		}

		wp_register_style(
			'six2eight-elements-fonts',
			'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:ital,wght@1,500;1,600&display=swap',
			array(),
			null
		);

		wp_register_style(
			self::STYLE_HANDLE,
			S2E_ELEMENTS_URL . 'assets/css/style.css',
			array( 'six2eight-elements-fonts' ),
			S2E_ELEMENTS_VERSION
		);

		wp_register_script(
			self::SCRIPT_HANDLE,
			S2E_ELEMENTS_URL . 'assets/js/script.js',
			array(),
			S2E_ELEMENTS_VERSION,
			true
		);
	}

	/**
	 * Elementor editor needs slider assets for live preview.
	 */
	public function enqueue_editor_preview() {
		$this->register_shared();
		wp_enqueue_style( self::STYLE_HANDLE );
		wp_enqueue_script( self::SCRIPT_HANDLE );
	}

	/**
	 * Enqueue shared assets on frontend when needed.
	 */
	public static function enqueue_frontend() {
		self::instance()->register_shared();
		wp_enqueue_style( self::STYLE_HANDLE );
		wp_enqueue_script( self::SCRIPT_HANDLE );
	}
}