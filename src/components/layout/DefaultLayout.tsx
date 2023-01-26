import {ReactNode, useEffect, useState} from "react";
import Image from "next/image"
import logo from "assets/images/logo.svg"
import userIcon from "assets/images/user-icon.svg"
import {auth} from "database";

type Props = { children: ReactNode }

function DefaultLayout({children}: Props): JSX.Element {
  const [loginUser, setLoginUser] = useState(auth.currentUser)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user는 >>>', user, auth)
        setLoginUser(user)
      } else {
        console.log('user 로그아웃이 해제됨!', user, auth);
        setLoginUser(user)
      }
    })
  }, [auth])

  return (
    <>
      <header className="default-layout-header">
        <div className="logo">
          <Image src={logo} alt="Typing Play"/>
        </div>
        <div className="user-info">
          {loginUser?.email}
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