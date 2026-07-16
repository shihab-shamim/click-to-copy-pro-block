import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import {
  Background,
  Typography,
  BoxControl,
  ShadowControl,
} from '../../../../../../../../bpl-tools/Components';
import AdvColorControl from '../../../AdvColorControl/AdvColorControl';
import { updateData } from '../../../../utils/functions';
import { styleDefaults } from '../../../../utils/options';

/**
 * Style tab â€” grouped into meaningful sections (Container, Palette Grid, Swatch,
 * Hex Label) rather than a PanelBody per setting. Every control writes into the
 * single `styles` attribute at styles[element][prop] and is consumed by
 * Components/Common/Style.js (via bpl-tools getCSS helpers).
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

      <PanelBody className='bPlPanelBody' title={__('Palette Grid', 'b-blocks')} initialOpen={false}>
        <RangeControl __nextHasNoMarginBottom label={__('Columns', 'b-blocks')} min={1} max={6} value={el('palette').columns} onChange={set('palette', 'columns')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Gap', 'b-blocks')} value={el('palette').gap} onChange={set('palette', 'gap')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Max Width', 'b-blocks')} value={el('palette').width} onChange={set('palette', 'width')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Swatch', 'b-blocks')} initialOpen={false}>
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('swatch').radius} onChange={set('swatch', 'radius')} />
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('swatch').shadow} onChange={set('swatch', 'shadow')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Hex Label', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('hex').background} onChange={set('hex', 'background')} defaults={styleDefaults.hex.background} />
        <AdvColorControl label={__('Text Color', 'b-blocks')} value={el('hex').color} onChange={set('hex', 'color')} defaultColor={styleDefaults.hex.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('hex').typo} onChange={set('hex', 'typo')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('hex').padding} onChange={set('hex', 'padding')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Overlay', 'b-blocks')} initialOpen={false}>
        <Background label={__('Overlay Background Color', 'b-blocks')} value={el('overlay').background} onChange={set('overlay', 'background')} defaults={styleDefaults.overlay.background} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copied State', 'b-blocks')} initialOpen={false}>
        <Background label={__('Copied Overlay Background Color', 'b-blocks')} value={el('copied').background} onChange={set('copied', 'background')} defaults={styleDefaults.copied.background} />
        <ShadowControl className='mt20' label={__('Copied Box Shadow', 'b-blocks')} value={el('copied').shadow} onChange={set('copied', 'shadow')} />
      </PanelBody>
    </>
  );
};

export default Style;
