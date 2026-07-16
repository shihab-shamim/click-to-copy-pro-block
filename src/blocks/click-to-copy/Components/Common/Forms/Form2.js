import { __ } from '@wordpress/i18n';
import Button from '../Elements/Button';
import Email from '../Elements/Email';

const Form2 = ({ attributes, labelEl, InputEl, handleCopy, copied }) => {
    const { elements } = attributes;
    const { label } = elements;

    return <div className='inputForm'>

        {label && labelEl}

        <div className={`copyText ${copied && 'active'}`}>
            <Email attributes={attributes} InputEl={InputEl} />
            <Button attributes={attributes} handleCopy={handleCopy} />
        </div>

        {copied && <div className='message'>{__('Copied', 'clipboard')}</div>}

    </div>
}
export default Form2;