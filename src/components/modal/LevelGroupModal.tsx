import Modal from "components/modal/Modal";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import {useEffect, useState} from "react";

interface IProps {
  onChangeGroups(): void;
}

function LevelGroupModal({onChangeGroups}: IProps): JSX.Element {

  const [groupList, setGroupList] = useState<any>([]);
  useEffect(() => {
    // todo : api 호출
    const result = [
      {
        id: "A01",
        title: "첫 번째 그룹"
      },
      {
        id: "A02",
        title: "두 번째 그룹"
      },
      {
        id: "A03",
        title: "세 번째 그룹"
      }
    ]
    setGroupList(result);
  }, [])

  const onChanged = () => {
    onChangeGroups();
  }

  return (
      <Modal>
        <ModalHeader>레벨 그룹</ModalHeader>
        <ModalBody><div style={{height: 200}}>some text</div></ModalBody>
        <ModalFooter>
          <button>생성</button>
          <button>삭제</button>
          <button>취소</button>
          <button>저장</button>
        </ModalFooter>
      </Modal>
  )
}

export default LevelGroupModal