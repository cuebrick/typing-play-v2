import {observer} from 'mobx-react-lite';
import Modal from "components/modal/Modal";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import TextForm from "components/forms/TextForm";
import FormData from "components/forms/FormData";
import FormRow from "components/forms/FormRow";
import FormLabel from "components/forms/FormLabel";
import {ILevelGroup} from 'interfaces/LevelGroupInterface';
import {LevelContext} from "store/LevelContext";

interface IProps {
  onChangeGroups?(): void;

  onClose(): void;
}

function LevelGroupModal({onClose}: IProps): JSX.Element {

  const store = useContext(LevelContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    store.getLevelGroupList()
  }, [store])

  const defaultDetail: ILevelGroup = Object.freeze({
    id: '',
    title: '',
    order: 0
  })
  const [detail, setDetail] = useState<ILevelGroup>({...defaultDetail});
  const onClickGroup = (group: ILevelGroup): void => {
    // console.log('onClickGroup(group)', group);
    setDetail(group);
    setIsEdit(true);
  }

  const onChange = (e: ChangeEvent): void => {
    const {name, value} = e.target as HTMLInputElement
    setDetail({
      ...detail,
      [name]: value
    });
  }

  const onClickCreate = (): void => {
    setDetail({...defaultDetail});
    setIsEdit(false);
  }

  const onClickSave = () => {
    store.saveLevelGroup(detail, isEdit)
  }

  const onClickDelete = async (): Promise<void> => {
    const response = await store.deleteGroupList(detail.id);
    if (response.success) {
      setDetail({...defaultDetail});
    }
  }

  const onClickClose = (): void => {
    onClose();
  }

  return (
    <Modal>
      <ModalHeader onClose={onClickClose}>레벨 그룹</ModalHeader>
      <ModalBody>
        <div className="level-group-editor">
          <ul className="level-group-list">
            {store.levelGroupList.map(group => <li key={group.id}
                                                   onClick={() => onClickGroup(group)}>{group.title}</li>)}
            <li>
              <button onClick={onClickCreate} disabled={!isEdit}>생성</button>
            </li>
          </ul>
          <div className="level-group-detail">
            <h4>{isEdit ? '레벨 그룹 수정' : '신규 레벨 그룹'}</h4>
            <FormRow>
              <FormLabel>Group ID</FormLabel>
              <FormData>
                {isEdit ? detail.id : '자동 생성'}
              </FormData>
            </FormRow>
            <FormRow>
              <FormLabel>Title</FormLabel>
              <FormData>
                <TextForm onChange={onChange} name="title" value={detail.title}/>
              </FormData>
            </FormRow>
            <FormRow>
              <FormLabel>Order</FormLabel>
              <FormData>
                <TextForm onChange={onChange} name="order" value={detail.order}/>
              </FormData>
            </FormRow>
            <FormRow>
              {isEdit && <button onClick={onClickDelete}>삭제</button>}
              <button onClick={onClickSave}>{isEdit ? '저장' : '등록'}</button>
            </FormRow>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={onClickClose}>닫기</button>
      </ModalFooter>
    </Modal>
  )
}

export default observer(LevelGroupModal)
