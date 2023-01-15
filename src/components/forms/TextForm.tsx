import {ChangeEvent} from "react";

type Props = {
    type?: string;
    name: string;
    value: string | number | readonly string[] | undefined;
    placeholder?: string;
    required?: boolean;
    onChange(e: ChangeEvent): void;
}
function TextForm({type, name, value, placeholder, required, onChange}: Props): JSX.Element {
    return (
        <>
        {
            type === "textarea"
            ? (
                <textarea id={name} name={name} value={value} placeholder={placeholder} onChange={onChange}/>
            ) : (
                <input type={type} id={name} name={name} value={value} placeholder={placeholder} required={required} onChange={onChange}/>
            )
        }
        </>
    )
}

TextForm.defaultProps = {
    type: 'text',
    placeholder: "입력",
    required: false
}
export default TextForm;