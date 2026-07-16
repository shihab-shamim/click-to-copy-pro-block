<?php
/**
 * RestAPI — AJAX for the block enable/disable manager.
 * Mirrors info-cards/includes/rootPlugin/inc/RestAPI.php (icbGetBlocks).
 *
 * ctcGetBlocks:
 *   - No `data` in POST  -> returns the current disabled list (array of folder names).
 *   - With `data` (JSON) -> saves it to the `ctcBlocks` option and echoes it back.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! class_exists( 'CTC_RestAPI' ) ) {
	class CTC_RestAPI {
		public function __construct() {
			add_action( 'wp_ajax_ctcGetBlocks', [ $this, 'ctcGetBlocks_callback' ] );
		}

		public function ctcGetBlocks_callback() {
			$nonce = sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ?? '' ) );

			if ( ! wp_verify_nonce( $nonce, 'ctc_admin_nonce' ) ) {
				wp_send_json_error( 'Invalid Request' );
			}

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( 'Permission denied' );
			}

			$db_data = get_option( 'ctcBlocks', [] );
			if ( ! is_array( $db_data ) ) {
				$db_data = [];
			}

			// Read request — return current state.
			if ( ! isset( $_POST['data'] ) ) {
				wp_send_json_success( $db_data );
			}

			// Write request — persist the disabled list.
			$data = json_decode( stripslashes( $_POST['data'] ), true );
			if ( ! is_array( $data ) ) {
				$data = [];
			}
			$data = array_values( array_map( 'sanitize_text_field', $data ) );

			update_option( 'ctcBlocks', $data );

			wp_send_json_success( $data );
		}
	}

	new CTC_RestAPI();
}
