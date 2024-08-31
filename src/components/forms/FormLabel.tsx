import {ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.label`
  width: 160px;
  min-height: 40px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

type Props = {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
};

function FormLabel({children, htmlFor, required}: Props): JSX.Element {
  return (
    <Container htmlFor={htmlFor} className={required ? 'required' : undefined}>
      {children}
    </Container>
  );
}

FormLabel.defaultProps = {
  required: false
};
export default FormLabel;
