import Modal from "components/modal/Modal";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import TextForm from "components/forms/TextForm";
import FormData from "components/forms/FormData";
import FormRow from "components/forms/FormRow";
import FormLabel from "components/forms/FormLabel";
import {addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc} from "firebase/firestore";
import {db} from 'database';
import {ILevelGroup} from 'interfaces/LevelGroupInterface';

interface IProps {
  onChangeGroups(): void;
  onClose(): void;
}

function LevelGroupModal({onChangeGroups, onClose}: IProps): JSX.Element {

  const [isEdit, setIsEdit] = useState(false);
  const [groupList, setGroupList] = useState<ILevelGroup[]>([]);
  const getLevelGroups = async () => {
    const q = query(collection(db, 'levelGroups'), orderBy('order'));
    const querySnapshot = await getDocs(q);
    const groups: ILevelGroup[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      groups.push({...doc.data(), id: doc.id} as ILevelGroup);
    });
    setGroupList(groups);
  }

  useEffect(() => {
    getLevelGroups();
  }, [])

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
    // console.log('onChange()1:', detail/*, name, value, e*/);
    setDetail({
      ...detail,
      [name]: value
    });
  }

  const onClickCreate = (): void => {
    setDetail({...defaultDetail});
    setIsEdit(false);
  }

  const onClickSave = async () => {
    try {
      if (isEdit) {
        await setDoc(doc(db, 'levelGroups', detail.id), detail);
      } else {
        const docRef = await addDoc(collection(db, 'levelGroups'), detail);
        console.log('docRef', docRef.id, docRef);
      }
      getLevelGroups();
      onChangeGroups();
    } catch (error) {
      // TODO: error handling
    }
  }

  const onClickDelete = async (): Promise<void> => {
    await deleteDoc(doc(db, 'levelGroups', detail.id));
    // console.log('<<< response:', detail.id);
    getLevelGroups();
    setDetail({...defaultDetail});
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
            {groupList?.map(group => <li key={group.id} onClick={() => onClickGroup(group)}>{group.title}</li>)}
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

export default LevelGroupModal