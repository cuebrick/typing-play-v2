import {ChangeEvent, useEffect, useState} from "react";
import TextForm from "components/forms/TextForm";

function LevelGroupSelector({levelGroupList, onChange}): JSX.Element {

  const [list, setList] = useState(levelGroupList);
  const [selectedGroup, setSelectedGroup] = useState({});
  useEffect(() => {
    setList([...levelGroupList]);
  }, [levelGroupList]);

  const onClickGroup = (group): void => {
    console.log('group:', group);
    setSelectedGroup(group);
    // group 목록 선택
  }
  const onClickSave = (): void => {
    // TODO: save
    onChange();
    // 저장 버튼 눌렀을 때
  }

  const onChangeData = (e: ChangeEvent) => {
    // const found = list?.find(grp => grp.id === group.id);
    const {name, value} = e.target as HTMLInputElement;
    const group = {
      ...selectedGroup,
      [name]: value
    }
    setSelectedGroup(group)
    // 텍스트나 id를 변경했을때 state에 저장.
  }

  return (
      <div className="edit-group-layer" style={{position: 'absolute'}}>
        <div className="groups">
          <ul>
            {list?.map(group => <li key={group.id} onClick={ () => onClickGroup(group) }>{group.title}</li>)}
          </ul>
          <div>
            <TextForm onChange={onChangeData} name="title" value={selectedGroup?.title}/>
            <TextForm onChange={onChangeData} name="id" value={selectedGroup?.id}/>
          </div>
        </div>
        <button onClick={onClickSave}>저장</button>
      </div>
  )
}

export default LevelGroupSelector