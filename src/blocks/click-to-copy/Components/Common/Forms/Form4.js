import { __ } from '@wordpress/i18n';
import Email from '../Elements/Email';

const Form4 = ({ attributes, handleCopy, InputEl, copied }) => {
    const { elements } = attributes;
    const { text } = elements;

    return text && <div className='form4'>
        <div className='formMainArea'>
            <div className='content' onClick={e => { e.preventDefault(); handleCopy(); }}>
                <Email attributes={attributes} InputEl={InputEl} />
            </div>
            <div className='hoverContent'>
                {copied ? __("Copied", "clipboard") : __("Click to copy", "clipboard")}
            </div>
        </div>
    </div>
}
export default Form4;