import {Context, createContext, PropsWithChildren} from "react";
import {ILevelGroup} from 'interfaces/LevelGroupInterface';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference, getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc, Timestamp
} from "firebase/firestore";
import {db} from "database";
import {useLocalObservable} from "mobx-react-lite";
import {ILevel} from "interfaces/levelInterface";
import {runInAction} from "mobx";
import {auth} from "database";
import {IUserData} from 'interfaces/UserInterface';
import {defaultUserData} from 'dto/User';

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

  getLevelList(): void;

  getLevel(id: string): void;

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
      if (isEdit) {
        await setDoc(doc(db, 'levelGroups', levelGroup.id), levelGroup);
      } else {
        const docRef = await addDoc(collection(db, 'levelGroups'), levelGroup);
        console.log('docRef', docRef.id, docRef);
      }
      this.getLevelGroupList();
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


  async getLevelList() {
    const q = query(collection(db, 'levels'));//, orderBy('order')
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

  async saveLevel(levelData: ILevel, isEdit: boolean) {
    try {
      let docRef;

      if (isEdit) {
        docRef = doc(db, 'levels', levelData.levelId);
        levelData.modifiedDateTime = Timestamp.now().seconds;
      } else {
        docRef = await doc(collection(db, "levels"));
        levelData.createDateTime = Timestamp.now().seconds;
        levelData.levelId = docRef.id;
        if (auth.currentUser) {
          levelData.writerEmail = auth.currentUser.email;
          levelData.writerUid = auth.currentUser.uid;
        }
      }
      await setDoc(docRef, levelData);
      // const docRef = await addDoc(collection(db, "levels"), levelData)
      console.log("Document written with ID: ", docRef.id);
      // return docRef;
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
