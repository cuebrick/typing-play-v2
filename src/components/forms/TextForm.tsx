import {ChangeEvent} from "react";

type Props = {
    type?: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange(e: ChangeEvent): void;
}
function TextForm({type, name, value, placeholder, onChange}: Props): JSX.Element {
    return (
        <>
        {
            type === "textarea"
            ? (
                <textarea id={name} name={name} value={value} placeholder={placeholder} onChange={onChange}/>
            ) : (
                <input type="text" id={name} name={name} value={value} placeholder={placeholder} onChange={onChange}/>
            )
        }
        </>
    )
}

TextForm.defaultProps = {
    placeholder: "입력"
}
export default TextForm;