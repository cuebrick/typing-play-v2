import {PropsWithChildren} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 10px;
`;

function FormData({children}: PropsWithChildren): JSX.Element {
  return <Container>{children}</Container>;
}

export default FormData;
