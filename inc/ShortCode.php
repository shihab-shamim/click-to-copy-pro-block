<?php

    if ( !defined( 'ABSPATH' ) ) { exit; }
class CTC_Shortcode {
    private $post_type = 'ctc';
    	public function __construct() {
		add_shortcode( 'ctc', [$this, 'onAddShortcode'] );
		add_action( 'admin_enqueue_scripts', [$this, 'adminEnqueueScripts'] );
		add_action( 'init', [$this, 'onInit'] );
		add_filter( 'manage_ctc_posts_columns', [$this, 'manageCTCPostsColumns'], 10 );
		add_action( 'manage_ctc_posts_custom_column', [$this, 'manageCTCPostsCustomColumns'], 10, 2 );
		add_action( 'use_block_editor_for_post', [$this, 'useBlockEditorForPost'], 999, 2 );
	}

	function onInit(){

		// Premium users get the block selector/chooser; free users get the
		// flagship Click To Copy block directly. Mirrors the Info Cards plugin.
		if ( function_exists( 'bpctcPremiumChecker' ) && bpctcPremiumChecker() ) {
			$template = [ [ 'ctcb/click-to-copy-selector' ] ];
		} else {
			$template = [ [ 'ctcb/click-to-copy' ] ];
		}

		register_post_type( 'ctc', [
			'labels'				=> [
				'name'			=> __( 'ShortCodes', 'click-to-copy' ),
				'singular_name'	=> __( 'ShortCode', 'click-to-copy' ),
				'add_new'		=> __( 'Add New', 'click-to-copy' ),
				'add_new_item'	=> __( 'Add New ShortCode', 'click-to-copy' ),
				'edit_item'		=> __( 'Edit ShortCode', 'click-to-copy' ),
				'new_item'		=> __( 'New ShortCode', 'click-to-copy' ),
				'view_item'		=> __( 'View ShortCode', 'click-to-copy' ),
				'search_items'	=> __( 'Search ShortCodes', 'click-to-copy' ),
				'not_found'		=> __( 'Sorry, we couldn\'t find the ShortCode you are looking for.', 'click-to-copy' )
			],
			'public'				=> false,
			'show_ui'				=> true,
			'show_in_rest'			=> true,
			'publicly_queryable'	=> false,
			'show_in_menu'			=> 'click-to-copy-dashboard',
			'exclude_from_search'	=> true,
			'menu_position'			=> 14,
			'has_archive'			=> false,
			'hierarchical'			=> false,
			'capability_type'		=> 'page',
			'rewrite'				=> [ 'slug' => 'apb' ],
			'supports'				=> [ 'title', 'editor' ],
			'template' => $template,
			'template_lock'			=> 'all',
		] );
	}
	
	function onAddShortcode( $atts ) {
		$post_id = $atts['id'];
		$post = get_post( $post_id );

		if ( !$post ) {
			return '';
		}

		if ( post_password_required( $post ) ) {
			return get_the_password_form( $post );
		}

		switch ( $post->post_status ) {
			case 'publish':
				return $this->displayContent( $post );

			case 'private':
				if ( current_user_can( 'read_private_posts' ) ) {
					return $this->displayContent( $post );
				}
				return '';

			case 'draft':
			case 'pending':
			case 'future':
				if ( current_user_can( 'edit_post', $post_id ) ) {
					return $this->displayContent( $post );
				}
				return '';

			default:
				return '';
		}
	}

	function displayContent( $post ){
		$blocks = parse_blocks( $post->post_content );
		return render_block( $blocks[0] );
	}

	function manageCTCPostsColumns( $defaults ) {
		unset( $defaults['date'] );
		$defaults['shortcode'] = 'ShortCode';
		$defaults['date'] = 'Date';
		return $defaults;
	}

	function manageCTCPostsCustomColumns( $column_name, $post_ID ) {
		if ( $column_name == 'shortcode' ) {
			echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr( $post_ID ) . '">
				<input value="[ctc id=' . esc_attr( $post_ID ) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr( $post_ID ) . '\')">
				<span class="tooltip">' . esc_html__( 'Copy To Clipboard', 'advanced-post-block' ) . '</span>
			</div>';
		}
	}

	function useBlockEditorForPost( $use, $post ){
		if ( is_object( $post ) && isset( $post->post_type ) && $this->post_type === $post->post_type ) {
			return true;
		}
		return $use;
	}
    	function adminEnqueueScripts( $hook ){
		if( 'edit.php' === $hook || 'post.php' === $hook ){
			wp_enqueue_style( 'ctc-admin-post', CTC_DIR_URL . 'build/admin-post.css', [], CTC_PLUGIN_VERSION );
			wp_enqueue_script( 'ctc-admin-post', CTC_DIR_URL . 'build/admin-post.js', [], CTC_PLUGIN_VERSION, true );
			wp_set_script_translations( 'ctc-admin-post', 'advanced-post-block', CTC_DIR_PATH . 'languages' );
		}
	}

}
new CTC_Shortcode();