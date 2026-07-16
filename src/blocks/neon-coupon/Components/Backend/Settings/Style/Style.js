import { __ } from '@wordpress/i18n';
import { PanelBody, __experimentalUnitControl as UnitControl } from '@wordpress/components';
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
 * Style tab â€” grouped into meaningful sections (Container, Coupon Window, Offer
 * Text, Perforation, Copy Button) rather than a PanelBody per setting. Every
 * control writes into the single `styles` attribute at styles[element][prop] and
 * is consumed by Components/Common/Style.js (via bpl-tools getCSS helpers).
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

      <PanelBody className='bPlPanelBody' title={__('Coupon Window', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('coupon').background} onChange={set('coupon', 'background')} defaults={styleDefaults.coupon.background} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('coupon').radius} onChange={set('coupon', 'radius')} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Max Width', 'b-blocks')} value={el('coupon').width} onChange={set('coupon', 'width')} />
        <ShadowControl className='mt20' label={__('Box Shadow', 'b-blocks')} value={el('coupon').shadow} onChange={set('coupon', 'shadow')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Offer Text', 'b-blocks')} initialOpen={false}>
        <BoxControl label={__('Content Padding', 'b-blocks')} values={el('left').padding} onChange={set('left', 'padding')} />

        <ColorControl label={__('Label Color', 'b-blocks')} value={el('label').color} onChange={set('label', 'color')} defaultColor={styleDefaults.label.color} />
        <Typography label={__('Label Typography', 'b-blocks')} value={el('label').typo} onChange={set('label', 'typo')} />

        <Background label={__('Amount Gradient', 'b-blocks')} value={el('amount').background} onChange={set('amount', 'background')} defaults={styleDefaults.amount.background} />
        <Typography label={__('Amount Typography', 'b-blocks')} value={el('amount').typo} onChange={set('amount', 'typo')} />

        <ColorControl label={__('Terms Color', 'b-blocks')} value={el('terms').color} onChange={set('terms', 'color')} defaultColor={styleDefaults.terms.color} />
        <Typography label={__('Terms Typography', 'b-blocks')} value={el('terms').typo} onChange={set('terms', 'typo')} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Perforation', 'b-blocks')} initialOpen={false}>
        <ColorControl label={__('Divider Color', 'b-blocks')} value={el('perf').color} onChange={set('perf', 'color')} defaultColor={styleDefaults.perf.color} />
      </PanelBody>

      <PanelBody className='bPlPanelBody' title={__('Copy Button', 'b-blocks')} initialOpen={false}>
        <Background label={__('Background', 'b-blocks')} value={el('right').background} onChange={set('right', 'background')} defaults={styleDefaults.right.background} />
        <ColorControl label={__('Text Color', 'b-blocks')} value={el('right').color} onChange={set('right', 'color')} defaultColor={styleDefaults.right.color} />
        <Background label={__('Hover Background', 'b-blocks')} value={el('right').hoverBackground} onChange={set('right', 'hoverBackground')} defaults={styleDefaults.right.hoverBackground} />
        <ColorControl label={__('Hover Text/Icon Color', 'b-blocks')} value={el('right').hoverColor} onChange={set('right', 'hoverColor')} defaultColor={styleDefaults.right.hoverColor} />
        <UnitControl __next40pxDefaultSize className='mt20' label={__('Width', 'b-blocks')} value={el('right').width} onChange={set('right', 'width')} />
        <BoxControl label={__('Border Radius', 'b-blocks')} values={el('right').radius} onChange={set('right', 'radius')} />

        <Typography label={__('Hint Typography', 'b-blocks')} value={el('hint').typo} onChange={set('hint', 'typo')} />
        <Typography label={__('Code Typography', 'b-blocks')} value={el('code').typo} onChange={set('code', 'typo')} />
      </PanelBody>
    </>
  );
};

export default Style;
