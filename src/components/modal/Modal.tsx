import {ReactNode} from "react";

interface IProps {
  type?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

function Modal({type, children}: IProps): JSX.Element {
  return (
      <div className="modal">
        <div className={`modal-container ${type}`}>
          {children}
        </div>
      </div>
  )
}

Modal.defaultProps = {
  type: 'md'
}

export default Modal