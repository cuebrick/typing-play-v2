import {ReactNode} from "react";

type Props = {children: ReactNode}

function DefaultLayout({children}: Props): JSX.Element {
    return (
        <>
            <header>
                <h1>
                    typing play
                </h1>
                <div className="user-info">
                    user-icon
                </div>
            </header>
            <div className="contents-body">
                {children}
            </div>
        </>
    )
}

export default DefaultLayout;