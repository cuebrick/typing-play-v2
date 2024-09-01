import {ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 40px;
  padding: 10px 20px;
  border-bottom: 1px solid #dddddd;
  display: flex;

  > h3 {
    margin: 0;
    font-size: 16px;
    font-weight: normal;
  }
`;
const CloseButton = styled.button`
  margin-left: auto;
`;

interface IProps {
  children: ReactNode;
  onClose(): void;
}

function ModalHeader({children, onClose}: IProps): JSX.Element {
  return (
    <Container className="modal-header">
      <h3>{children}</h3>
      <CloseButton onClick={onClose}>x</CloseButton>
    </Container>
  );
}

export default ModalHeader;
