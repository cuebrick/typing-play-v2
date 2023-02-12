import {Context, createContext, PropsWithChildren} from "react";
import {ILevelGroup} from 'interfaces/LevelGroupInterface';
import {collection, getDocs, orderBy, query, QuerySnapshot} from "firebase/firestore";
import {db} from "database";
import {useLocalObservable} from "mobx-react-lite";

export interface ILevelContext {
  levelGroupList: ILevelGroup[];
  getLevelGroupList(): void;
}

const defaultState: ILevelContext = {
  levelGroupList: [],

  async getLevelGroupList() {
    const q = query(collection(db, 'levelGroups'), orderBy('order'));
    const querySnapshot: QuerySnapshot = await getDocs(q);
    // this.levelGroupList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    // querySnapshot.docs.map
    const groups: ILevelGroup[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      groups.push({...doc.data(), id: doc.id} as ILevelGroup);
    });
    this.levelGroupList = groups;
  }
}

export const LevelContext: Context<ILevelContext> = createContext<ILevelContext>(defaultState);

export function LevelProvider({children}: PropsWithChildren) {
  const store: ILevelContext = useLocalObservable(() => defaultState);
  return <LevelContext.Provider value={store}>{children}</LevelContext.Provider>
}