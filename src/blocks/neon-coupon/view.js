import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Components/Common/Style';
import OneCard from './Components/Common/coupon/OneCard';

document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-ctcb-neon-coupon');
	blockNameEls.forEach(blockNameEl => {
		const attributes = JSON.parse(blockNameEl.dataset.attributes);

		createRoot(blockNameEl).render(<>
			<Style attributes={attributes} id={blockNameEl.id} />

			<OneCard attributes={attributes} />
		</>);

		blockNameEl?.removeAttribute('data-attributes');
	});
});
