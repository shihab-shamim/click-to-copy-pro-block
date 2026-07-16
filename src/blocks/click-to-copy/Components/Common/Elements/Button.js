
import icons from '../../../utils/icons';
const Button = ({ attributes, handleCopy }) => {

    const { btnIcon, elements } = attributes;
    const { color, size } = btnIcon;

    return <button className='subBtn' onClick={e => { e.preventDefault(); handleCopy(); }} >
        {elements?.icon && <>
            <div className="icon">
                {icons.iconCopy(color, size)}
            </div>
        </>}
        {
            elements?.text && <>
                <div className="btnText">
                    Copy
                </div>
            </>
        }
    </button >
}
export default Button;