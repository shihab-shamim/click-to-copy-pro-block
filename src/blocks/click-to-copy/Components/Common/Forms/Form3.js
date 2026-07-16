import { __ } from '@wordpress/i18n';
import Button from '../Elements/Button';
import Email from '../Elements/Email';

const Form3 = ({ attributes, labelEl, InputEl, handleCopy, copied }) => {
    const { elements } = attributes;
    const { label } = elements;
    return <div className='inputForm inputForm3'>
        {label && labelEl}

        <div className={`copyTextForm3 ${copied && 'active'}`}>
            <Email attributes={attributes} InputEl={InputEl} />
        </div>
        <Button attributes={attributes} handleCopy={handleCopy} />
        {copied && <div className='message'>{__('Copied', 'clipboard')}</div>}

    </div>
}
export default Form3;