import {ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 60px;
  margin-top: auto;
  padding: 10px 20px;
  border-top: 1px solid #dddddd;
  display: flex;
  justify-content: flex-end;
`;

interface IProps {
  children: ReactNode;
}

function ModalFooter({children}: IProps): JSX.Element {
  return <Container>{children}</Container>;
}

export default ModalFooter;
