import {PropsWithChildren} from "react";

function FormRow({children}: PropsWithChildren): JSX.Element{
    return(
        <div className="form-row">
            { children }
        </div>
    )
}
export default FormRow