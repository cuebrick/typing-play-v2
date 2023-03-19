import {TextForm} from 'components/forms/index';
import {ChangeEvent, useEffect, useState} from 'react';

interface IProps {
  name: string;
  value: number;
  invalidated?: boolean;
  disabled?: boolean;

  onStep(value: number, name: string): void;
}

function NumberStepper({name, value, invalidated, disabled, onStep}: IProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<number>(value);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const onClickDecrease = () => {
    const num = selectedValue - 1;
    setSelectedValue(num);
    onStep(num, name);
  };

  const onClickIncrease = () => {
    const num = selectedValue + 1;
    setSelectedValue(num);
    onStep(num, name);
  };

  const onChange = (e: ChangeEvent) => {
    const {value} = e.target as HTMLInputElement;
    setSelectedValue(Number(value));
  };

  return (
    <div className={`number-stepper ${invalidated ? 'invalidated' : ''}`}>
      <button onClick={onClickDecrease}>-</button>
      <TextForm
        type="text"
        name={name}
        value={selectedValue}
        disabled={disabled}
        onChange={onChange}
      />
      <button onClick={onClickIncrease}>+</button>
    </div>
  );
}

export default NumberStepper;
