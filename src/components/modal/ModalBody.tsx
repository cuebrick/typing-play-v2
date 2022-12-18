import {ReactNode} from "react";

interface IProps {
  children: ReactNode;
}

function ModalBody({children}: IProps): JSX.Element {
  return (
      <div className="modal-body">{children}</div>
  )
}

export default ModalBody