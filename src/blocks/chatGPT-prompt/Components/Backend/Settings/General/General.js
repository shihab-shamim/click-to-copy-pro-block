import { __ } from '@wordpress/i18n';
import { Button, PanelBody, SelectControl, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const General = ({ attributes, setAttributes }) => {
  const {
    icon, iconType, iconImage, model, promptText, copyLabel,
    showHead, showButton
  } = attributes;

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Header', 'b-blocks')} initialOpen={true}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Header', 'b-blocks')} checked={showHead} onChange={(showHead) => setAttributes({ showHead })} />
        {showHead && (
          <>
            <SelectControl
              className='mt10'
              __nextHasNoMarginBottom
              label={__('Avatar Type', 'b-blocks')}
              value={iconType}
              options={[
                { label: __('Default Icon', 'b-blocks'), value: 'default' },
                { label: __('Uploaded Image', 'b-blocks'), value: 'image' },
              ]}
              onChange={(iconType) => setAttributes({ iconType })}
            />

            {iconType === 'default' && (
              <TextControl className='mt10' __nextHasNoMarginBottom label={__('Avatar / Icon', 'b-blocks')} value={icon} onChange={(icon) => setAttributes({ icon })} />
            )}

            {iconType === 'image' && (
              <div className='mt10'>
                <MediaUploadCheck>
                  <MediaUpload
                    allowedTypes={['image']}
                    value={iconImage?.id}
                    onSelect={(media) => setAttributes({ iconImage: { url: media.url, id: media.id, alt: media.alt || '' } })}
                    render={({ open }) => (
                      <Button variant='secondary' onClick={open}>
                        {iconImage?.url ? __('Replace Image', 'b-blocks') : __('Upload Image', 'b-blocks')}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
                {iconImage?.url && (
                  <Button className='mt10' variant='link' isDestructive onClick={() => setAttributes({ iconImage: {} })}>
                    {__('Remove Image', 'b-blocks')}
                  </Button>
                )}
              </div>
            )}

            <TextControl className='mt10' __nextHasNoMarginBottom label={__('Model', 'b-blocks')} value={model} onChange={(model) => setAttributes({ model })} />
          </>
        )}
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Prompt', 'b-blocks')} initialOpen={false}>
        <TextareaControl
          __nextHasNoMarginBottom
          label={__('Prompt Text', 'b-blocks')}
          help={__('The prompt shown in the card and copied to the clipboard.', 'b-blocks')}
          rows={5}
          value={promptText}
          onChange={(promptText) => setAttributes({ promptText })}
        />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy Button', 'b-blocks')} initialOpen={false}>
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Show Copy Button', 'b-blocks')} checked={showButton} onChange={(showButton) => setAttributes({ showButton })} />
        {showButton && (
          <TextControl className='mt10' __nextHasNoMarginBottom label={__('Button Label', 'b-blocks')} value={copyLabel} onChange={(copyLabel) => setAttributes({ copyLabel })} />
        )}
      </PanelBody>
    </>
  );
};

export default General;
