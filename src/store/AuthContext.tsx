import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {User} from '@firebase/auth';
import {auth, db} from 'database';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {IUserData} from 'interfaces/UserInterface';
import {Context, createContext, PropsWithChildren, useEffect} from 'react';
import {defaultUserData} from 'dto/User';

export interface IAuthContext {
  user: User | null; // firebase/auth user
  userData: IUserData | null;

  setUser(user: User | null): void;
  getUserData(uid: string): void;
  setUserData(userData: IUserData | null): void;
}

const defaultState: IAuthContext = {
  user: null,
  userData: null,

  setUser(user: User) {
    runInAction(() => {
      this.user = user;
    });
  },

  async getUserData(uid: string) {
    const docRef = doc(db, 'userData', uid);
    const docSnap = await getDoc(docRef);
    console.log('user docSnap >>>', docSnap, docSnap.data());
    // 사용자의 세이브 데이터가 있는 경우
    if (docSnap.data()) {
      this.setUserData(docSnap.data() as IUserData);
    } else {
      // 사용자 데이터 처음 (자동) 저장
      const merged = {...defaultUserData, uid} as IUserData;
      this.setUserData(merged);
      await setDoc(docRef, merged);
    }
  },

  setUserData(userData: IUserData) {
    runInAction(() => {
      this.userData = userData;
    });
  }
};

export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>(defaultState);

export function AuthProvider({children}: PropsWithChildren) {
  const store: IAuthContext = useLocalObservable(() => defaultState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log('Auth 로부터 onAuthStateChanged () >>>', user, auth);
      if (user) {
        store.getUserData(user.uid);
      }
      store.setUser(user);
    });
  }, [auth]);

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
