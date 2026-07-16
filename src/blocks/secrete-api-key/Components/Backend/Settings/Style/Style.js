import { __ } from '@wordpress/i18n';
import { PanelBody, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import {
  Background,
  ColorControl,
  Typography,
  BoxControl,
  ShadowControl,
  Label,
} from '../../../../../../../../bpl-tools/Components';
import { updateData } from '../../../../utils/functions';
import { styleDefaults } from '../../../../utils/options';

/**
 * Style tab â€” grouped into meaningful sections (Container, Glass Card, Header,
 * Key Value, Action Buttons) rather than a PanelBody per setting. Every control
 * writes into the single `styles` attribute at styles[element][prop] and is
 * consumed by Components/Common/Style.js (via bpl-tools getCSS helpers).
 */
const Style = ({ attributes, setAttributes }) => {
  const { styles = {} } = attributes;

  const el = (key) => styles?.[key] || {};
  const set = (key, prop) => (val) => setAttributes({ styles: updateData(styles, val, key, prop) });

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Container', 'b-blocks')} initialOpen={true}>
        <Background label={__('Background', 'b-blocks')} value={el('stage').background} onChange={set('stage', 'background')} defaults={styleDefaults.stage.background} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('stage').padding} onChange={set('stage', 'padding')} />
        <BoxControl label={__('Margin', 'b-blocks')} values={el('stage').margin} onChange={set('stage', 'margin')} />
        <BoxControl label={__('Radius', 'b-blocks')} values={el('stage').radius} onChange={set('stage', 'radius')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Glass Card', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('glasskey').background} onChange={set('glasskey', 'background')} defaults={styleDefaults.glasskey.background} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('glasskey').padding} onChange={set('glasskey', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('glasskey').radius} onChange={set('glasskey', 'radius')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Max Width', 'b-blocks')} value={el('glasskey').width} onChange={set('glasskey', 'width')} />
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('glasskey').shadow} onChange={set('glasskey', 'shadow')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Badge', 'b-blocks')}>
        <Background label={__('Background', 'b-blocks')} value={el('badge').background} onChange={set('badge', 'background')} defaults={styleDefaults.badge.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('badge').color} onChange={set('badge', 'color')} defaultColor={styleDefaults.badge.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('badge').typo} onChange={set('badge', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('badge').padding} onChange={set('badge', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('badge').radius} onChange={set('badge', 'radius')} />

      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Name', 'b-blocks')} initialOpen={false}>
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('name').color} onChange={set('name', 'color')} defaultColor={styleDefaults.name.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('name').typo} onChange={set('name', 'typo')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Key Value', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('value').background} onChange={set('value', 'background')} defaults={styleDefaults.value.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('value').color} onChange={set('value', 'color')} defaultColor={styleDefaults.value.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('value').typo} onChange={set('value', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('value').padding} onChange={set('value', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('value').radius} onChange={set('value', 'radius')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Action Buttons', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('btn').background} onChange={set('btn', 'background')} defaults={styleDefaults.btn.background} />
        <ColorControl label={__('Icon Color', 'b-blocks')} value={el('btn').color} onChange={set('btn', 'color')} defaultColor={styleDefaults.btn.color} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Button Size', 'b-blocks')} value={el('btn').size} onChange={set('btn', 'size')} />
        <BoxControl className='mt15' label={__('Border Radius', 'b-blocks')} values={el('btn').radius} onChange={set('btn', 'radius')} />

        <Background label={__('Hover Background', 'b-blocks')} value={el('btn').hoverBackground} onChange={set('btn', 'hoverBackground')} defaults={styleDefaults.btn.hoverBackground} />
        <ColorControl label={__('Hover Icon Color', 'b-blocks')} value={el('btn').hoverColor} onChange={set('btn', 'hoverColor')} defaultColor={styleDefaults.btn.hoverColor} />

        <Background label={__('Copied Background', 'b-blocks')} value={el('btn').copiedBackground} onChange={set('btn', 'copiedBackground')} defaults={styleDefaults.btn.copiedBackground} />
        <ColorControl label={__('Copied Icon Color', 'b-blocks')} value={el('btn').copiedColor} onChange={set('btn', 'copiedColor')} defaultColor={styleDefaults.btn.copiedColor} />
      </PanelBody>
    </>
  );
};

export default Style;
