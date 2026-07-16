<?php
/**
 * Init — multi-block registration + category.
 * Mirrors info-cards/includes/rootPlugin/inc/Init.php.
 *
 * - Auto-discovers every folder in build/blocks/ and registers it.
 * - Free blocks (the flagship) are always registered.
 * - Pro blocks are registered only when premium is active.
 * - Disabled blocks (toggled OFF in the dashboard) are skipped entirely.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! class_exists( 'CTC_Init' ) ) {
	class CTC_Init {
		/**
		 * Blocks that are always registered (free). Must match build/blocks/<name>.
		 * 'parent' is the ShortCode selector/chooser UI — always needed so the
		 * `ctc` CPT can render it (premium) and it stays available.
		 */
		private $free_blocks = [ 'click-to-copy', 'parent' ];

		public function __construct() {
			add_action( 'init', [ $this, 'onInit' ] );
			add_filter( 'block_categories_all', [ $this, 'registerBlockCategory' ], 10, 2 );
		}

		public function onInit() {
			$this->registerBlocks();
		}

		/**
		 * Loop through build/blocks/ and register each block.
		 */
		public function registerBlocks() {
			$blocks_path = CTC_DIR_PATH . 'build/blocks/';

			// scandir instead of glob to avoid issues on restricted servers.
			if ( ! is_dir( $blocks_path ) ) {
				return;
			}

			$files      = scandir( $blocks_path );
			$all_blocks = [];

			foreach ( $files as $file ) {
				if ( $file !== '.' && $file !== '..' && is_dir( $blocks_path . $file ) ) {
					$all_blocks[] = $blocks_path . $file;
				}
			}

			if ( empty( $all_blocks ) ) {
				return;
			}

			// Blocks toggled OFF by the admin dashboard (array of folder names).
			$disabled_blocks = get_option( 'ctcBlocks', [] );
			if ( ! is_array( $disabled_blocks ) ) {
				$disabled_blocks = [];
			}

			$is_premium = function_exists( 'bpctcPremiumChecker' ) ? bpctcPremiumChecker() : false;

			// Register the shared editor bundle used by all Pro blocks.
			if ( $is_premium ) {
				$asset_path = CTC_DIR_PATH . 'build/blocks/index.asset.php';
				$asset_file = file_exists( $asset_path )
					? include $asset_path
					: [
						'dependencies' => [ 'wp-blocks', 'wp-element', 'wp-i18n' ],
						'version'      => CTC_PLUGIN_VERSION,
					];

				wp_register_script(
					'ctc-pro-blocks',
					CTC_DIR_URL . 'build/blocks/index.js',
					$asset_file['dependencies'],
					$asset_file['version'],
					true
				);

				wp_register_style(
					'ctc-pro-blocks',
					CTC_DIR_URL . 'build/blocks/index.css',
					[],
					$asset_file['version']
				);
			}

			foreach ( $all_blocks as $block_path ) {
				$block_name = basename( $block_path );

				// Skip if admin toggled this block OFF.
				if ( in_array( $block_name, $disabled_blocks, true ) ) {
					continue;
				}

				// Free blocks — always register (keep their own standalone bundle).
				if ( in_array( $block_name, $this->free_blocks, true ) ) {
					register_block_type( $block_path );
					continue;
				}

				// All other blocks are Pro — only register when premium is active.
				if ( $is_premium ) {
					register_block_type( $block_path, [
						'editor_script' => 'ctc-pro-blocks',
						'editor_style'  => 'ctc-pro-blocks',
					] );
				}
			}
		}

		/**
		 * Register the "Click To Copy" block category at the top of the inserter.
		 */
		public function registerBlockCategory( $categories, $context ) {
			if ( ! is_array( $categories ) ) {
				$categories = [];
			}

			// Prevent duplicate category.
			foreach ( $categories as $category ) {
				if ( isset( $category['slug'] ) && 'click-to-copy' === $category['slug'] ) {
					return $categories;
				}
			}

			array_unshift( $categories, [
				'slug'  => 'click-to-copy',
				'title' => __( 'Click To Copy', 'clipboard' ),
				'icon'  => null,
			] );

			return $categories;
		}
	}

	new CTC_Init();
}
