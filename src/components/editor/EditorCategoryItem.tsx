import {ICategory} from 'interfaces/category-interface';
import clsx from 'clsx';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 10px;
  cursor: pointer;

  &.active {
    background-color: #efefef;
  }
`;
const Info = styled.div``;
const Title = styled.div``;

interface IProps {
  data: ICategory;
  isActive: boolean;

  onClick?(): void;
}

function EditorCategoryItem({data, isActive, onClick}: IProps): JSX.Element {
  return (
    <Container className={clsx({active: isActive})} onClick={onClick}>
      <Info>
        <Title>{data.title}</Title>
      </Info>
    </Container>
  );
}

EditorCategoryItem.defaultProps = {
  onClick: undefined
};

export default EditorCategoryItem;
