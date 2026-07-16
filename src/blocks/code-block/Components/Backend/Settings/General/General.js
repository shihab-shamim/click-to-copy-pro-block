import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { codeThemes } from '../../../../utils/themes';

const General = ({ attributes, setAttributes }) => {
  const {
    language, copyLabel, bannerText, theme,
    showLanguage, showCopyButton, showLineNumbers
  } = attributes;

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Top Bar', 'b-blocks')} initialOpen={true}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Language', 'b-blocks')} checked={showLanguage} onChange={(showLanguage) => setAttributes({ showLanguage })} />
        {showLanguage && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Language Label', 'b-blocks')} value={language} onChange={(language) => setAttributes({ language })} />
        )}

        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Copy Button', 'b-blocks')} checked={showCopyButton} onChange={(showCopyButton) => setAttributes({ showCopyButton })} />
        {showCopyButton && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Copy Button Label', 'b-blocks')} value={copyLabel} onChange={(copyLabel) => setAttributes({ copyLabel })} />
        )}

        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Line Numbers', 'b-blocks')} checked={showLineNumbers} onChange={(showLineNumbers) => setAttributes({ showLineNumbers })} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Code', 'b-blocks')} initialOpen={false}>
        <p className='mb10' style={{ margin: '0 0 8px', color: '#616063' }}>
          {__('Type or paste code directly in the block’s code area (inline editor).', 'b-blocks')}
        </p>
        <SelectControl
          __nextHasNoMarginBottom
          label={__('Code Theme', 'b-blocks')}
          value={theme}
          options={codeThemes}
          onChange={(theme) => setAttributes({ theme })}
        />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Banner', 'b-blocks')} initialOpen={false}>
        <TextControl className='mt10' __nextHasNoMarginBottom label={__('Banner Text', 'b-blocks')} help={__('Shown in the slide-in banner after copying.', 'b-blocks')} value={bannerText} onChange={(bannerText) => setAttributes({ bannerText })} />
      </PanelBody>
    </>
  );
};

export default General;
