import {ReactElement, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {observer} from 'mobx-react-lite';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import LevelItem from 'components/level/LevelItem';
import {ILevel} from 'interfaces/LevelInterface';
import {AuthContext} from 'store/AuthContext';
import EditorLevelForm from 'components/editor/EditorLevelForm';
import {defaultLevelData} from 'dto/Level';
import LevelGroupModal from 'components/modal/LevelGroupModal';
import EditorLevelList from 'components/editor/EditorLevelList';
import EditorLevelGroupList from 'components/editor/EditorLevelGroupList';
import {ILevelGroup} from 'interfaces/LevelGroupInterface';

function EditorIndexPage(): JSX.Element {
  const authStore = useContext(AuthContext);
  const store = useContext(LevelContext);
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLevelGroup, setSelectedLevelGroup] = useState<ILevelGroup | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ILevel>({...defaultLevelData});

  useEffect(() => {
      if (!authStore.userData?.grade) return;

      if (authStore.userData?.grade === 'admin') {
        store.getLevelList();
      } else {
        router.push('/');
      }
    }, [store, authStore.userData?.grade]
  );

  const onClickLevel = (levelData: ILevel): void => {
    // router.push(`/editor/${levelData.id}`);
    setSelectedLevel(levelData);
  };

  const onSaveDetail = (): void => {
    // todo:

    // console.log('isEdit', isEdit);
    // // debugger;
    // const docRef = await store.saveLevel(data, isEdit) as DocumentReference;
    // console.log('<<<<response', docRef);
    // if (!isEdit && docRef) {
    //   await router.push(`/levels/editor/${docRef.id}`);
    // }
  };

  useEffect(() => {
      if (!authStore.userData?.grade) return;
    }, [store, authStore.userData?.grade]
  );


  const onClickCreate = (withClear?: boolean) => {
    if (withClear) {
      store.setLevel({...defaultLevelData});
    }
    // router.push(`/editor/${CREATE}`);
  };

  const onSelectLevelGroup = (levelGroup: ILevelGroup): void => {
    // todo:
    setSelectedLevelGroup(levelGroup);
    console.log('onSelectLevelGroup()', levelGroup);
  };

  const onSelectLevel = (levelData: ILevel): void => {
    // todo:
    setSelectedLevel(levelData);
    console.log('onSelectLevel()', levelData);
  };

  return (
    <div className="editor-index-page">
      <EditorLevelGroupList onSelect={onSelectLevelGroup} />
      <EditorLevelList onSelect={onSelectLevel} levelGroupData={selectedLevelGroup} />
      <EditorLevelForm levelData={selectedLevel} onSave={onSaveDetail} />
    </div>
  );
}

EditorIndexPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(EditorIndexPage);
