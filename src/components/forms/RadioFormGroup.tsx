import {ChangeEvent} from 'react';

type Props<T> = {
  name: string;
  value: string;
  options: T[];
  onChange(e: ChangeEvent): void;
};

interface IConstraint {
  value: string;
  label: string;
}

function RadioFormGroup<T extends IConstraint>({name, value, options, onChange}: Props<T>): JSX.Element {
  return (
    <div className="radio-form-group">
      {options?.map((item) => (
        <label key={item.value} htmlFor={name}>
          <input type="radio" name={name} value={item.value} checked={item.value === value} onChange={onChange} />
          {item.label}
        </label>
      ))}
    </div>
  );
}

export default RadioFormGroup;
