import {ChangeEvent} from "react";

type Props<T> = {
  name: string;
  value: string;
  valueKey: string;
  labelKey: string;
  placeholder: string;
  options: T[];
  onChange(e: ChangeEvent): void;
};

function SelectForm<T>({name, value, valueKey, labelKey, placeholder, options, onChange}: Props<T>): JSX.Element {
  return (
    <>
      <select name={name} id={name} value={value} placeholder={placeholder} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options?.map((opt) => (
          <option key={opt[valueKey as keyof T] as string} value={opt[valueKey as keyof T] as string}>
            {opt[labelKey as keyof T] as string}
          </option>
        ))}
      </select>
    </>
  );
}
export default SelectForm;