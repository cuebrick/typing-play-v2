type Props = {
    name: string;
    value: string;
    valueKey: string;
    labelKey: string;
    placeholder: string;
    options: Array<any>;// any, never, object, unknown
}
function SelectForm({name, value, valueKey, labelKey, placeholder, options}: Props): JSX.Element {
    return (
        <>
            <select name={name} id={name} value={value} placeholder={placeholder}>
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