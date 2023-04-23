import {ReactElement, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {observer} from 'mobx-react-lite';
import {LevelContext, LevelProvider} from 'store/LevelContext';
import {ILevel} from 'interfaces/LevelInterface';
import {AuthContext} from 'store/AuthContext';
import EditorLevelForm from 'components/editor/EditorLevelForm';
import {defaultLevelData} from 'dto/Level';
import EditorLevelList from 'components/editor/EditorLevelList';
import EditorCategoryList from 'components/editor/EditorCategoryList';
import {ICategory} from 'interfaces/CategoryInterface';

function EditorIndexPage(): JSX.Element {
  const authStore = useContext(AuthContext);
  const store = useContext(LevelContext);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ILevel>({...defaultLevelData});

  useEffect(() => {
    if (!authStore.userData?.grade) return;

    if (authStore.userData?.grade === 'admin') {
      store.getLevelList();
    } else {
      router.push('/');
    }
  }, [store, authStore.userData?.grade]);

  const onSaveDetail = (): void => {
    setSelectedCategory({...selectedCategory} as ICategory);

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
    // todo:
    console.log('>>>>>');
  }, [store, authStore.userData?.grade]);

  const onSelectCategory = (category: ICategory): void => {
    setSelectedCategory(category);
    console.log('onSelectCategory()', category);
  };

  const onSelectLevel = (levelData: ILevel): void => {
    // todo:
    setSelectedLevel(levelData);
    console.log('onSelectLevel()', levelData);
  };

  const onCreateLevel = (withClear: boolean): void => {
    const data = withClear ? {...defaultLevelData} : {...selectedLevel, id: ''};
    setSelectedLevel(data);
  };

  return (
    <div className="editor-index-page">
      <EditorCategoryList onSelect={onSelectCategory} />
      <EditorLevelList onSelect={onSelectLevel} categoryData={selectedCategory} selectedLevel={selectedLevel} />
      <EditorLevelForm levelData={selectedLevel} onSave={onSaveDetail} onCreate={onCreateLevel} />
    </div>
  );
}

EditorIndexPage.getProvider = (page: ReactElement): ReactElement => {
  return <LevelProvider>{page}</LevelProvider>;
};

export default observer(EditorIndexPage);
