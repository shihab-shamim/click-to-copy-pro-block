import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const General = ({ attributes, setAttributes }) => {
  const {
    title, code, copyText,
    showTitle, showCode
  } = attributes;

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Label', 'b-blocks')} initialOpen={true}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Title', 'b-blocks')} checked={showTitle} onChange={(showTitle) => setAttributes({ showTitle })} />
        {showTitle && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Title', 'b-blocks')} value={title} onChange={(title) => setAttributes({ title })} />
        )}

        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Code', 'b-blocks')} checked={showCode} onChange={(showCode) => setAttributes({ showCode })} />
        {showCode && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Code', 'b-blocks')} value={code} onChange={(code) => setAttributes({ code })} />
        )}
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy', 'b-blocks')} initialOpen={false}>
        <TextControl className='mt10' __nextHasNoMarginBottom label={__('Copy Text', 'b-blocks')} help={__('The exact text placed on the clipboard when the ring is clicked.', 'b-blocks')} value={copyText} onChange={(copyText) => setAttributes({ copyText })} />
      </PanelBody>
    </>
  );
};

export default General;
