/**
 * AdvColorControl â€” an advanced, format-aware color control.
 *
 * A drop-in richer alternative to ColorControl. The value is a plain CSS color
 * string stored in the user's chosen format; this control never auto-converts â€”
 * it only converts when the user changes the format selector, and otherwise
 * emits the picked color back in the current format. That keeps the dynamic CSS
 * output in exactly the format the user chose and preserves old saved values.
 *
 * @props className (String, optional)
 * @props label (String)
 * @props value (String) â€” CSS color in any supported format
 * @props onChange (Function) â€” receives the formatted color string
 * @props defaultColor (String) â€” reset target + quick-reset swatch
 * @props disableAlpha (Boolean) â€” hide the picker alpha channel
 * @props recentKey (String, optional) â€” localStorage bucket for recent colors
 */

import { useEffect, useState, forwardRef } from 'react';
import { Button, ColorPicker, Dropdown, PanelRow, SelectControl, TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import Label from '../../../../../../bpl-tools/Components/Label/Label';
import { parseColor, detectFormat, formatColor, formatHasAlpha, toPickerColor, FORMAT_OPTIONS } from './colorFormats';
import './AdvColorControl.scss';

const RECENT_MAX = 8;

const readRecents = (key) => {
	try {
		return JSON.parse(window.localStorage.getItem(key)) || [];
	} catch (_) {
		return [];
	}
};
const writeRecents = (key, list) => {
	try {
		window.localStorage.setItem(key, JSON.stringify(list.slice(0, RECENT_MAX)));
	} catch (_) { /* private mode / disabled storage â€” ignore */ }
};

const ThemeColors = withSelect((select) => ({
	themeColors: select('core/block-editor').getSettings().colors,
}))(({ onChange, themeColors }) => (themeColors?.length ? (
	<div className='bPlThemeColors'>
		{themeColors.map(({ color, name }) => (
			<div key={color} className='bPlColorButtonContainer'>
				<button type='button' className='bPlColorButton' aria-label={name || color} title={name || color} style={{ backgroundColor: color || 'transparent' }} onClick={() => onChange(color)} />
			</div>
		))}
	</div>
) : null));

const AdvColorControl = forwardRef((props, ref) => {
	const {
		className = '',
		label = __('Color:'),
		value = '',
		onChange,
		defaultColor,
		disableAlpha = false,
		recentKey = 'bplRecentColors',
	} = props;

	// Format + canonical color are DERIVED from the stored value, so a reloaded
	// block shows the exact format it was saved in.
	const format = detectFormat(value);
	const rgba = parseColor(value) || parseColor(defaultColor) || { r: 0, g: 0, b: 0, a: 1 };

	const [draft, setDraft] = useState(value);
	const [error, setError] = useState('');
	const [alpha, setAlpha] = useState(rgba.a);
	const [recents, setRecents] = useState(() => readRecents(recentKey));
	const [hasEyeDropper] = useState(() => typeof window !== 'undefined' && 'EyeDropper' in window);

	// Keep the manual field in sync with external value changes; only let an
	// alpha-carrying value refresh the remembered alpha (so switching through a
	// non-alpha format doesn't wipe transparency â€” "preserve alpha").
	useEffect(() => {
		setDraft(value);
		setError('');
		const p = parseColor(value);
		if (p && formatHasAlpha(detectFormat(value))) {
			setAlpha(p.a);
		}
	}, [value]);

	const pushRecent = (str) => {
		if (!str) return;
		const next = [str, ...recents.filter((c) => c !== str)].slice(0, RECENT_MAX);
		setRecents(next);
		writeRecents(recentKey, next);
	};

	const commit = (str) => {
		onChange(str);
		pushRecent(str);
	};

	// Emit an { r,g,b,a } in a given format (defaults to the current one).
	const emit = (obj, fmt = format) => {
		if (typeof obj.a === 'number') setAlpha(obj.a);
		commit(formatColor(obj, fmt));
	};

	const handleFormatChange = (newFmt) => {
		// Convert only now, carrying the remembered alpha into alpha-capable formats.
		commit(formatColor({ ...rgba, a: alpha }, newFmt));
	};

	const handlePicker = (c) => {
		const next = { r: c.rgb.r, g: c.rgb.g, b: c.rgb.b, a: disableAlpha ? 1 : c.rgb.a };
		emit(next);
	};

	const applyString = (str) => {
		const parsed = parseColor(str);
		if (!parsed) {
			setError(__('Invalid color value', 'bpl-tools'));
			return false;
		}
		setError('');
		emit(parsed);
		return true;
	};

	const handleManualCommit = () => {
		if (draft?.trim() === (value || '').trim()) return;
		applyString(draft);
	};

	const handleCopy = () => {
		try {
			window.navigator.clipboard.writeText(value || '');
		} catch (_) { /* ignore */ }
	};

	const handlePaste = async () => {
		try {
			const text = await window.navigator.clipboard.readText();
			if (!applyString((text || '').trim())) {
				setError(__('Clipboard has no valid color', 'bpl-tools'));
			}
		} catch (_) {
			setError(__('Could not read the clipboard', 'bpl-tools'));
		}
	};

	const handleEyeDropper = async () => {
		try {
			const result = await new window.EyeDropper().open();
			applyString(result?.sRGBHex);
		} catch (_) { /* user cancelled â€” ignore */ }
	};

	const handleReset = () => {
		if (defaultColor) commit(defaultColor);
	};

	return (
		<PanelRow ref={ref} className={`bPlAdvColor ${className}`}>
			<Label>{label}</Label>

			<Dropdown
				className='bPlDropdownContainer bPlColor'
				contentClassName='bPlDropdownPopover bPlAdvColorPopover'
				popoverProps={{ placement: 'top-end' }}
				renderToggle={({ isOpen, onToggle }) => (
					<>
						<div className='bPlColorButtonContainer'>
							<button type='button' className='bPlColorButton' onClick={onToggle} aria-expanded={isOpen} aria-label={typeof label === 'string' ? label : __('Color', 'bpl-tools')} style={{ backgroundColor: value || 'transparent' }} />
						</div>

						{defaultColor && defaultColor !== value && (
							<Button className='bPlResetVal' icon='image-rotate' label={__('Reset', 'bpl-tools')} onClick={handleReset} />
						)}
					</>
				)}
				renderContent={() => (
					<div className='bPlAdvColorPanel'>
						<SelectControl
							__nextHasNoMarginBottom
							className='bPlAdvColorFormat'
							label={__('Format', 'bpl-tools')}
							value={format}
							options={FORMAT_OPTIONS}
							onChange={handleFormatChange}
						/>

						<ColorPicker
							color={toPickerColor(rgba)}
							enableAlpha={!disableAlpha}
							onChangeComplete={handlePicker}
						/>

						<div className='bPlAdvColorField'>
							<TextControl
								__nextHasNoMarginBottom
								label={__('Value', 'bpl-tools')}
								value={draft}
								onChange={setDraft}
								onBlur={handleManualCommit}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										applyString(draft);
									}
								}}
								aria-invalid={!!error}
							/>
							{error && <p className='bPlAdvColorError' role='alert'>{error}</p>}
						</div>

						<div className='bPlAdvColorActions'>
							<Button variant='secondary' size='small' icon='admin-page' label={__('Copy value', 'bpl-tools')} showTooltip onClick={handleCopy} />
							<Button variant='secondary' size='small' icon='clipboard' label={__('Paste value', 'bpl-tools')} showTooltip onClick={handlePaste} />
							{hasEyeDropper && (
								<Button variant='secondary' size='small' icon='color-picker' label={__('Pick from screen', 'bpl-tools')} showTooltip onClick={handleEyeDropper} />
							)}
							{defaultColor && (
								<Button variant='secondary' size='small' icon='image-rotate' label={__('Reset to default', 'bpl-tools')} showTooltip onClick={handleReset} />
							)}
						</div>

						{defaultColor && (
							<div className='bPlAdvColorRow'>
								<span className='bPlAdvColorRowLabel'>{__('Default', 'bpl-tools')}</span>
								<button type='button' className='bPlColorButton' style={{ backgroundColor: defaultColor }} aria-label={__('Reset to default', 'bpl-tools')} title={defaultColor} onClick={handleReset} />
							</div>
						)}

						{recents.length > 0 && (
							<div className='bPlAdvColorRow'>
								<span className='bPlAdvColorRowLabel'>{__('Recent', 'bpl-tools')}</span>
								<div className='bPlAdvColorSwatches'>
									{recents.map((c, i) => (
										<button key={`${c}-${i}`} type='button' className='bPlColorButton' style={{ backgroundColor: c }} aria-label={c} title={c} onClick={() => commit(c)} />
									))}
								</div>
							</div>
						)}

						<ThemeColors onChange={commit} />
					</div>
				)}
			/>
		</PanelRow>
	);
});

export default AdvColorControl;
