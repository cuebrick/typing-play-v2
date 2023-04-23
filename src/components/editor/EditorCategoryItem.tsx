import {ICategory} from 'interfaces/CategoryInterface';
import clsx from 'clsx';

interface IProps {
  data: ICategory;
  isActive: boolean;

  onClick?(): void;
}

function EditorCategoryItem({data, isActive, onClick}: IProps): JSX.Element {
  return (
    <div className={clsx('editor-category-item', {active: isActive})} onClick={onClick}>
      <div className="info">
        <div className="title">{data.title}</div>
      </div>
    </div>
  );
}

EditorCategoryItem.defaultProps = {
  onClick: undefined
};

export default EditorCategoryItem;
