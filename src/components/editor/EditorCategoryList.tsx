import {ICategory} from 'interfaces/CategoryInterface';
import CategoryModal from 'components/modal/CategoryModal';
import {useContext, useEffect, useState} from 'react';
import {EditorContext} from 'store/EditorContext';
import EditorCategoryItem from 'components/editor/EditorCategoryItem';
import styled from 'styled-components';
import Button from 'components/forms/Button';

const Container = styled.div`
  width: 300px;
  flex-shrink: 0;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;
const Categories = styled.div``;

interface IProps {
  onSelect(levelData: ICategory): void;
}

function EditorCategoryList({onSelect}: IProps): JSX.Element {
  const store = useContext(EditorContext);
  const [selected, setSelected] = useState<ICategory | null>(null);
  const [isShowCategoryModal, setIsShowCategoryModal] = useState(false);

  useEffect(() => {
    store.getCategoryList();
  }, [store]);

  const onClickCategory = (categoryData: ICategory): void => {
    onSelect(categoryData);
    setSelected(categoryData);
  };

  return (
    <Container>
      <Header>
        <h3>카테고리 목록</h3>
        <Button onClick={() => setIsShowCategoryModal(true)}>수정</Button>
      </Header>
      <Categories>
        {store.categoryList?.map((category) => (
          <EditorCategoryItem
            key={category.id}
            data={category}
            isActive={Boolean(selected) && category.id === selected?.id}
            onClick={() => onClickCategory(category)}
          />
        ))}
      </Categories>
      {isShowCategoryModal && <CategoryModal onClose={() => setIsShowCategoryModal(false)} />}
    </div>
  );
}

export default EditorCategoryList;
