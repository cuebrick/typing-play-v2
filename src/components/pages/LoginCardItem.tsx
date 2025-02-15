'use client';

import FormLabel from 'components/forms/FormLabel';
import FormRow from 'components/forms/FormRow';
import FormData from 'components/forms/FormData';
import TextForm from 'components/forms/TextForm';
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@firebase/auth';
import {auth} from 'database';
import Link from 'next/link';
import {LevelContext} from 'store/LevelContext';

function LoginCardItem(): JSX.Element {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [loginUser, setLoginUser] = useState(auth.currentUser);

  const levelStore = useContext(LevelContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log('user >>>>> ', user)
      if (user) {
        setLoginUser(user);
        console.log('login 성공', user);
      } else {
        setLoginUser(user);
        console.log('logout 성공', user);
      }
    });
  }, [levelStore]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('change event >>', e);
    const {name, value} = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'userName') {
      setUserName(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: FormEvent): Promise<void> => {
    console.log('submit event >>> ', e);
    e.preventDefault();
    if (isNewAccount) {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      console.log('등록 성공 >>', data);
    } else {
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공 >>', data);
    }
    setEmail('');
    setUserName('');
    setPassword('');
  };

  const onClickLogout = (): void => {
    signOut(auth).then((response) => {
      console.log('로그아웃 성공', response);
    });
  };

  const onClickLoginStatus = (): void => {
    setIsNewAccount(!isNewAccount);
  };

  return (
    <div className="login-card-item">
      로그인 카드 아이템입니다.
      <form onSubmit={onSubmit}>
        {loginUser ? (
          <FormRow>
            {loginUser.email}
            <button type="button" onClick={onClickLogout}>
              log out
            </button>
            <Link href="/editor">레벨 에디터</Link>
          </FormRow>
        ) : (
          <>
            <button type="button" onClick={onClickLoginStatus}>
              {isNewAccount ? '로그인으로 변경' : '회원가입으로 변경'}
            </button>
            <FormRow>
              <FormLabel htmlFor="email">이메일</FormLabel>
              <FormData>
                <TextForm onChange={onChange} name="email" required value={email} />
              </FormData>
            </FormRow>
            {isNewAccount && (
              <FormRow>
                <FormLabel htmlFor="userName">사용자 이름</FormLabel>
                <FormData>
                  <TextForm onChange={onChange} name="userName" required value={userName} />
                </FormData>
              </FormRow>
            )}
            <FormRow>
              <FormLabel htmlFor="password">비밀번호</FormLabel>
              <FormData>
                <TextForm type="password" onChange={onChange} required name="password" value={password} />
              </FormData>
            </FormRow>
            <FormRow>
              <input type="submit" value={isNewAccount ? '출석부 등록' : '출석체크'} />
            </FormRow>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginCardItem;
