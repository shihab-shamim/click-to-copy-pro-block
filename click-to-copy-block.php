<?php

/**
 * Plugin Name:       Click to Copy
 * Description:       The Click To Copy Block plugin offers a seamless Gutenberg block for one-click content copying.
 * Version:           2.0.3
 * Author:            bPlugins
 * Author URI:        http://bplugins.com
 * License:           GPLv3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Plugin URI: https://wordpress.org/plugins/click-to-copy/
 * Text Domain:       clipboard
 * @fs_premium_only   /freemius
 * @fs_free_only      /freemius-lite
 */
if (!defined('ABSPATH')) {
    exit;
}

if (function_exists('ctc_fs')) {
    ctc_fs()->set_basename( true, __FILE__ );
} else {

    // Defined Constant
    define('CTC_PLUGIN_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === sanitize_text_field($_SERVER['HTTP_HOST']) ? time() : '2.0.3');
    define('CTC_DIR_URL', plugin_dir_url(__FILE__));
    define('CTC_ASSETS_DIR', plugin_dir_url(__FILE__) . 'assets/');
    define('CTC_DIR_PATH', plugin_dir_path(__FILE__));
    define('CTC_HAS_FREE', 'click-to-copy/click-to-copy-block.php' === plugin_basename(__FILE__));
    define('CTC_HAS_PRO', 'click-to-copy-pro/click-to-copy-block.php' === plugin_basename(__FILE__));


    // Freemius Code
    if (!function_exists('ctc_fs')) {
        // Create a helper function for easy SDK access.
        function ctc_fs() {
            global $ctc_fs;

            if (! isset($ctc_fs)) {
                $fsStartPath = dirname(__FILE__) . '/freemius/start.php';
                $bSDKInitPath = dirname(__FILE__) . '/freemius-lite/start.php';


                if (CTC_HAS_PRO && file_exists($fsStartPath)) {
                    require_once $fsStartPath;
                } else if (CTC_HAS_FREE && file_exists($bSDKInitPath)) {
                    require_once $bSDKInitPath;
                }

                $bptbConfig = [
                    'id'                  => '20412',
                    'slug'                => 'click-to-copy',
                    'premium_slug'        => 'click-to-copy-pro',
                    'type'                => 'plugin',
                    'public_key'          => 'pk_06363f5cbf7f2bdba1337af3d5f8d',
                    'is_premium'          => true,
                    'premium_suffix'      => 'Pro',
                    'has_premium_version' => true,
                    'has_addons'          => false,
                    'has_paid_plans'      => true,
                    'trial'               => [
                        'days'               => 7,
                        'is_require_payment' => false,
                    ],
                     'menu' => CTC_HAS_PRO ? 
                    array(
                        'slug'        => 'click-to-copy-dashboard',
                        'first-path'  =>  'admin.php?page=click-to-copy-dashboard#/welcome',
                        'support'     => false,
                    )
                    : array(
                        'slug'           => 'click-to-copy-dashboard',
                        'first-path'     => 'tools.php?page=click-to-copy-dashboard#/welcome',
                        'support'        => false,
                        'parent'         => array(
                            'slug' => 'tools.php',
                        ),
                    ),
                ];


                $ctc_fs = (CTC_HAS_PRO && file_exists($fsStartPath)) ? fs_dynamic_init($bptbConfig) : fs_lite_dynamic_init($bptbConfig);
            }

            return $ctc_fs;
        }

        // Init Freemius.
        ctc_fs();
        // Signal that SDK was initiated.
        do_action('ctc_fs_loaded');
    }

    // Main Plugin Logic...
    function bpctcPremiumChecker() {
        return CTC_HAS_PRO ? ctc_fs()->can_use_premium_code() : false;
    }

    // ShortCode CPT + [ctc] shortcode loads for BOTH free and pro (mirrors Info
    // Cards). The CPT template itself switches selector (premium) vs flagship
    // (free) inside ShortCode.php via bpctcPremiumChecker().
    require_once CTC_DIR_PATH . 'inc/ShortCode.php';

	require_once CTC_DIR_PATH . '/inc/ProAdminMenu.php';


       if(CTC_HAS_PRO){
        require_once CTC_DIR_PATH . 'inc/LicenseActivation.php';

        }

    // Multi-block architecture (mirrors Info Cards):
    //   Init     — auto-discover + register build/blocks/*, register category, free/pro + enable/disable gating
    //   Enqueue  — localize CTC_BLOCK_DATA (disabledBlocks, isPremium) to the editor
    //   RestAPI  — ctcGetBlocks AJAX for the dashboard block manager
    require_once CTC_DIR_PATH . 'inc/Init.php';
    require_once CTC_DIR_PATH . 'inc/Enqueue.php';
    require_once CTC_DIR_PATH . 'inc/RestAPI.php';


    if(!class_exists("CTCBClickToCopy")) {
        class CTCBClickToCopy {

            public function __construct() {
                add_action('init', [$this, 'onInit']);
                add_action('admin_init', [$this, 'registerSettings']);
                add_action('rest_api_init', [$this, 'registerSettings']);
                add_action( 'enqueue_block_editor_assets', [$this, 'ctcEnqueueBlockEditorAssets'] );
                add_action( 'wp_ajax_ctcSaveUninstallOption', [$this, 'ctcSaveUninstallOption'] );
                add_filter( 'default_title', [$this, 'defaultTitle'], 10, 2 );
			  add_filter( 'default_content', [$this, 'defaultContent'], 10, 2 );
                
            }

            // Block translations. Block registration itself is handled by CTC_Init
            // (inc/Init.php), which scans build/blocks/ and registers each block.
            public function onInit() {
                wp_set_script_translations(
                    'ctcb-click-to-copy-editor-script',
                    'clipboard',
                    plugin_dir_path(__FILE__) . 'languages'
                );

                wp_set_script_translations(
                    'ctcb-click-to-copy-view-script',
                    'clipboard',
                    plugin_dir_path(__FILE__) . 'languages'
                );
            }

            function ctcEnqueueBlockEditorAssets(){
                wp_add_inline_script( 'ctcb-click-to-copy-editor-script', 'const ctcbpipecheck =  ' . wp_json_encode( bpctcPremiumChecker() ) .';', 'before' );
            }
         
            // Register plugin settings
            public function registerSettings() {
                register_setting('bpctcUtils', 'bpctcUtils', [
                    'show_in_rest'      => [
                        'name'   => 'bpctcUtils',
                        'schema' => ['type' => 'string']
                    ],
                    'type'              => 'string',
                    'default'           => wp_json_encode(['nonce' => wp_create_nonce('wp_ajax')]),
                    'sanitize_callback' => 'sanitize_text_field'
                ]);
            }
             function defaultTitle( $title, $post ) {
			if ( 'page' === $post->post_type && isset( $_GET['title'] ) ) {
				return sanitize_text_field( wp_unslash( $_GET['title'] ) );
			}
			return $title;
		}

		function defaultContent( $content, $post ) {
			if ( 'page' === $post->post_type && isset( $_GET['content'] ) ) {
				return wp_unslash( $_GET['content'] );
			}
			return $content;
		}

			// Persist the dashboard "delete data on uninstall" toggle.
			// Contract matches bpl-tools/Admin/Settings: reads $_POST['nonce'] and $_POST['enabled'].
			public function ctcSaveUninstallOption() {
				$nonce = sanitize_text_field( wp_unslash( $_POST['nonce'] ?? '' ) );

				if ( ! wp_verify_nonce( $nonce, 'ctc_save_uninstall_option' ) ) {
					wp_send_json_error( [ 'message' => __( 'Invalid security token.', 'clipboard' ) ], 403 );
				}

				if ( ! current_user_can( 'manage_options' ) ) {
					wp_send_json_error( [ 'message' => __( 'You do not have permission to perform this action.', 'clipboard' ) ], 403 );
				}

				$raw_enabled = isset( $_POST['enabled'] ) ? sanitize_text_field( wp_unslash( $_POST['enabled'] ) ) : '';
				$enabled     = ( 'true' === $raw_enabled || '1' === $raw_enabled );

				update_option( 'ctcDeleteDataOnUninstall', $enabled );

				wp_send_json_success( [
					'enabled' => $enabled,
					'message' => $enabled
						? __( 'Data deletion enabled.', 'clipboard' )
						: __( 'Data will be preserved on uninstall.', 'clipboard' ),
				] );
			}


        }

        new CTCBClickToCopy;
    }

    
}


