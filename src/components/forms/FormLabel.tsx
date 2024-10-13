import {PropsWithChildren, ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.label`
  width: 160px;
  min-height: 40px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

type IProps = PropsWithChildren & {
  htmlFor?: string;
  required?: boolean;
};

function FormLabel({children, htmlFor, required = false}: IProps): JSX.Element {
  return (
    <Container htmlFor={htmlFor} className={required ? 'required' : undefined}>
      {children}
    </Container>
  );
}

export default FormLabel;
