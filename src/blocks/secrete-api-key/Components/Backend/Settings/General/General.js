import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const General = ({ attributes, setAttributes }) => {
  const {
    badgeText, keyName, keyValue, maskedText,
    showBadge, showName, showRevealButton, showCopyButton
  } = attributes;

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Header', 'b-blocks')} initialOpen={true}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Badge', 'b-blocks')} checked={showBadge} onChange={(showBadge) => setAttributes({ showBadge })} />
        {showBadge && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Badge Text', 'b-blocks')} value={badgeText} onChange={(badgeText) => setAttributes({ badgeText })} />
        )}

        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Name', 'b-blocks')} checked={showName} onChange={(showName) => setAttributes({ showName })} />
        {showName && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Key Name', 'b-blocks')} value={keyName} onChange={(keyName) => setAttributes({ keyName })} />
        )}
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Key Value', 'b-blocks')} initialOpen={false}>
        <TextControl className='mt10' __nextHasNoMarginBottom label={__('Secret Key', 'b-blocks')} help={__('The value revealed and copied to the clipboard.', 'b-blocks')} value={keyValue} onChange={(keyValue) => setAttributes({ keyValue })} />
        <TextControl className='mt10' __nextHasNoMarginBottom label={__('Masked Placeholder', 'b-blocks')} help={__('Shown until the key is revealed.', 'b-blocks')} value={maskedText} onChange={(maskedText) => setAttributes({ maskedText })} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Actions', 'b-blocks')} initialOpen={false}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Reveal Button', 'b-blocks')} checked={showRevealButton} onChange={(showRevealButton) => setAttributes({ showRevealButton })} />
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Copy Button', 'b-blocks')} checked={showCopyButton} onChange={(showCopyButton) => setAttributes({ showCopyButton })} />
      </PanelBody>
    </>
  );
};

export default General;
