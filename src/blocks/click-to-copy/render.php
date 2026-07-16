<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$id = wp_unique_id( 'ctcb_click_to_copy_block-' );
$premium_check = function_exists('bpctcPremiumChecker') ? bpctcPremiumChecker() : 'false';
?>
<div <?php echo get_block_wrapper_attributes(); ?>
     id="<?php echo esc_attr( $id ); ?>"
     data-attributes="<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>"
     data-pipecheck="<?php echo esc_attr( $premium_check ); ?>">
</div>
