import { RichText } from "@wordpress/block-editor";
const RichTextComponents = ({value,tagName,placeholder,onChange,className,}) => {
    return (
        <>
            <RichText
                tagName={tagName}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
            />
        </>
    )
}

export default RichTextComponents