import {ChangeEvent} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 40px;

  > label {
    display: flex;
    align-items: center;

    input[type='radio'] {
      appearance: none;
      width: 20px;
      height: 20px;
      margin: 0 5px 0 0;
      border-radius: 20px;
      border: 1px solid #999;

      &:before {
        display: block;
        content: '';
        width: 12px;
        height: 12px;
        margin: 3px;
        border-radius: 12px;
        background-color: #bbb;
      }

      &:checked {
        border: 1px solid #0cf;

        &:before {
          background-color: #00ccff;
        }
      }
    }
  }
`;

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
    <Container>
      {options?.map((item) => (
        <label key={item.value} htmlFor={name}>
          <input type="radio" name={name} value={item.value} checked={item.value === value} onChange={onChange} />
          {item.label}
        </label>
      ))}
    </Container>
  );
}

export default RadioFormGroup;
