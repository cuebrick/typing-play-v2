import {ReactNode} from "react";

interface IProps {
  children: ReactNode;
}

function ModalHeader({children}: IProps): JSX.Element {
  return (
      <div className="modal-header">
        <h3>{children}</h3>
        <button className="close-button">x</button>
      </div>
  )
}

ModalHeader.defaultProps = {
  title: '알림'
}

export default ModalHeader;
