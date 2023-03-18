import {TextForm} from 'components/forms/index';
import {ChangeEvent, useEffect, useState} from 'react';

interface IProps {
  name: string;
  value: number;
  disabled?: boolean;

  onChangeNumber(value: number, name: string): void;
}

function NumberStepper({name, value, disabled, onChangeNumber}: IProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<number>(value);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const onChange = (e: ChangeEvent): void => {
    //
  };

  const onClickDecrease = () => {
    const num = selectedValue - 1;
    setSelectedValue(num);
    onChangeNumber(num, name);
  };

  const onClickIncrease = () => {
    const num = selectedValue + 1;
    setSelectedValue(num);
    onChangeNumber(num, name);
  };

  return (
    <div className="number-stepper">
      <button onClick={onClickDecrease}>-</button>
      <TextForm name={name} value={selectedValue} disabled={disabled} />
      <button onClick={onClickIncrease}>+</button>
    </div>
  );
}

export default NumberStepper;
