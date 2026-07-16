import Button from '../Elements/Button';
import Email from '../Elements/Email';


const Default = ({ attributes, labelEl, handleCopy, copied, InputEl }) => {
    const { elements } = attributes;
    const { label } = elements;

    return <>
        <div className='inputForm'>
            {label && labelEl}

            <div className={`copyText ${copied && 'active'}`}>
                <Email attributes={attributes} InputEl={InputEl} />

                <Button attributes={attributes} handleCopy={handleCopy} />
            </div>

        </div>
    </>
}
export default Default;