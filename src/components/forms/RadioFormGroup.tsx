import {ChangeEvent} from "react";

type Props = {
  name: string;
  value: string;
  options: Array<any>;
  onChange(e: ChangeEvent): void;
}

function RadioFormGroup({name, value, options, onChange}: Props):JSX.Element {
  return (
      <div className="radio-form-group">
        {options?.map((item:any) => (
            <label>
              <input type="radio" name={name} value={item.value} checked={item.value === value} onChange={onChange} />
              {item.label}
            </label>
        ))}
      </div>
  )
}

export default RadioFormGroup