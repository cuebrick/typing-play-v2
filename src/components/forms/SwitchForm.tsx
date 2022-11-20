import {ChangeEvent} from "react";

type Props = {
  name: string;
  checked: boolean;
  checkedLabel?: string;
  checkedValue: boolean | string;
  uncheckedLabel?: string;
  uncheckedValue: boolean | string;
  onChange(e: ChangeEvent): void;
}

function SwitchForm({name, checked, checkedLabel, checkedValue, uncheckedLabel, uncheckedValue, onChange}: Props): JSX.Element {

  // const onChangeCheckbox = (e: ChangeEvent): void => {
  //   const {checked} = e.target as HTMLInputElement;
  //   console.log('checked:', checked);
  //   onChange(e);
  // }
  return (
    <span className="switch-form">
      {checkedLabel && <span>{checkedLabel}</span>}
      <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
      />
      {uncheckedLabel && <span>{uncheckedLabel}</span>}
    </span>

  )
}

SwitchForm.defaultProps = {
  // checked: false,
  checkedValue: true,
  uncheckedValue: false
}

export default SwitchForm;
