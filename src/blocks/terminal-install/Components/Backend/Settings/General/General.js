import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const General = ({ attributes, setAttributes }) => {
  const {
    barTitle, promptText, command, copyLabel,
    showBar, showDots, showTitle, showPrompt, showCommand, showCopyButton, showCursor
  } = attributes;

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Terminal Bar', 'b-blocks')} initialOpen={true}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Bar', 'b-blocks')} checked={showBar} onChange={(showBar) => setAttributes({ showBar })} />
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Dots', 'b-blocks')} checked={showDots} onChange={(showDots) => setAttributes({ showDots })} />
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Title', 'b-blocks')} checked={showTitle} onChange={(showTitle) => setAttributes({ showTitle })} />
        {showTitle && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Bar Title', 'b-blocks')} value={barTitle} onChange={(barTitle) => setAttributes({ barTitle })} />
        )}
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Command Line', 'b-blocks')} initialOpen={false}>
        <ToggleControl  className='mt10' __nextHasNoMarginBottom label={__('Show Prompt', 'b-blocks')} checked={showPrompt} onChange={(showPrompt) => setAttributes({ showPrompt })} />
        {showPrompt && (
          <TextControl  className='mt10' __nextHasNoMarginBottom label={__('Prompt', 'b-blocks')} value={promptText} onChange={(promptText) => setAttributes({ promptText })} />
        )}
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Command', 'b-blocks')} checked={showCommand} onChange={(showCommand) => setAttributes({ showCommand })} />
        {showCommand && (
          <TextControl  className='mt10' __nextHasNoMarginBottom label={__('Command', 'b-blocks')} value={command} onChange={(command) => setAttributes({ command })} />
        )}
        <ToggleControl  className='mt10' __nextHasNoMarginBottom label={__('Show Blinking Cursor', 'b-blocks')} checked={showCursor} onChange={(showCursor) => setAttributes({ showCursor })} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy Button', 'b-blocks')} initialOpen={false}>
        <ToggleControl __nextHasNoMarginBottom label={__('Show Copy Button', 'b-blocks')} checked={showCopyButton} onChange={(showCopyButton) => setAttributes({ showCopyButton })} />
        {showCopyButton && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Button Label', 'b-blocks')} value={copyLabel} onChange={(copyLabel) => setAttributes({ copyLabel })} />
        )}
      </PanelBody>
    </>
  );
};

export default General;
