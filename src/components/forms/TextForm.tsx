import {ChangeEvent} from 'react';
import styled, {css} from 'styled-components';

const containerStyle = css`
  width: 100%;
  height: 40px;
  padding-right: 8px;
  padding-left: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #f8f8f8;

  &:focus {
    background-color: #eff7fd;
    border-color: #bdd7df;
    box-shadow: 0 0 0 6px rgba(180, 222, 255, 0.2);
  }
`;
const TextareaContainer = styled.textarea`
  ${containerStyle};
  min-height: 100px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const InputContainer = styled.input`
  ${containerStyle}
`;

type Props = {
  type?: 'text' | 'textarea' | 'password' | 'number';
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value: string | number | readonly string[] | undefined;
  onChange(e: ChangeEvent): void;
};

function TextForm({
  type = 'text',
  id,
  name,
  value,
  placeholder = '입력',
  required = false,
  disabled = false,
  onChange
}: Props): JSX.Element {
  if (type === 'textarea') {
    return (
      <TextareaContainer
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }
  return (
    <InputContainer
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default TextForm;
