import {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  height: 40px;
  align-items: center;

  > input[type='range'] {
    width: 100%;
  }
`;
const Count = styled.span`
  font-weight: bold;
  color: #777;
  margin-left: 10px;
  display: flex;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #eee;
`;

type Props = {
  name: string;
  width?: number;
  value: string;
  onChange(e: ChangeEvent): void;
};

function InputRangeForm({name, width, value, onChange}: Props): JSX.Element {
  const [count, setCount] = useState('');
  useEffect(() => {
    setCount(value);
  }, [value]);

  /* const onChangeHandler = (e: ChangeEvent) : void => {
    const {value} = e.target as HTMLInputElement
    console.log('<<<<<', e)
    setCount(value)
  }; */

  return (
    <Container style={{width}}>
      <input type="range" name={name} min={1} max={5} value={value} onChange={onChange} />
      <Count>{count}</Count>
    </Container>
  );
}

InputRangeForm.defaultProps = {
  width: 300
};

export default InputRangeForm;
