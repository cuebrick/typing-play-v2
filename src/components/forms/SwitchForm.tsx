import {ChangeEvent} from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  align-items: center;
  height: 40px;
`;
const CheckboxInput = styled.input`
  appearance: none;
  width: 37px;
  height: 20px;
  border-radius: 20px;
  border: 1px solid #999;
  background-color: #eee;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:before {
    display: block;
    margin-left: 1px;
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 16px;
    background-color: #ffffff;
    transition: margin 0.5s;
  }

  &:checked {
    background-color: #0cf;

    &:before {
      margin-left: 18px;
    }
  }
`;

type Props = {
  name?: string;
  checked: boolean;
  checkedLabel?: string;
  uncheckedLabel?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};

function SwitchForm({name, checked, checkedLabel, uncheckedLabel, onChange}: Props): JSX.Element {
  return (
    <Container>
      {checkedLabel && <span>{checkedLabel}</span>}
      <CheckboxInput type="checkbox" name={name} checked={checked} onChange={onChange} />
      {uncheckedLabel && <span>{uncheckedLabel}</span>}
    </Container>
  );
}

export default SwitchForm;
