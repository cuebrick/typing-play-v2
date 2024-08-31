import {ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const ModalContainer = styled.div`
  margin: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  &.sm {
    min-width: 300px;
    min-height: 160px;
  }
  &.md {
    min-width: 600px;
    min-height: 200px;
  }
  &.lg {
    min-width: 800px;
    min-height: 400px;
  }
`;

interface IProps {
  type?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

function Modal({type, children}: IProps): JSX.Element {
  return (
    <Container>
      <ModalContainer className={type}>{children}</ModalContainer>
    </Container>
  );
}

Modal.defaultProps = {
  type: 'md'
};

export default Modal;
