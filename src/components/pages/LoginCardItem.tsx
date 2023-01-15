import FormLabel from "components/forms/FormLabel";
import FormRow from "components/forms/FormRow";
import FormData from "components/forms/FormData";
import TextForm from "components/forms/TextForm";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@firebase/auth";
import {auth} from "database";

function LoginCardItem(): JSX.Element {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isNewAccount, setIsNewAccount] = useState(true)
  const [loginUser, setLoginUser] = useState(auth.currentUser)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoginUser(user)
      }
    })
  }, [auth])

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('change event >>', e)
    const {name, value} = e.target;
    if (name === "email") {
      setEmail(value)
    } else if (name === "userName") {
      setUserName(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (e: FormEvent): Promise<void> => {
    console.log('submit event >>> ', e)
    e.preventDefault()
    if (isNewAccount) {
      const data = await createUserWithEmailAndPassword(auth, email, password)
      console.log('등록 성공 >>', data)
    } else {
      const data = await signInWithEmailAndPassword(auth, email, password)
      console.log('로그인 성공 >>', data)
    }
  }

  const onClickLogout = (): void => {
    signOut(auth).then((response) => {
      console.log('response>>', response)
    })
  }

  const onClickLoginStatus = (): void => {
    setIsNewAccount(!isNewAccount)
  }

  return (
    <div className="login-card-item">
      로그인 카드 아이템입니다.
      <form onSubmit={onSubmit}>
        {loginUser ? <FormRow>
            {loginUser.email}
          <button onClick={onClickLogout}>log out</button>
        </FormRow>
          :
          (
            <>
              <button onClick={onClickLoginStatus}>{isNewAccount ? '출석체크로 이동' : '출석부 등록으로 이동'}</button>
              <FormRow>
                <FormLabel>이메일</FormLabel>
                <FormData>
                  <TextForm onChange={onChange} name="email" required value={email}/>
                </FormData>
              </FormRow>
              <FormRow>
                <FormLabel>
                  사용자 이름
                </FormLabel>
                <FormData>
                  <TextForm onChange={onChange} name="userName" required value={userName}/>
                </FormData>
              </FormRow>
              <FormRow>
                <FormLabel>
                  비밀번호
                </FormLabel>
                <FormData>
                  <TextForm type="password" onChange={onChange} required name="password" value={password}/>
                </FormData>
              </FormRow>
              <FormRow>

                <input type="submit" value={isNewAccount ? '출석체크' : '출석부 등록'}/>
              </FormRow>
            </>
          )
        }

      </form>
    </div>
  )
}

export default LoginCardItem