'use client';

import {Context, createContext, PropsWithChildren, useContext} from 'react';
import {useLocalObservable} from 'mobx-react-lite';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  where
} from 'firebase/firestore';
import {reaction, runInAction} from 'mobx';
import {db} from '../database';
import {IAppInfo} from '../interfaces/app-info';
import {ILevel, ILevelInfo, ILevelListParams, IUserTypingData} from '../interfaces/level-interface';
import {ICategory} from '../interfaces/category-interface';
import {AuthContext} from './AuthContext';

export interface ILevelContext {
  checkedApp: boolean;
  getAppInfo(): Promise<IAppInfo>;
  getLevelList(): void;
  getLevelData(params: ILevelListParams): Promise<ILevel[]>;
  getCategoryList(): void;
  checkAppVersion(): void;
  saveUserTypingData(userTypingData: IUserTypingData): void;
}

const defaultState: ILevelContext = {
  checkedApp: false,
  async getAppInfo() {
    const docRef = doc(db, 'application', 'info');
    const docSnap = await getDoc(docRef);
    return docSnap.data() as IAppInfo;
  },

  async getLevelList() {
    const categoryList = JSON.parse(localStorage.getItem('categoryList') as string);

    // const levelList: ILevelList[] = [];
    // categoryList.map(async (category: ICategory) => {
    //   const result = await this.getLevelData({categoryId: category.id});
    //   const data = {
    //     ...category,
    //     levels: result
    //   };
    //   levelList.push(data);
    // });
    // runInAction(() => {
    //   localStorage.setItem('levelList', JSON.stringify(levelList));
    // });

    // const levelList: ILevelList[] = [];
    // for (const category of categoryList) {
    //   const result = await this.getLevelData({ categoryId: category.id });
    //   const data = {
    //     ...category,
    //     levels: result
    //   };
    //   levelList.push(data);
    // }

    const levelList: ILevelInfo[] = await Promise.all(
      categoryList.map(async (category: ICategory) => {
        const result = await this.getLevelData({categoryId: category.id});
        return {
          ...category,
          levels: result
        };
      })
    );

    localStorage.setItem('levelList', JSON.stringify(levelList));
  },

  async getLevelData(params: ILevelListParams) {
    const qc = []; // QueryConstraint(s)
    if (params?.categoryId) {
      qc.push(where('categoryId', '==', params.categoryId));
    }
    if (params?.orderBy && params?.orderDirection) {
      qc.push(orderBy(params?.orderBy, params.orderDirection));
    } else {
      qc.push(orderBy('categoryId'), orderBy('order'));
    }
    const q = query(collection(db, 'levels'), ...qc);
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const list: ILevel[] = [];
    querySnapshot.forEach((docObj) => {
      list.push(docObj.data() as ILevel);
    });
    return list;
  },

  async getCategoryList() {
    const q = query(collection(db, 'categories'), orderBy('order'));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const list: ICategory[] = [];
    querySnapshot.forEach((docObj) => {
      list.push({...docObj.data(), id: docObj.id} as ICategory);
    });
    runInAction(() => {
      localStorage.setItem('categoryList', JSON.stringify(list));
    });
  },

  async checkAppVersion() {
    let appLocalInfo = {} as IAppInfo;
    const appServerInfo = await this.getAppInfo();
    const foundLocalInfo = localStorage.getItem('appInfo');
    if (foundLocalInfo) {
      appLocalInfo = JSON.parse(foundLocalInfo);
    }
    if (appServerInfo.version !== appLocalInfo.version) {
      await this.getCategoryList();
      await this.getLevelList();
      localStorage.setItem('appInfo', JSON.stringify(appServerInfo));
    }
    this.checkedApp = true;
  },

  async saveUserTypingData(userTypingData: IUserTypingData) {
    if (!userTypingData.userId) return {};

    try {
      const docRef = await doc(collection(db, 'userTypingData'));
      userTypingData.createdAt = Timestamp.now();
      userTypingData.id = docRef.id;
      // await setDoc(docRef, userTypingData); // todo: 기능 개발 후 주석 해제
      return docRef;
    } catch (error) {
      console.error('failed save userTypingData');
      return error;
    }
  }
};

export const LevelContext: Context<ILevelContext> = createContext<ILevelContext>(defaultState);

export function LevelProvider({children}: PropsWithChildren) {
  const store: ILevelContext = useLocalObservable(() => defaultState);
  const authStore = useContext(AuthContext);
  reaction(
    () => authStore.userData,
    (userData) => {
      if (userData) {
        store.checkAppVersion();
      }
    }
  );

  return <LevelContext.Provider value={store}>{children}</LevelContext.Provider>;
}
