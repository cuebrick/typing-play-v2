import {IModeless} from 'interfaces/CommonInterface';
import StringUtils from 'modules/StringUtils';
import {Context, createContext, PropsWithChildren} from 'react';
import {useLocalObservable} from 'mobx-react-lite';

export interface ICommonContext {
  modeless: IModeless[];
  addModeless(id?: string): IModeless;
  removeModeless(id: string): void;
}

const defaultState: ICommonContext = {
  modeless: [],
  addModeless(text: string, id?: string): IModeless {
    const obj = {
      id: id || StringUtils.getUniqueKey(),
      text
    };
    this.modeless = [...this.modeless, obj];
    setTimeout(() => {
      this.removeModeless(obj.id);
    }, 5000);
    // setTimeout(() => {
    //   this.modeless.shift();
    // }, 5000);
    return obj;
  },
  removeModeless(id: string) {
    this.modeless = this.modeless.filter((item: IModeless) => item.id !== id);
  }
};

export const CommonContext: Context<ICommonContext> = createContext<ICommonContext>(defaultState);

export function CommonProvider({children}: PropsWithChildren) {
  const store: ICommonContext = useLocalObservable(() => defaultState);
  return <CommonContext.Provider value={store}>{children}</CommonContext.Provider>;
}
