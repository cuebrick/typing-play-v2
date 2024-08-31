import {PropsWithChildren} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: flex-start;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function FormRow({children}: PropsWithChildren): JSX.Element {
  return <Container>{children}</Container>;
}

export default FormRow;
