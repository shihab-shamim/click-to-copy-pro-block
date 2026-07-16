import { __ } from '@wordpress/i18n';
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { ItemsPanel } from '../../../../../../../../bpl-tools/Components';
import AdvColorControl from '../../../AdvColorControl/AdvColorControl';
import { FORMAT_OPTIONS } from '../../../AdvColorControl/colorFormats';
import { updateData } from '../../../../utils/functions';
import { newSwatch } from '../../../../utils/options';

/**
 * Per-swatch controls rendered by ItemsPanel for each item in the `swatches`
 * array. A single color drives the chip background, the HEX label, and the
 * copied value (via the inline `--c` custom property in OneCard).
 */
const SwatchSettings = ({ attributes, setAttributes, arrKey, index }) => {
  const items = attributes[arrKey] || [];
  const item = items[index] || {};
  const setColor = (val) => setAttributes({ [arrKey]: updateData(items, val, index, 'color') });
  const setDisplayFormat = (val) => setAttributes({ [arrKey]: updateData(items, val, index, 'displayFormat') });

  return (
    <>
      <AdvColorControl
        label={__('Color', 'b-blocks')}
        value={item.color}
        onChange={setColor}
        defaultColor={newSwatch.color}
      />

      <ToggleGroupControl
        className='mt15'
        __nextHasNoMarginBottom
        isBlock
        label={__('Display Format', 'b-blocks')}
        value={item.displayFormat || 'hex'}
        onChange={setDisplayFormat}
      >
        {FORMAT_OPTIONS.map((opt) => (
          <ToggleGroupControlOption key={opt.value} value={opt.value} label={opt.label} />
        ))}
      </ToggleGroupControl>
    </>
  );
};

const General = ({ attributes, setAttributes }) => {
  return (
    <ItemsPanel
      design='sortable'
      attributes={attributes}
      setAttributes={setAttributes}
      arrKey='swatches'
      newItem={newSwatch}
      itemLabel='Swatch'
      ItemSettings={SwatchSettings}
    />
  );
};

export default General;
