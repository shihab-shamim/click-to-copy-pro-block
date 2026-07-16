import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import {
  Background,
  ColorControl,
  Typography,
  BoxControl,
  ShadowControl,
  Label,
} from '../../../../../../../../bpl-tools/Components';
import { updateData } from '../../../../utils/functions';
import { borderStyles, styleDefaults } from '../../../../utils/options';


const Style = ({ attributes, setAttributes }) => {
  const { styles = {} } = attributes;

  const el = (key) => styles?.[key] || {};
  const set = (key, prop) => (val) => setAttributes({ styles: updateData(styles, val, key, prop) });
  const setSub = (key, sub, prop) => (val) => setAttributes({ styles: updateData(styles, val, key, sub, prop) });

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Container', 'b-blocks')} initialOpen={true}>
        <Background label={__('Background', 'b-blocks')} value={el('stage').background} onChange={set('stage', 'background')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('stage').padding} onChange={set('stage', 'padding')} />
        <BoxControl label={__('Margin', 'b-blocks')} values={el('stage').margin} onChange={set('stage', 'margin')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Card', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('prompt').background} onChange={set('prompt', 'background')} defaults={styleDefaults.prompt.background} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('prompt').padding} onChange={set('prompt', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('prompt').radius} onChange={set('prompt', 'radius')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Max Width', 'b-blocks')} value={el('prompt').width} onChange={set('prompt', 'width')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Gap', 'b-blocks')} value={el('prompt').gap} onChange={set('prompt', 'gap')} />
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('prompt').shadow} onChange={set('prompt', 'shadow')} />

        <UnitControl __next40pxDefaultSize label={__('Border Width', 'b-blocks')} value={el('prompt').border?.width} onChange={setSub('prompt', 'border', 'width')} />
        <SelectControl __nextHasNoMarginBottom className='mt15' label={__('Border Style', 'b-blocks')} value={el('prompt').border?.style} options={borderStyles} onChange={setSub('prompt', 'border', 'style')} />
        <ColorControl label={__('Border Color', 'b-blocks')} value={el('prompt').border?.color} onChange={setSub('prompt', 'border', 'color')} defaultColor={styleDefaults.prompt.border.color} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Avatar', 'b-blocks')} initialOpen={false}>
         <Background label={__('Background', 'b-blocks')} value={el('avatar').background} onChange={set('avatar', 'background')} defaults={styleDefaults.avatar.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('avatar').color} onChange={set('avatar', 'color')} defaultColor={styleDefaults.avatar.color} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Size', 'b-blocks')} value={el('avatar').size} onChange={set('avatar', 'size')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('avatar').radius} onChange={set('avatar', 'radius')} />
        <Typography label={__('Typography', 'b-blocks')} value={el('avatar').typo} onChange={set('avatar', 'typo')} />

      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Model', 'b-blocks')} initialOpen={false}>
       

        <ColorControl label={__('Text Color', 'b-blocks')} value={el('model').color} onChange={set('model', 'color')} defaultColor={styleDefaults.model.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('model').typo} onChange={set('model', 'typo')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Prompt Text', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('text').background} onChange={set('text', 'background')} defaults={styleDefaults.text.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('text').color} onChange={set('text', 'color')} defaultColor={styleDefaults.text.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('text').typo} onChange={set('text', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('text').padding} onChange={set('text', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('text').radius} onChange={set('text', 'radius')} />

        <UnitControl __next40pxDefaultSize label={__('Border Width', 'b-blocks')} value={el('text').border?.width} onChange={setSub('text', 'border', 'width')} />
        <SelectControl __nextHasNoMarginBottom className='mt15' label={__('Border Style', 'b-blocks')} value={el('text').border?.style} options={borderStyles} onChange={setSub('text', 'border', 'style')} />
        <ColorControl label={__('Border Color', 'b-blocks')} value={el('text').border?.color} onChange={setSub('text', 'border', 'color')} defaultColor={styleDefaults.text.border.color} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy Button', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('btn').background} onChange={set('btn', 'background')} defaults={styleDefaults.btn.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('btn').color} onChange={set('btn', 'color')} defaultColor={styleDefaults.btn.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('btn').typo} onChange={set('btn', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('btn').padding} onChange={set('btn', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('btn').radius} onChange={set('btn', 'radius')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Icon Size', 'b-blocks')} value={el('btn').iconSize} onChange={set('btn', 'iconSize')} />

        <Label className='mt20'>{__('Hover', 'b-blocks')}</Label>
        <Background label={__('Hover Background', 'b-blocks')} value={el('btn').hoverBackground} onChange={set('btn', 'hoverBackground')} defaults={styleDefaults.btn.hoverBackground} />

        <Label className='mt20'>{__('Copied State', 'b-blocks')}</Label>
        <Background label={__('Copied Background', 'b-blocks')} value={el('btn').copiedBackground} onChange={set('btn', 'copiedBackground')} defaults={styleDefaults.btn.copiedBackground} />
      </PanelBody>
    </>
  );
};

export default Style;
