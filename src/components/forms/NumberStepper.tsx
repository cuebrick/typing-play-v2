import TextForm from 'components/forms/TextForm';
import {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  text-align: center;
  width: 160px;

  &.invalidated {
    box-shadow: 0 0 0 6px rgba(255, 180, 220, 0.4);

    input[type='text'] {
      color: #aaa;
    }
  }

  button {
    width: 50px;
    font-size: 20px;
  }

  input[type='text'] {
    text-align: center;
    font-size: 20px;
  }
`;

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
    <Container className={invalidated ? 'invalidated' : ''}>
      <button onClick={onClickDecrease}>-</button>
      <TextForm type="text" name={name} value={selectedValue} disabled={disabled} onChange={onChange} />
      <button onClick={onClickIncrease}>+</button>
    </Container>
  );
}

export default NumberStepper;
