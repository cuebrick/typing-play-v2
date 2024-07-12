import {ReactElement, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {observer} from 'mobx-react-lite';
import {EditorContext, EditorProvider} from 'store/EditorContext';
import {ILevel} from 'interfaces/LevelInterface';
import {AuthContext} from 'store/AuthContext';
import EditorLevelForm from 'components/editor/EditorLevelForm';
import {defaultLevelData} from 'dto/Level';
import EditorLevelList from 'components/editor/EditorLevelList';
import EditorCategoryList from 'components/editor/EditorCategoryList';
import {ICategory} from 'interfaces/CategoryInterface';
import {CommonContext} from 'store/CommonContext';

function EditorIndexPage(): JSX.Element {
  const authStore = useContext(AuthContext);
  const store = useContext(EditorContext);
  const commonStore = useContext(CommonContext);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ILevel>({...defaultLevelData});

  useEffect(() => {
    if (!authStore.userData?.grade) return;

    if (authStore.userData?.grade === 'admin') {
      store.getCategoryList();
      const firstOrder = store.categoryList.find((item) => item.order === 1);
      // todo: order === 1 is error
      setSelectedCategory(firstOrder || null);
    } else {
      router.push('/');
    }
  }, [store, authStore.userData?.grade, router]);

  const onSaveDetail = (levelData: ILevel): void => {
    setSelectedCategory({...selectedCategory} as ICategory);
    commonStore.addModeless(`${levelData.title}의 변경 내용이 저장되었습니다.`);
    setSelectedLevel(levelData);
  };

  useEffect(() => {
    if (!authStore.userData?.grade) return;
    // todo: access denied
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
  return <EditorProvider>{page}</EditorProvider>;
};

export default observer(EditorIndexPage);
