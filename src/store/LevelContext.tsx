import {Context, createContext, PropsWithChildren} from "react";
import {ILevelGroup} from 'interfaces/LevelGroupInterface';
import {
  addDoc,
  collection,
  deleteDoc,
  doc, DocumentData,
  DocumentReference, getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc
} from "firebase/firestore";
import {db} from "database";
import {useLocalObservable} from "mobx-react-lite";
import {ILevel} from "interfaces/levelInterface";
import {runInAction} from "mobx";

export interface ILevelContext {
  level: ILevel;
  levelGroupList: ILevelGroup[];

  getLevelGroupList(): void;

  getLevel(id: string): void;
  saveLevel(levelData: ILevel, isEdit: boolean): Promise<DocumentReference>;

  saveGroupList(levelGroup: ILevelGroup, isEdit: boolean): void;

  deleteGroupList(id: string): Promise<IResponse>;
}

export interface IResponse {
  success: boolean;
  error?: unknown;
}

const defaultState: ILevelContext = {
  levelGroupList: [],

  async getLevelGroupList() {
    const q = query(collection(db, 'levelGroups'), orderBy('order'));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const groups: ILevelGroup[] = [];
    querySnapshot.forEach((doc) => {
      groups.push({...doc.data(), id: doc.id} as ILevelGroup);
    });
    runInAction(() => {
      this.levelGroupList = groups;
    })
  },

  async saveGroupList(levelGroup: ILevelGroup, isEdit: boolean = false) {
    try {
      if (isEdit) {
        await setDoc(doc(db, 'levelGroups', levelGroup.id), levelGroup);
      } else {
        const docRef = await addDoc(collection(db, 'levelGroups'), levelGroup);
        console.log('docRef', docRef.id, docRef);
      }
      this.getLevelGroupList()
    } catch (error) {
      // TODO: error handling
    }
  },

  async deleteGroupList(id: string): Promise<IResponse> {
    try {
      await deleteDoc(doc(db, 'levelGroups', id));
      this.getLevelGroupList()
      return {success: true}
    } catch (error) {
      return {success: false, error}
    }

  },

  async getLevel(id: string) {
    const docRef = doc(db, "levels", id);
    const docSnap = await getDoc(docRef);
    console.log('docSnap >>>', docSnap)
    // return docSnap.data()
    runInAction(() => {
      this.level = docSnap.data() as ILevel;
    })
  },

  async saveLevel(levelData: ILevel, isEdit: boolean) {
    try {
      if (isEdit) {
        await setDoc(doc(db, 'levels', levelData.levelId), levelData);
      } else {
        const docRef = await addDoc(collection(db, "levels"), levelData)
        console.log("Document written with ID: ", docRef.id);
        // return docRef;
        return docRef;
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      return false;
    }
  }


}

export const LevelContext: Context<ILevelContext> = createContext<ILevelContext>(defaultState);

export function LevelProvider({children}: PropsWithChildren) {
  const store: ILevelContext = useLocalObservable(() => defaultState);
  return <LevelContext.Provider value={store}>{children}</LevelContext.Provider>
}