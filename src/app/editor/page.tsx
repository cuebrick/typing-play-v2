'use client';

import {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {observer} from 'mobx-react-lite';
import {EditorContext} from 'store/EditorContext';
import {ILevel} from 'interfaces/level-interface';
import {AuthContext} from 'store/AuthContext';
import EditorLevelForm from 'components/editor/EditorLevelForm';
import {defaultLevelData} from 'default-objects/Level';
import EditorLevelList from 'components/editor/EditorLevelList';
import EditorCategoryList from 'components/editor/EditorCategoryList';
import {ICategory} from 'interfaces/category-interface';
import {CommonContext} from 'store/CommonContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  column-gap: 20px;
  padding: 20px;
`;

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
    <Container>
      <EditorCategoryList onSelect={onSelectCategory} />
      <EditorLevelList onSelect={onSelectLevel} categoryData={selectedCategory} selectedLevel={selectedLevel} />
      <EditorLevelForm levelData={selectedLevel} onSave={onSaveDetail} onCreate={onCreateLevel} />
    </Container>
  );
}

export default observer(EditorIndexPage);
