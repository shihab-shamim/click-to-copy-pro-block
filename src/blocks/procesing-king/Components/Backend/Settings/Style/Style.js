import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import {
  Background,
  ColorControl,
  Typography,
  BoxControl,
  ShadowControl,
} from '../../../../../../../../bpl-tools/Components';
import { updateData } from '../../../../utils/functions';
import { styleDefaults } from '../../../../utils/options';

/**
 * Style tab â€” grouped into meaningful sections (Container, Ring, Title, Code)
 * rather than a PanelBody per setting. Every control writes into the single
 * `styles` attribute at styles[element][prop] and is consumed by
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
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('stage').radius} onChange={set('stage', 'radius')} />
       
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('stage').shadow} onChange={set('stage', 'shadow')} />

      
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Ring', 'b-blocks')} initialOpen={false}>
      
        <RangeControl __nextHasNoMarginBottom className='mt20' label={__('Ring Thickness', 'b-blocks')} min={1} max={24} value={el('ring').thickness} onChange={set('ring', 'thickness')} />
        <ColorControl label={__('Track Color', 'b-blocks')} value={el('ring').track} onChange={set('ring', 'track')} defaultColor={styleDefaults.ring.track} />
        <ColorControl label={__('Progress Color', 'b-blocks')} value={el('ring').progress} onChange={set('ring', 'progress')} defaultColor={styleDefaults.ring.progress} />

       

        
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Animation Duration', 'b-blocks')} units={[{ value: 's', label: 's' }, { value: 'ms', label: 'ms' }]} value={el('ring').duration} onChange={set('ring', 'duration')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Title', 'b-blocks')} initialOpen={false}>
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('title').color} onChange={set('title', 'color')} defaultColor={styleDefaults.title.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('title').typo} onChange={set('title', 'typo')} />
        <BoxControl label={__('Margin', 'b-blocks')} values={el('title').margin} onChange={set('title', 'margin')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('title').padding} onChange={set('title', 'padding')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Code', 'b-blocks')} initialOpen={false}>
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('code').color} onChange={set('code', 'color')} defaultColor={styleDefaults.code.color} />
        <Typography label={__('Typography', 'b-blocks')} value={el('code').typo} onChange={set('code', 'typo')} />
        <BoxControl label={__('Margin', 'b-blocks')} values={el('code').margin} onChange={set('code', 'margin')} />
        <BoxControl label={__('Padding', 'b-blocks')} values={el('code').padding} onChange={set('code', 'padding')} />
      </PanelBody>
    </>
  );
};

export default Style;
