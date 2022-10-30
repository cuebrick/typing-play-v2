import {PropsWithChildren} from "react";

function FormData({children}: PropsWithChildren): JSX.Element {
    return (
        <span className="form-data">
            { children }
        </span>
    )
}
export default FormData