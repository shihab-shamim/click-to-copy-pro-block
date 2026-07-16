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

/**
 * Style tab â€” grouped into meaningful sections (Container, Code Card, Top Bar,
 * Copy Button, Code Area, Banner) rather than a PanelBody per setting. Every
 * control writes into the single `styles` attribute at styles[element][prop]
 * and is consumed by Components/Common/Style.js (via bpl-tools getCSS helpers).
 */
const Style = ({ attributes, setAttributes }) => {
  const { styles = {} } = attributes;

  const el = (key) => styles?.[key] || {};
  const set = (key, prop) => (val) => setAttributes({ styles: updateData(styles, val, key, prop) });
  // Nested setter for grouped objects like border/divider (styles[key][sub][prop]).
  const setSub = (key, sub, prop) => (val) => setAttributes({ styles: updateData(styles, val, key, sub, prop) });

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Container', 'b-blocks')} initialOpen={true}>
        <Background label={__('Background', 'b-blocks')} value={el('stage').background} onChange={set('stage', 'background')} defaults={styleDefaults.stage.background} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('stage').padding} onChange={set('stage', 'padding')} />
        <BoxControl label={__('Margin', 'b-blocks')} values={el('stage').margin} onChange={set('stage', 'margin')} />
        <BoxControl label={__('Radius', 'b-blocks')} values={el('stage').radius} onChange={set('stage', 'radius')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Code Card', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('codeblock').background} onChange={set('codeblock', 'background')} defaults={styleDefaults.codeblock.background} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('codeblock').radius} onChange={set('codeblock', 'radius')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Max Width', 'b-blocks')} value={el('codeblock').width} onChange={set('codeblock', 'width')} />
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('codeblock').shadow} onChange={set('codeblock', 'shadow')} />

        <UnitControl __next40pxDefaultSize label={__('Border Width', 'b-blocks')} value={el('codeblock').border?.width} onChange={setSub('codeblock', 'border', 'width')} />
        <SelectControl __nextHasNoMarginBottom className='mt15' label={__('Border Style', 'b-blocks')} value={el('codeblock').border?.style} options={borderStyles} onChange={setSub('codeblock', 'border', 'style')} />
        <ColorControl label={__('Border Color', 'b-blocks')} value={el('codeblock').border?.color} onChange={setSub('codeblock', 'border', 'color')} defaultColor={styleDefaults.codeblock.border.color} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Top Bar', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('top').background} onChange={set('top', 'background')} defaults={styleDefaults.top.background} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('top').padding} onChange={set('top', 'padding')} />

        <UnitControl __next40pxDefaultSize label={__('Divider Thickness', 'b-blocks')} value={el('top').divider?.width} onChange={setSub('top', 'divider', 'width')} />
        <SelectControl __nextHasNoMarginBottom className='mt15' label={__('Divider Style', 'b-blocks')} value={el('top').divider?.style} options={borderStyles} onChange={setSub('top', 'divider', 'style')} />
        <ColorControl label={__('Divider Color', 'b-blocks')} value={el('top').divider?.color} onChange={setSub('top', 'divider', 'color')} defaultColor={styleDefaults.top.divider.color} />

        <Label className='mt20'>{__('Language Label', 'b-blocks')}</Label>
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('lang').color} onChange={set('lang', 'color')} defaultColor={styleDefaults.lang.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('lang').typo} onChange={set('lang', 'typo')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy Button', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('copy').background} onChange={set('copy', 'background')} defaults={styleDefaults.copy.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('copy').color} onChange={set('copy', 'color')} defaultColor={styleDefaults.copy.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('copy').typo} onChange={set('copy', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('copy').padding} onChange={set('copy', 'padding')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('copy').radius} onChange={set('copy', 'radius')} />

        <Label className='mt20'>{__('Border', 'b-blocks')}</Label>
        <UnitControl __next40pxDefaultSize label={__('Border Width', 'b-blocks')} value={el('copy').border?.width} onChange={setSub('copy', 'border', 'width')} />
        <SelectControl __nextHasNoMarginBottom className='mt15' label={__('Border Style', 'b-blocks')} value={el('copy').border?.style} options={borderStyles} onChange={setSub('copy', 'border', 'style')} />
        <ColorControl label={__('Border Color', 'b-blocks')} value={el('copy').border?.color} onChange={setSub('copy', 'border', 'color')} defaultColor={styleDefaults.copy.border.color} />

        <Label className='mt20'>{__('Hover', 'b-blocks')}</Label>
        <Background label={__('Hover Background', 'b-blocks')} value={el('copy').hoverBackground} onChange={set('copy', 'hoverBackground')} defaults={styleDefaults.copy.hoverBackground} />
        <ColorControl label={__('Hover Text Color', 'b-blocks')} value={el('copy').hoverColor} onChange={set('copy', 'hoverColor')} defaultColor={styleDefaults.copy.hoverColor} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Code Area', 'b-blocks')} initialOpen={false}>
        <ColorControl label={__('Code Text Color', 'b-blocks')} value={el('code').color} onChange={set('code', 'color')} defaultColor={styleDefaults.code.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('pre').typo} onChange={set('pre', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('pre').padding} onChange={set('pre', 'padding')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Banner', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('banner').background} onChange={set('banner', 'background')} defaults={styleDefaults.banner.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('banner').color} onChange={set('banner', 'color')} defaultColor={styleDefaults.banner.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('banner').typo} onChange={set('banner', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('banner').padding} onChange={set('banner', 'padding')} />
      </PanelBody>
    </>
  );
};

export default Style;
