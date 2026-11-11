<?php
/**
 * Elementor widget "MemberGlut": any MemberGlut form or element (registration, login, account, pricing table…).
 *
 * Loaded only from the elementor/widgets/register hook, so \Elementor\Widget_Base exists.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Elementor_Widget class.
 */
class MemberGlut_Elementor_Widget extends \Elementor\Widget_Base {

	/**
	 * Name.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'memberglut';
	}

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'MemberGlut', 'memberglut' );
	}

	/**
	 * Icon.
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-lock-user';
	}

	/**
	 * Categories.
	 *
	 * @return string[]
	 */
	public function get_categories() {
		return array( 'general' );
	}

	/**
	 * Keywords.
	 *
	 * @return string[]
	 */
	public function get_keywords() {
		return array( 'member', 'membership', 'login', 'register', 'account', 'pricing', 'memberglut' );
	}

	/**
	 * Controls.
	 *
	 * @return void
	 */
	protected function register_controls() {
		$options = array();
		foreach ( MemberGlut_Blocks::definitions() as $key => $d ) {
			$options[ $key ] = $d[1];
		}
		$this->start_controls_section( 'content', array( 'label' => __( 'MemberGlut', 'memberglut' ) ) );
		$this->add_control(
			'element',
			array(
				'label'   => __( 'Show', 'memberglut' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => 'login',
				'options' => $options,
			)
		);
		$this->add_control(
			'atts',
			array(
				'label'       => __( 'Options', 'memberglut' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'placeholder' => 'plan="gold" redirect="/welcome/"',
				'description' => __( 'Optional shortcode attributes, as in the matching [memberglut_…] shortcode.', 'memberglut' ),
				'label_block' => true,
			)
		);
		$this->end_controls_section();
	}

	/**
	 * Render.
	 *
	 * @return void
	 */
	protected function render() {
		$s    = $this->get_settings_for_display();
		$defs = MemberGlut_Blocks::definitions();
		$key  = isset( $s['element'] ) ? (string) $s['element'] : 'login';
		if ( ! isset( $defs[ $key ] ) ) {
			return;
		}
		$atts = isset( $s['atts'] ) ? preg_replace( '/[\[\]]/', '', (string) $s['atts'] ) : '';
		echo do_shortcode( '[' . $defs[ $key ][0] . ( '' !== trim( $atts ) ? ' ' . $atts : '' ) . ']' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Shortcode output is escaped by the shortcode.
	}
}
