import { useEffect, useState } from 'react';
import useWPAjax from '../../../../bpl-tools/hooks/useWPAjax';

/**
 * useBlocksSettings — reads/writes the enabled/disabled block list.
 * Mirrors info-cards/src/admin/hooks/useBlocksSettings.js.
 *
 * Data flow:
 *   PHP RestAPI::ctcGetBlocks (AJAX) <-> option `ctcBlocks` (array of disabled folder names)
 *
 * @param {string} action WP AJAX action name ('ctcGetBlocks')
 * @param {string} nonce  ctc_admin_nonce
 */
const useBlocksSettings = (action, nonce) => {
	const [internalStatus, setInternalStatus] = useState(null);

	const { data = [], saveData = () => {}, refetch = () => {}, isLoading = false } = useWPAjax(
		action,
		{ _wpnonce: nonce },
		true
	) || {};

	useEffect(() => {
		if (nonce && action) {
			refetch();
		}
	}, [nonce, action]);

	useEffect(() => {
		if (!isLoading && data) {
			setInternalStatus('');
		}
	}, [data, isLoading]);

	const saveToBackend = async (updatedBlocksName) => {
		try {
			setInternalStatus('loading');

			const response = await saveData({
				_wpnonce: nonce,
				data: JSON.stringify(updatedBlocksName)
			});

			setInternalStatus('success');
			return response;
		} catch (error) {
			console.error('Save failed:', error);
			setInternalStatus('error');
		}
	};

	return {
		data,
		internalStatus,
		saveToBackend,
		isLoading
	};
};

export default useBlocksSettings;
