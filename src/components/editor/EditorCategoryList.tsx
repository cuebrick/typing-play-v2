import {ICategory} from 'interfaces/CategoryInterface';
import CategoryModal from 'components/modal/CategoryModal';
import {useContext, useEffect, useState} from 'react';
import {LevelContext} from 'store/LevelContext';
import EditorCategoryItem from 'components/editor/EditorCategoryItem';

interface IProps {
  onSelect(levelData: ICategory): void;
}

const categoryAll = {
  id: '__ALL__',
  title: '모든 카테고리 >>',
  order: 0
};

function EditorCategoryList({onSelect}: IProps): JSX.Element {
  const store = useContext(LevelContext);
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
    <div className="editor-category-list">
      <div className="header">
        <h3>카테고리 목록</h3>
        <button className="default" onClick={() => setIsShowCategoryModal(true)}>수정</button>
      </div>
      <div className="list">
        <EditorCategoryItem
          data={categoryAll}
          isActive={Boolean(selected) && categoryAll.id === selected?.id}
          onClick={() => onClickCategory(categoryAll)}
        />
        {store.categoryList?.map(category => (
          <EditorCategoryItem
            key={category.id}
            data={category}
            isActive={Boolean(selected) && category.id === selected?.id}
            onClick={() => onClickCategory(category)}
          />
        ))}
      </div>
      {isShowCategoryModal && (
        <CategoryModal onClose={() => setIsShowCategoryModal(false)} />
      )}
    </div>
  );
}

export default EditorCategoryList;
