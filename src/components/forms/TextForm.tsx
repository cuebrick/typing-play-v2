import {ChangeEvent} from "react";

type Props = {
  type?: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange(e: ChangeEvent): void;
}

function TextForm({type, name, value, placeholder, required, disabled, onChange}: Props): JSX.Element {
  return (
    <>
      {
        type === "textarea"
          ? (
            <textarea
              id={name}
              name={name}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
            />
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              onChange={onChange}
            />
          )
      }
    </>
  );
}

TextForm.defaultProps = {
  type: 'text',
  placeholder: "입력",
  required: false,
  disabled: false
};
export default TextForm;
