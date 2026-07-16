<?php
/**
 * Enqueue — passes CTC_BLOCK_DATA to the block editor.
 * Mirrors info-cards/includes/rootPlugin/inc/Enqueue.php.
 *
 * The shared Pro editor bundle (src/blocks/index.js) reads
 * window.CTC_BLOCK_DATA.disabledBlocks to skip requiring disabled blocks,
 * and window.CTC_BLOCK_DATA.isPremium for pro-gating.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! class_exists( 'CTC_Enqueue' ) ) {
	class CTC_Enqueue {
		public function __construct() {
			add_action( 'enqueue_block_assets', [ $this, 'enqueueBlockAssets' ] );
		}

		public function enqueueBlockAssets() {
			$disabled_blocks = get_option( 'ctcBlocks', [] );
			if ( ! is_array( $disabled_blocks ) ) {
				$disabled_blocks = [];
			}

			wp_localize_script(
				'wp-blocks',
				'CTC_BLOCK_DATA',
				[
					'disabledBlocks' => $disabled_blocks,
					'isPremium'      => function_exists( 'bpctcPremiumChecker' ) ? bpctcPremiumChecker() : false,
				]
			);
		}
	}

	new CTC_Enqueue();
}
