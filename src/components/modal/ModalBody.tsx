import {ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 10px 20px;
`;

interface IProps {
  children: ReactNode;
}

function ModalBody({children}: IProps): JSX.Element {
  return <Container>{children}</Container>;
}

export default ModalBody;
