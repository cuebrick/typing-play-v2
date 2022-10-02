import {ReactNode} from "react";

type Props = {children: ReactNode}

function DefaultLayout({children}: Props): JSX.Element {
    return (
        <>
            <header>
                <h1>
                    typing play
                </h1>
            </header>
            <div>
                {children}
            </div>
        </>
    )
}

export default DefaultLayout;