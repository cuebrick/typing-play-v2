import {CSSProperties, MouseEvent, PropsWithChildren} from 'react';
import styled from 'styled-components';

const Container = styled.button`
  white-space: nowrap;
  height: 30px;
  border: none;
  border-radius: 3px;
  padding: 0 20px;
  color: #234771;
  background-color: #a8c5e6;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: inherit;
  }
`;

type IProps = PropsWithChildren & {
  name?: string;
  disabled?: boolean;
  style?: CSSProperties;
  width?: number;
  onClick?(e: MouseEvent): void;
};

function Button({children, ...rest}: IProps): JSX.Element {
  return <Container {...rest}>{children}</Container>;
}

export default Button;
