import Button from '../Elements/Button';
import Email from '../Elements/Email';

const Form1 = ({ attributes, labelEl, InputEl, handleCopy, copied }) => {
    const { elements } = attributes;
    const { label } = elements;
    return <>
        <div className='inputForm'>
            {label && labelEl}

            <div className={`copyText ${copied && 'active'}`}>
                <Button attributes={attributes} handleCopy={handleCopy} />
                <Email attributes={attributes} InputEl={InputEl} />
            </div>
        </div>
    </>
}
export default Form1;