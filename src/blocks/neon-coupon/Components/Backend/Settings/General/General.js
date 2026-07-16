import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const General = ({ attributes, setAttributes }) => {
  const {
    label, amount, terms, hint, code,
    showLabel, showAmount, showTerms, showPerf, showHint
  } = attributes;

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Offer Details', 'b-blocks')} initialOpen={true}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Label', 'b-blocks')} checked={showLabel} onChange={(showLabel) => setAttributes({ showLabel })} />
        {showLabel && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Label', 'b-blocks')} value={label} onChange={(label) => setAttributes({ label })} />
        )}

        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Amount', 'b-blocks')} checked={showAmount} onChange={(showAmount) => setAttributes({ showAmount })} />
        {showAmount && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Amount', 'b-blocks')} value={amount} onChange={(amount) => setAttributes({ amount })} />
        )}

        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Terms', 'b-blocks')} checked={showTerms} onChange={(showTerms) => setAttributes({ showTerms })} />
        {showTerms && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Terms', 'b-blocks')} value={terms} onChange={(terms) => setAttributes({ terms })} />
        )}

        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Perforation', 'b-blocks')} checked={showPerf} onChange={(showPerf) => setAttributes({ showPerf })} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy Button', 'b-blocks')} initialOpen={false}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Hint', 'b-blocks')} checked={showHint} onChange={(showHint) => setAttributes({ showHint })} />
        {showHint && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Hint', 'b-blocks')} value={hint} onChange={(hint) => setAttributes({ hint })} />
        )}
        <TextControl className='mt10' __nextHasNoMarginBottom label={__('Coupon Code', 'b-blocks')} help={__('This is the text copied to the clipboard.', 'b-blocks')} value={code} onChange={(code) => setAttributes({ code })} />
      </PanelBody>
    </>
  );
};

export default General;
