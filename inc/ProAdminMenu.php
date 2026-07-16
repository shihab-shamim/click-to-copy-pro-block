<?php


if ( !defined( 'ABSPATH' ) ) { exit; } 

class CTCproAdminMenu {
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'adminMenu' ] );
		add_action( 'admin_enqueue_scripts', [$this, 'adminEnqueueScripts'] );
	}

	
	public function adminMenu(){
			$icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
				<path d="M20.2 8v11c0 .7-.6 1.2-1.2 1.2H6v1.5h13c1.5 0 2.7-1.2 2.7-2.8V8zM18 16.4V4.6c0-.9-.7-1.6-1.6-1.6H4.6C3.7 3 3 3.7 3 4.6v11.8c0 .9.7 1.6 1.6 1.6h11.8c.9 0 1.6-.7 1.6-1.6zm-13.5 0V4.6c0-.1.1-.1.1-.1h11.8c.1 0 .1.1.1.1v11.8c0 .1-.1.1-.1.1H4.6l-.1-.1z" fill="none"></path>
				</svg>';

	
		add_menu_page(
			__('Click To Copy - bPlugins', 'click-to-copy'),
			__('Click To Copy', 'click-to-copy'),
			'manage_options',
			'click-to-copy-dashboard',
			'',
			'data:image/svg+xml;base64,' . base64_encode( $icon ),
			20
		);
		add_submenu_page(
			'click-to-copy-dashboard',
			__('Help And Demo - bPlugins', 'click-to-copy'),
			__('Help And Demo', 'click-to-copy'),
			'manage_options',
			'click-to-copy-dashboard',
			[$this, 'renderDashboardPage'],
			1
		);
	
	} 


	public function renderDashboardPage(){ ?>
		<div
			id='CTCBClickToCopy'
			data-info='<?php echo esc_attr( wp_json_encode( [
				'version' => CTC_PLUGIN_VERSION,
				'isPremium' => bpctcPremiumChecker(),
				'hasPro'    => CTC_HAS_PRO,
				'licenseActiveNonce' => wp_create_nonce('bplLicenseActive'),
				'nonce' => wp_create_nonce( 'ctcCreatePage' ),
				'action' => 'ctcGetBlocks',
				'adminNonce' => wp_create_nonce( 'ctc_admin_nonce' ),
				'adminUrl' => admin_url(),
				'deleteDataOnUninstall' => (bool) get_option( 'ctcDeleteDataOnUninstall', false ),
				'uninstallNonce' => wp_create_nonce( 'ctc_save_uninstall_option' ),
			] ) ); ?>'
		></div>
	<?php }

	function adminEnqueueScripts( $hook ) {
		if( strpos( $hook, 'click-to-copy-dashboard' ) ){
			$asset_file = CTC_DIR_PATH . 'build/admin-dashboard.asset.php';
			$asset      = file_exists( $asset_file ) ? require $asset_file : [ 'dependencies' => [], 'version' => CTC_PLUGIN_VERSION ];

			// wp-util provides wp.ajax (used by useWPAjax) — it is a runtime global, not an
			// import, so wp-scripts does not auto-detect it. Merge it into the asset deps.
			$dependencies = array_unique( array_merge( $asset['dependencies'], [ 'wp-util' ] ) );

			wp_enqueue_style( 'ctc-admin-dashboard', CTC_DIR_URL . 'build/admin-dashboard.css', [], CTC_PLUGIN_VERSION );
			wp_enqueue_script( 'ctc-admin-dashboard', CTC_DIR_URL . 'build/admin-dashboard.js', $dependencies, $asset['version'], true );
			wp_set_script_translations( 'ctc-admin-dashboard', 'click-to-copy', CTC_DIR_PATH . 'languages' );

		}
	}
}
new CTCproAdminMenu();
