import {ICategory} from 'interfaces/CategoryInterface';

interface IProps {
  data: ICategory;
  isActive: boolean;

  onClick?(): void;
}

function EditorCategoryItem({data, isActive, onClick}: IProps): JSX.Element {
  return (
    <div className={`editor-category-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="info">
        <div className="title">{data.title}</div>
      </div>
    </div>
  );
}

export default EditorCategoryItem;
