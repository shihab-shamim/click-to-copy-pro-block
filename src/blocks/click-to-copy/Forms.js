import { useState, useRef } from 'react';
import Default from './Components/Common/Forms/Default';
import Form1 from './Components/Common/Forms/Form1';
import Form2 from './Components/Common/Forms/Form2';
import Form3 from './Components/Common/Forms/Form3';
import Form4 from './Components/Common/Forms/Form4';

const Forms = ({ attributes, labelEl, InputEl, setCopied, copied, divRef }) => {
	const { forms } = attributes;

	function handleCopy() {
		const text = divRef?.current?.innerText;

		navigator?.clipboard?.writeText(text);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	}

	const globalFormsProps = {
		attributes,
		labelEl,
		InputEl,
		handleCopy,
		copied,
	}

	return <div className={`ctcClickToCopy form ${forms}`}>

		{'default' === forms && <Default {...globalFormsProps} />}
		{'form1' === forms && <Form1 {...globalFormsProps} />}
		{'form2' === forms && <Form2  {...globalFormsProps} />}
		{'form3' === forms && <Form3 {...globalFormsProps} />}
		{'form4' === forms && <Form4 {...globalFormsProps} />}
	</div >
}
export default Forms;