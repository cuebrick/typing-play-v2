import {Context, createContext, PropsWithChildren} from "react";
import {useLocalObservable} from "mobx-react-lite";
import {runInAction} from "mobx";
import {db, auth} from "database";
import {ILevel, ILevelListParams} from "interfaces/LevelInterface";
import {ICategory} from 'interfaces/CategoryInterface';
import {
  DocumentReference,
  QuerySnapshot,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where
} from "firebase/firestore";

export interface IResponse {
  success: boolean;
  error?: unknown;
}

export interface ILevelContext {
  categoryList: ICategory[];
  level: ILevel | null;
  levelList: ILevel[];

  getCategoryList(): void;

  saveCategory(category: ICategory, isEdit: boolean): void;

  deleteCategory(id: string): Promise<IResponse>;

  getLevelList(params?: ILevelListParams): void;

  getLevel(id: string): void;

  setLevel(levelData: ILevel): void;

  saveLevel(levelData: ILevel): Promise<DocumentReference | unknown>;

  deleteLevel(id: string): void;
}


const defaultState: ILevelContext = {
  categoryList: [],
  level: null,
  levelList: [],

  async getCategoryList() {
    const q = query(collection(db, 'categories'), orderBy('order'));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const list: ICategory[] = [];
    querySnapshot.forEach((doc) => {
      list.push({...doc.data(), id: doc.id} as ICategory);
    });
    runInAction(() => {
      this.categoryList = list;
    });
  },

  async saveCategory(category: ICategory, isEdit: boolean = false) {
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
    }
  },

  async deleteCategory(id: string): Promise<IResponse> {
    try {
      await deleteDoc(doc(db, 'categories', id));
      this.getCategoryList();
      return {success: true};
    } catch (error) {
      return {success: false, error};
    }
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
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as ILevel);
    });
    runInAction(() => {
      this.levelList = list;
    });
  },

  async getLevel(id: string) {
    const docRef = doc(db, "levels", id);
    const docSnap = await getDoc(docRef);
    runInAction(() => {
      this.level = docSnap.data() as ILevel;
    });
  },

  setLevel(levelData: ILevel) {
    runInAction(() => {
      this.level = levelData;
    });
  },

  async saveLevel(levelData: ILevel) {
    try {
      let docRef;

      if (levelData.id) {
        // 수정
        docRef = await doc(db, 'levels', levelData.id);
        levelData.modifiedAt = Timestamp.now();
      } else {
        // 생성
        docRef = await doc(collection(db, "levels"));
        levelData.createdAt = Timestamp.now();
        levelData.id = docRef.id;
        if (auth.currentUser) {
          levelData.writerEmail = auth.currentUser.email;
          levelData.writerUid = auth.currentUser.uid;
        }
      }
      await setDoc(docRef, levelData);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      return error;
    }
    // return false
  },

  async deleteLevel(id: string) {
    try {
      await deleteDoc(doc(db, 'levels', id));
      this.getLevelList();
      return {success: true};
    } catch (error) {
      return {success: false, error};
    }
  }
};

export const LevelContext: Context<ILevelContext> = createContext<ILevelContext>(defaultState);

export function LevelProvider({children}: PropsWithChildren) {
  const store: ILevelContext = useLocalObservable(() => defaultState);
  return <LevelContext.Provider value={store}>{children}</LevelContext.Provider>;
}
