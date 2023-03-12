import {Context, createContext, PropsWithChildren} from "react";
import {useLocalObservable} from "mobx-react-lite";
import {runInAction} from "mobx";
import {db, auth} from "database";
import {ILevel, ILevelListParams} from "interfaces/LevelInterface";
import {ILevelGroup} from 'interfaces/LevelGroupInterface';
import {IUserData} from 'interfaces/UserInterface';
import {defaultUserData} from 'dto/User';
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
  userUid: string | null;
  userData: IUserData | null;
  levelGroupList: ILevelGroup[];
  level: ILevel | null;
  levelList: ILevel[];

  setUserUid(uid: string): void;

  getUserData(uid: string): void;

  setUserData(userData: IUserData): void;

  getLevelGroupList(): void;

  saveLevelGroup(levelGroup: ILevelGroup, isEdit: boolean): void;

  deleteGroupList(id: string): Promise<IResponse>;

  getLevelList(params?: ILevelListParams): void;

  getLevel(id: string): void;

  setLevel(levelData: ILevel): void;

  saveLevel(levelData: ILevel, isEdit: boolean): Promise<DocumentReference | unknown>;

  deleteLevel(id: string): void;
}


const defaultState: ILevelContext = {
  userUid: null,
  userData: null,
  levelGroupList: [],
  level: null,
  levelList: [],

  setUserUid(uid: string) {
    this.userUid = uid;
  },

  async getUserData(uid: string) {
    const docRef = doc(db, "userData", uid);
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
  },

  async getLevelGroupList() {
    const q = query(collection(db, 'levelGroups'), orderBy('order'));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const groups: ILevelGroup[] = [];
    querySnapshot.forEach((doc) => {
      groups.push({...doc.data(), id: doc.id} as ILevelGroup);
    });
    runInAction(() => {
      this.levelGroupList = groups;
    });
  },

  async saveLevelGroup(levelGroup: ILevelGroup, isEdit: boolean = false) {
    try {
      let docRef;

      if (isEdit) {
        docRef = await doc(db, 'levelGroups', levelGroup.id)
      } else {
        docRef = await doc(collection(db, 'levelGroups'));
      }
      await setDoc(docRef, levelGroup);
      this.getLevelGroupList();
      return docRef;
    } catch (error) {
      // TODO: error handling
    }
  },

  async deleteGroupList(id: string): Promise<IResponse> {
    try {
      await deleteDoc(doc(db, 'levelGroups', id));
      this.getLevelGroupList();
      return {success: true};
    } catch (error) {
      return {success: false, error};
    }

  },


  async getLevelList(params?: ILevelListParams) {
    const qc = []; // QueryConstraint(s)
    if (params?.groupId) {
      qc.push(where('groupId', '==', params.groupId));
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

  async saveLevel(levelData: ILevel, isEdit: boolean) {
    try {
      let docRef;

      if (isEdit) {
        docRef = await doc(db, 'levels', levelData.id);
        levelData.modifiedAt = Timestamp.now();
      } else {
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
