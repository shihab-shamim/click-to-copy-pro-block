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
 * Style tab â€” grouped into a few meaningful sections (Container & Window,
 * Header, Command Line, Copy Button) rather than a PanelBody per setting.
 * Every control writes into the single `styles` attribute at styles[element][prop]
 * and is consumed by Components/Common/Style.js (via bpl-tools getCSS helpers).
 */
const Style = ({ attributes, setAttributes }) => {
  const { styles = {} } = attributes;

  const el = (key) => styles?.[key] || {};
  const set = (key, prop) => (val) => setAttributes({ styles: updateData(styles, val, key, prop) });

  return (
    <>
    <PanelBody className='bPlPanelBody' title={__('Container', 'b-blocks')} initialOpen={true} >
        <Background label={__('Background', 'b-blocks')} value={el('stage').background} onChange={set('stage', 'background')} defaults={styleDefaults.stage.background} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('stage').padding} onChange={set('stage', 'padding')} />
        <BoxControl label={__('Margin', 'b-blocks')} values={el('stage').margin} onChange={set('stage', 'margin')} />
        <BoxControl label={__('Radius', 'b-blocks')} values={el('stage').radius} onChange={set('stage', 'radius')} />

    </PanelBody>


      <PanelBody className='bPlPanelBody' title={__('Terminal Window', 'b-blocks')} initialOpen={false}>
      
        <Background label={__('Background', 'b-blocks')} value={el('terminal').background} onChange={set('terminal', 'background')} defaults={styleDefaults.terminal.background} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('terminal').radius} onChange={set('terminal', 'radius')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Max Width', 'b-blocks')} value={el('terminal').width} onChange={set('terminal', 'width')} />
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('terminal').shadow} onChange={set('terminal', 'shadow')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Header (Bar, Dots & Title)', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('bar').background} onChange={set('bar', 'background')} defaults={styleDefaults.bar.background} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('bar').padding} onChange={set('bar', 'padding')} />

        <UnitControl __next40pxDefaultSize label={__('Dots Size', 'b-blocks')} value={el('dots').size} onChange={set('dots', 'size')} />
        <ColorControl label={__('Dot 1 (red)', 'b-blocks')} value={el('dots').colorR} onChange={set('dots', 'colorR')} defaultColor={styleDefaults.dots.colorR} />
        <ColorControl label={__('Dot 2 (yellow)', 'b-blocks')} value={el('dots').colorY} onChange={set('dots', 'colorY')} defaultColor={styleDefaults.dots.colorY} />
        <ColorControl label={__('Dot 3 (green)', 'b-blocks')} value={el('dots').colorG} onChange={set('dots', 'colorG')} defaultColor={styleDefaults.dots.colorG} />

        <ColorControl label={__('Title Color', 'b-blocks')} value={el('title').color} onChange={set('title', 'color')} defaultColor={styleDefaults.title.color} />
        <Typography label={__('Title Typography', 'b-blocks')} value={el('title').typo} onChange={set('title', 'typo')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Command Line', 'b-blocks')} initialOpen={false}>
        <ColorControl label={__('Prompt Color', 'b-blocks')} value={el('prompt').color} onChange={set('prompt', 'color')} defaultColor={styleDefaults.prompt.color} />
        <Typography label={__('Prompt Typography', 'b-blocks')} value={el('prompt').typo} onChange={set('prompt', 'typo')} />

        <ColorControl label={__('Command Color', 'b-blocks')} value={el('command').color} onChange={set('command', 'color')} defaultColor={styleDefaults.command.color} />
        <Typography label={__('Command Typography', 'b-blocks')} value={el('command').typo} onChange={set('command', 'typo')} />

        <BoxControl label={__('Content Padding', 'b-blocks')} values={el('body').padding} onChange={set('body', 'padding')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy Button', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('copy').background} onChange={set('copy', 'background')} defaults={styleDefaults.copy.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('copy').color} onChange={set('copy', 'color')} defaultColor={styleDefaults.copy.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('copy').typo} onChange={set('copy', 'typo')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Icon Size', 'b-blocks')} value={el('copy').iconSize} onChange={set('copy', 'iconSize')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('copy').padding} onChange={set('copy', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('copy').radius} onChange={set('copy', 'radius')} />
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('copy').shadow} onChange={set('copy', 'shadow')} />
      </PanelBody>
    </>
  );
};

export default Style;
