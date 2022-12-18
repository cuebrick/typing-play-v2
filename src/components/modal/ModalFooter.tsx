import {ReactNode} from "react";

interface IProps {
  children: ReactNode;
}

function ModalFooter({children}: IProps): JSX.Element {
  return (
      <div className="modal-footer">
        {children}
      </div>
  )
}

export default ModalFooter