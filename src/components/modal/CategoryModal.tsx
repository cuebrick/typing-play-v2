import {observer} from 'mobx-react-lite';
import Modal from 'components/modal/Modal';
import ModalHeader from 'components/modal/ModalHeader';
import ModalBody from 'components/modal/ModalBody';
import ModalFooter from 'components/modal/ModalFooter';
import {ChangeEvent, useContext, useEffect, useState} from 'react';
import TextForm from 'components/forms/TextForm';
import FormData from 'components/forms/FormData';
import FormRow from 'components/forms/FormRow';
import FormLabel from 'components/forms/FormLabel';
import {ICategory} from 'interfaces/category-interface';
import {EditorContext} from 'store/EditorContext';
import styled from 'styled-components';

const CategoryEditor = styled.div`
  display: flex;
`;
const CategoryList = styled.ul`
  width: 200px;
  flex-shrink: 0;

  > li {
    min-height: 40px;

    &:hover {
      background-color: rgba(0, 100, 256, 0.1);
    }
  }
`;
const CategoryDetail = styled.div``;

interface IProps {
  onChangeCategory?(): void;
  onClose(): void;
}

function CategoryModal({onClose}: IProps): JSX.Element {
  const store = useContext(EditorContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    store.getCategoryList();
  }, [store]);

  const defaultDetail: ICategory = Object.freeze({
    id: '',
    title: '',
    order: 0
  });
  const [detail, setDetail] = useState<ICategory>({...defaultDetail});
  const onClickCategory = (category: ICategory): void => {
    // console.log('onClickGroup(group)', group);
    setDetail(category);
    setIsEdit(true);
  };

  const onChange = (e: ChangeEvent): void => {
    const {name, value} = e.target as HTMLInputElement;
    setDetail({
      ...detail,
      [name]: name === 'order' ? Number(value) : value
      // todo: order엔 string 입력 불가하도록 작업 or order에도 numberStepper 사용
    });
  };

  const onClickCreate = (): void => {
    setDetail({...defaultDetail});
    setIsEdit(false);
  };

  const onClickSave = () => {
    store.saveCategory(detail, isEdit);
  };

  const onClickDelete = async (): Promise<void> => {
    const response = await store.deleteCategory(detail.id);
    if (response.success) {
      setDetail({...defaultDetail});
    }
  };

  const onClickClose = (): void => {
    onClose();
  };

  return (
    <Modal>
      <ModalHeader onClose={onClickClose}>레벨 카테고리</ModalHeader>
      <ModalBody>
        <CategoryEditor>
          <CategoryList>
            {store.categoryList.map((category) => (
              <li key={category.id} onClick={() => onClickCategory(category)}>
                {category.title}
              </li>
            ))}
            <li>
              <button onClick={onClickCreate}>생성</button>
            </li>
          </CategoryList>
          <CategoryDetail>
            <h4>{isEdit ? '카테고리 수정' : '신규 카테고리'}</h4>
            <FormRow>
              <FormLabel>카테고리 ID</FormLabel>
              <FormData>{isEdit ? detail.id : '자동 생성'}</FormData>
            </FormRow>
            <FormRow>
              <FormLabel>Title</FormLabel>
              <FormData>
                <TextForm onChange={onChange} name="title" value={detail.title} />
              </FormData>
            </FormRow>
            <FormRow>
              <FormLabel>Order</FormLabel>
              <FormData>
                <TextForm onChange={onChange} name="order" value={detail.order} />
              </FormData>
            </FormRow>
            <FormRow>
              {isEdit && <button onClick={onClickDelete}>삭제</button>}
              <button onClick={onClickSave}>{isEdit ? '저장' : '등록'}</button>
            </FormRow>
          </CategoryDetail>
        </CategoryEditor>
      </ModalBody>
      <ModalFooter>
        <button onClick={onClickClose}>닫기</button>
      </ModalFooter>
    </Modal>
  );
}

export default observer(CategoryModal);
