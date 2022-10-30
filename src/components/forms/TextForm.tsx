type Props = {
    type?: string;
    name: string;
    value: string;
    placeholder?: string;
}
function TextForm({type, name, value, placeholder}: Props): JSX.Element {
    return (
        <>
        {
            type === "textarea"
            ? (
                <textarea id={name} name={name} value={value} placeholder={placeholder}/>
            ) : (
                <input type="text" id={name} name={name} value={value} placeholder={placeholder}/>
            )
        }
        </>
    )
}

TextForm.defaultProps = {
    placeholder: "입력"
}
export default TextForm;