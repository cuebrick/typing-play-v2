import {Context, createContext, PropsWithChildren, useContext, useEffect} from 'react';
import {useLocalObservable} from 'mobx-react-lite';
import {collection, doc, getDoc, getDocs, orderBy, query, QuerySnapshot, where} from 'firebase/firestore';
import {runInAction} from 'mobx';
import {db} from '../database';
import {IAppInfo} from '../interfaces/AppInfo';
import {ILevel, ILevelListParams} from '../interfaces/LevelInterface';
import {ICategory} from '../interfaces/CategoryInterface';
import {AuthContext} from './AuthContext';
import {IUserData} from '../interfaces/UserInterface';

export interface ILevelContext {
  // appInfo: IAppInfo;
  // levelList: ILevel[];
  // categoryList: ICategory[];
  getAppInfo(): Promise<IAppInfo>;
  getLevelList(params?: ILevelListParams): void;
  getCategoryList(): void;
  checkAppVersion(grade: IUserData['grade']): void;
}

const defaultState: ILevelContext = {
  // appInfo: {} as IAppInfo,
  // levelList: [],
  // categoryList: [],

  async getAppInfo() {
    const docRef = doc(db, 'application', 'info');
    const docSnap = await getDoc(docRef);
    /* const appInfo = docSnap.data() as IAppInfo;
    runInAction(() => {
      this.appInfo = appInfo;
    });
    return appInfo; */
    return docSnap.data() as IAppInfo;
  },

  async getLevelList(params?: ILevelListParams) {
    const qc = []; // QueryConstraint(s)
    if (params?.categoryId) {
      qc.push(where('categoryId', '==', params.categoryId));
    }
    if (params?.orderBy && params?.orderDirection) {
      qc.push(orderBy(params?.orderBy, params.orderDirection));
    }
    const q = query(collection(db, 'levels'), ...qc);
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const list: ILevel[] = [];
    querySnapshot.forEach((docObj) => {
      list.push(docObj.data() as ILevel);
    });
    runInAction(() => {
      localStorage.setItem('levelList', JSON.stringify(list));
    });
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

  async checkAppVersion(grade) {
    let appLocalInfo = {} as IAppInfo;
    const appServerInfo = await this.getAppInfo();
    const foundLocalInfo = localStorage.getItem('appInfo');
    if (foundLocalInfo) {
      appLocalInfo = JSON.parse(foundLocalInfo);
    }
    // const appLocalInfo: IAppInfo = JSON.parse(localStorage.getItem('appInfo') || '{}');
    if (appServerInfo.version !== appLocalInfo.version) {
      this.getLevelList();
      if (grade === 'admin') {
        this.getCategoryList();
      }
      localStorage.setItem('appInfo', JSON.stringify(appServerInfo));
    }
  }
};

export const LevelContext: Context<ILevelContext> = createContext<ILevelContext>(defaultState);

export function LevelProvider({children}: PropsWithChildren) {
  const store: ILevelContext = useLocalObservable(() => defaultState);
  const authStore = useContext(AuthContext);
  useEffect(() => {
    console.log('check userData >>', authStore.userData);
    if (authStore.userData) {
      store.checkAppVersion(authStore.userData.grade);
    }
  }, [authStore.userData, store]);
  return <LevelContext.Provider value={store}>{children}</LevelContext.Provider>;
}
