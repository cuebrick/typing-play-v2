import Modal from "components/modal/Modal";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import {ChangeEvent, useEffect, useState} from "react";
import TextForm from "components/forms/TextForm";
import FormData from "components/forms/FormData";
import FormRow from "components/forms/FormRow";
import FormLabel from "components/forms/FormLabel";
import { addDoc, collection, getDocs } from "firebase/firestore";
import {db} from 'database';
import {ILevelGroup} from 'interfaces/LevelGroupInterface';

interface IProps {
  onChangeGroups(): void;
  onClose(): void;
}



function LevelGroupModal({onChangeGroups, onClose}: IProps): JSX.Element {

  const [groupList, setGroupList] = useState<ILevelGroup[]>([]);
  // const [groupList, setGroupList] = useState<Array<ILevelGroup>>([]);
  const getLevelGroups = async () => {
    const querySnapshot = await getDocs(collection(db, 'levelGroups'));
    const groups: ILevelGroup[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      groups.push(doc.data() as ILevelGroup);
    });
    setGroupList(groups);
  }

  useEffect(() => {
    getLevelGroups();
  }, [])

  const onChanged = () => {
    onChangeGroups();
  }

  const defaultDetail: ILevelGroup = Object.freeze({
    id: '',
    title: '',
    order: 0
  })
  const [detail, setDetail] = useState<ILevelGroup>({...defaultDetail});
  const onClickGroup = (group: ILevelGroup): void => {
    console.log('onClickGroup(group)', group);
    setDetail(group);
  }

  const onChange = (e: ChangeEvent): void => {
    const {name, value} = e.target as HTMLInputElement
    console.log('onChange()1:', detail/*, name, value, e*/);
    setDetail({
      ...detail,
      [name]: value
    });
  }

  const onClickCreate = (): void => {
    setDetail({...defaultDetail});
  }

  const onClickSave = async () => {
    try {
      const docRef = await addDoc(collection(db, 'levelGroups'), detail);
      console.log('docRef', docRef.id, docRef);
    } catch (error) {
      // error handling
    }
  }

  const onClickDelete = (): void => {
    // TODO: delete
  }

  const onClickClose = (): void => {
    onClose();
  }

  return (
      <Modal>
        <ModalHeader>레벨 그룹</ModalHeader>
        <ModalBody>
          <div className="level-group-editor">
            <ul className="level-group-list">
              {groupList?.map(group => <li key={group.id} onClick={() => onClickGroup(group)}>{group.title}</li>)}
            </ul>
            <div className="level-group-detail">
              <FormRow>
                <FormLabel>Group ID</FormLabel>
                <FormData>
                  <TextForm onChange={onChange} name="id" value={detail.id} />
                </FormData>
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
                <button onClick={onClickCreate}>생성</button>
                <button onClick={onClickDelete}>삭제</button>
                <button onClick={onClickSave}>저장</button>
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