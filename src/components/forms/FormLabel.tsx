import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    htmlFor?: string;
    required?: boolean;
}
function FormLabel({children, htmlFor, required}: Props): JSX.Element {
    return (
        <label htmlFor={htmlFor} className={required ? "required" : undefined}>
            { children }
        </label>
    )
}
FormLabel.defaultProps = {
    required: false
}
export default FormLabel;