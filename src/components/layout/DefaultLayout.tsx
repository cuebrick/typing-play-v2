import {ReactNode} from "react";
import Image from "next/image"
import logo from "assets/images/logo.svg"
import userIcon from "assets/images/user-icon.svg"

type Props = {children: ReactNode}

function DefaultLayout({children}: Props): JSX.Element {
    return (
        <>
            <header className="default-layout-header">
                <div className="logo">
                    <Image src={logo} alt="Typing Play"/>
                </div>
                <div className="user-info">
                    <Image src={userIcon} alt="User Icon"/>
                </div>
            </header>
            <div className="contents-body">
                {children}
            </div>
        </>
    )
}

export default DefaultLayout;