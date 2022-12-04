import {ChangeEvent} from "react";

type Props = {
    name: string;
    value: string;
    valueKey: string;
    labelKey: string;
    placeholder: string;
    options: Array<any>;// any, never, object, unknown;
    onChange(e: ChangeEvent): void;
}
function SelectForm({name, value, valueKey, labelKey, placeholder, options, onChange}: Props): JSX.Element {
    return (
        <>
            <select name={name} id={name} value={value} placeholder={placeholder} onChange={onChange}>
                <option value="">{placeholder}</option>
                {
                    options?.map(opt => (
                        <option key={opt[valueKey]} value={opt[valueKey]}>{ opt[labelKey] }</option>
                    ))
                }
            </select>
        </>
    )
}
export default SelectForm;