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
  levelRecord: IUserTypingData[] | null;
  getAppInfo(): Promise<IAppInfo>;
  getCategoryList(): void;
  getLevelList(): void;
  getLevelData(params: ILevelListParams): Promise<ILevel[]>;
  checkAppVersion(): void;
  saveUserTypingData(userTypingData: IUserTypingData): void;

  getLevelRecord(uid: string | null): void;
  getUserLevelRecord(levelId: string): number;
}

const defaultState: ILevelContext = {
  checkedApp: false,
  levelRecord: null,
  async getAppInfo() {
    const docRef = doc(db, 'application', 'info');
    const docSnap = await getDoc(docRef);
    return docSnap.data() as IAppInfo;
  },

  /**
   * 타자 연습의 카테고리를 불러옴.
   * 타자 레벨을 불러와 정렬할 때 이 카테고리에 맞게 정렬함.
   * 이를 위해 레벨보다 카테고리 불러오기가 선생되어야 함.
   */
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

  /**
   * 타자 연습을 할 레벨들을 불러옴.
   * getCategoryList 실행 후 이 함수가 실행됨.
   * 각 카테고리 id를 이용해 해당하는 레벨들을 불러옴.
   */
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

  /**
   * 조건에 부합하는 타자 레벨을 불러옴.
   */
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

  /**
   * 버전 체크.
   * localStorage와 정보를 비교.
   * 다를 경우 카테고리와 목록 다시 불러오고 저장.
   */
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
      await setDoc(docRef, userTypingData); // todo: 기능 개발 후 주석 해제
      return docRef;
    } catch (error) {
      console.error('failed save userTypingData');
      return error;
    }
  },

  /**
   * 현재 유저의 모든 타자 기록을 가져옴.
   * @param userId
   */
  async getLevelRecord(userId: string | null) {
    if (!userId) return;

    const q = query(collection(db, 'userTypingData'), where('userId', '==', userId));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const list: IUserTypingData[] = [];
    querySnapshot.forEach((docObj) => {
      list.push(docObj.data() as IUserTypingData);
    });
    this.levelRecord = list;
  },

  /**
   * 각 레벨의 기록을 가져옴.
   * 이 숫자를 이용해 트로피 별을 표시하며, 기록이 없을 땐 -99로 표기.
   * @param levelId
   */
  getUserLevelRecord(levelId: string) {
    const result = this.levelRecord?.find((record) => {
      return record.levelId === levelId;
    });
    return result ? result.trophy : -99;
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
        store.getLevelRecord(userData.uid);
      }
    }
  );

  return <LevelContext.Provider value={store}>{children}</LevelContext.Provider>;
}
