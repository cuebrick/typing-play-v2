import {ChangeEvent} from 'react';
import styled from 'styled-components';

const Container = styled.select`
  width: 100%;
  height: 40px;
  padding-right: 8px;
  padding-left: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #f8f8f8;

  &:focus {
    ${({theme}) => theme.colors.confirm}
    background-color: ${({theme}) => theme.presets.light.buttonBackground};
    border-color: ${({theme}) => theme.presets.light.buttonText};
    box-shadow: 0 0 0 6px rgba(180, 222, 255, 0.2);
  }
`;

type Props<T> = {
  name: string;
  value: string;
  valueKey: string;
  labelKey: string;
  placeholder: string;
  options: T[];
  onChange(e: ChangeEvent): void;
};

function SelectForm<T>({name, value, valueKey, labelKey, placeholder, options, onChange}: Props<T>): JSX.Element {
  return (
    <Container name={name} id={name} value={value} placeholder={placeholder} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options?.map((opt) => (
        <option key={opt[valueKey as keyof T] as string} value={opt[valueKey as keyof T] as string}>
          {opt[labelKey as keyof T] as string}
        </option>
      ))}
    </Container>
  );
}
export default SelectForm;
