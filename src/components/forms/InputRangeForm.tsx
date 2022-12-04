import {ChangeEvent, useEffect, useState} from "react";

type Props = {
  name: string;
  width?: number;
  value: string;
  onChange(e: ChangeEvent): void;
}

function InputRangeForm({name, width, value, onChange}: Props): JSX.Element {
  const [count, setCount] = useState("");
  useEffect(() => {
    setCount(value);
  }, [value]);

  /*const onChangeHandler = (e: ChangeEvent) : void => {
    const {value} = e.target as HTMLInputElement
    console.log('<<<<<', e)
    setCount(value)
  };*/

  return (
      <span className="input-range-form" style={{width}}>
        <input type="range" name={name} min={1} max={5} value={value} onChange={onChange}/>
        <span className="count">{count}</span>
      </span>
  )
}

InputRangeForm.defaultProps = {
  width: 300
}

export default InputRangeForm