import {Context, createContext, PropsWithChildren} from 'react';
import {useLocalObservable} from 'mobx-react-lite';
import {runInAction} from 'mobx';
import {auth, db} from 'database';
import {ILevel, ILevelListParams, IUserTypingData} from 'interfaces/LevelInterface';
import {ICategory} from 'interfaces/CategoryInterface';
import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp
} from 'firebase/firestore';

export interface IResponse {
  success: boolean;
  error?: unknown;
}

export interface IEditorContext {
  categoryList: ICategory[];
  level: ILevel;
  levelList: ILevel[];

  getCategoryList(): void;

  saveCategory(category: ICategory, isEdit: boolean): void;

  deleteCategory(id: string): Promise<IResponse>;

  getLevelList(params?: ILevelListParams): void;

  getLevel(id: string): ILevel;

  saveLevel(levelData: ILevel): Promise<DocumentReference | unknown>;

  deleteLevel(id: string): void;
  saveUserTypingData(userTypingData: IUserTypingData): void;

  updateLocalStorage(key: string, data: ILevel[] | ICategory[]): void;
}

const defaultState: IEditorContext = {
  categoryList: [],
  level: {} as ILevel,
  levelList: [],

  updateLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  async getCategoryList() {
    const q = query(collection(db, 'categories'), orderBy('order'));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const list: ICategory[] = [];
    querySnapshot.forEach((docObj) => {
      list.push({...docObj.data(), id: docObj.id} as ICategory);
    });
    runInAction(() => {
      this.categoryList = list;
    });
  },

  async saveCategory(category: ICategory, isEdit = false) {
    try {
      let docRef;

      if (isEdit) {
        docRef = await doc(db, 'categories', category.id);
      } else {
        docRef = await doc(collection(db, 'categories'));
        category.id = docRef.id;
      }
      await setDoc(docRef, category);
      this.getCategoryList();
      return docRef;
    } catch (error) {
      // TODO: error handling
      return error;
    }
  },

  async deleteCategory(id: string): Promise<IResponse> {
    try {
      await deleteDoc(doc(db, 'categories', id));
      this.getCategoryList();
      // todo: app version update
      return {success: true};
    } catch (error) {
      return {success: false, error};
    }
  },

  getLevelList(params?: ILevelListParams) {
    const list = localStorage.getItem('levelList');
    let parsedList = [] as ILevel[];
    if (list) {
      parsedList = JSON.parse(list);
    }
    // const list: ILevel[] = JSON.parse(localStorage.getItem('levelList') || '[]');
    if (params) {
      parsedList = parsedList.filter((item) => {
        if (params?.categoryId) {
          return item.categoryId === params.categoryId;
        }
        // todo: add orderBy, orderDirection
        return item;
      });
    }
    this.levelList = parsedList.sort((a, b) => a.order - b.order);
  },

  // getLevel(id: string) {
  //   const list = JSON.parse(localStorage.getItem('levelList') || '{}');
  //   const level = list.find((item: ILevel) => item.id === id);
  //   this.level = level;
  //   return level;
  // },

  getLevel(id: string) {
    const list = localStorage.getItem('levelList');
    let parsedList = [] as ILevel[];
    if (list) {
      parsedList = JSON.parse(list);
    }
    const level = parsedList.find((item: ILevel) => item.id === id);
    if (level) {
      this.level = level;
    }
    return level as ILevel;
  },

  async saveLevel(levelData: ILevel) {
    try {
      let docRef;
      if (levelData.id) {
        // 수정
        docRef = await doc(db, 'levels', levelData.id);
        levelData.modifiedAt = Timestamp.now();
        const list = this.levelList.filter((item) => item.id !== levelData.id);
        this.levelList = [...list, levelData];
      } else {
        // 생성
        docRef = await doc(collection(db, 'levels'));
        levelData.createdAt = Timestamp.now();
        levelData.id = docRef.id;
        this.levelList.push(levelData);
        if (auth.currentUser) {
          levelData.writerEmail = auth.currentUser.email;
          levelData.writerUid = auth.currentUser.uid;
        }
      }
      this.updateLocalStorage('levelList', this.levelList);
      await setDoc(docRef, levelData);
      console.log('Document written with ID: ', docRef.id);
      // todo: app version update
      return docRef;
    } catch (error) {
      console.error('Error adding document: ', error);
      return error;
    }
    // return false
  },

  async deleteLevel(id: string) {
    try {
      await deleteDoc(doc(db, 'levels', id));
      this.getLevelList();
      const list = JSON.parse(localStorage.getItem('levelList') || '{}');
      const result = list.pop((item: ILevel) => item.id === id);
      this.updateLocalStorage('levelList', result);
      return {success: true};
    } catch (error) {
      return {success: false, error};
    }
  },

  async saveUserTypingData(userTypingData: IUserTypingData) {
    if (!userTypingData.userId) return {};

    try {
      const docRef = await doc(collection(db, 'userTypingData'));
      userTypingData.createdAt = Timestamp.now();
      userTypingData.id = docRef.id;
      await setDoc(docRef, userTypingData);
      return docRef;
    } catch (error) {
      console.error('failed save userTypingData');
      return error;
    }
  }
};

export const EditorContext: Context<IEditorContext> = createContext<IEditorContext>(defaultState);

export function EditorProvider({children}: PropsWithChildren) {
  const store: IEditorContext = useLocalObservable(() => defaultState);
  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
}
