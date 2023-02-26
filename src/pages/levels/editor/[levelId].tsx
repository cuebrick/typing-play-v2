import {observer} from "mobx-react-lite"
import {ChangeEvent, ReactElement, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {inputType, languageOptions} from "constants/Constants";
import {ILevel} from "interfaces/levelInterface";
import LevelGroupModal from "components/modal/LevelGroupModal";
import {LevelContext, LevelProvider} from "store/LevelContext";
import {
  FormData,
  FormLabel,
  FormRow,
  InputRangeForm,
  RadioFormGroup,
  SelectForm,
  SwitchForm,
  TextForm
} from "components/forms";

function LevelsEditorPage(): JSX.Element {
  const store = useContext(LevelContext)
  const router = useRouter()
  const {levelId} = router.query
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (levelId) {
      setIsEdit('create-level' !== levelId);
      store.getLevelGroupList()
      store.getLevel(levelId as string)
    }
  }, [levelId, store]);

  const [levelData, setLevelData] = useState<ILevel>({
    groupId: "",
    groupTitle: "",
    title: "",
    subTitle: "",
    description: "",
    text: "",
    inputType: "word",
    difficulty: "1",
    language: "ko",
    levelId: "",
    writer: "",
    createDateTime: null,
    modifiedDateTime: null
  })

  useEffect(() => {
    if (store.level) {
      setLevelData({...store.level})
    }
  }, [store.level])

  const onChange = (e: ChangeEvent): void => {
    const {value, name} = e.target as HTMLInputElement;
    let data = {
      ...levelData,
      [name]: value
    }
    setLevelData(data);
  }

  const onChangeLevelGroup = (e: ChangeEvent): void => {
    const {value, name, selectedIndex, options} = e.target as HTMLSelectElement;
    const groupTitle = selectedIndex > 0 ? options[selectedIndex].label : '';
    let data = {
      ...levelData,
      [name]: value,
      groupTitle
    }
    setLevelData(data);
  }

  const onChangeInputType = (e: ChangeEvent): void => {
    const {checked, name} = e.target as HTMLInputElement;
    let data = {
      ...levelData,
      [name]: checked ? inputType.word.value : inputType.letter.value
    }
    setLevelData(data);
  }

  const onClickSave = async () => {
    const response = await store.saveLevel(levelData, isEdit);
    console.log('<<<<response', response.id, response)
    router.push(`/levels/editor/${response.id}`)
  }

  const [isShowGroupLayer, setIsShowGroupLayer] = useState(false);
  const onClickEditGroup = () => {
    setIsShowGroupLayer(true);
  }

  const onCloseGroupModal = () => {
    console.log('onCloseGroupModal');
    setIsShowGroupLayer(false);
  }

  return (
    <div className="editor-page">
      <FormRow>
        <FormLabel htmlFor="title" required>
          제목
        </FormLabel>
        <FormData>
          <TextForm name="title" value={levelData.title} placeholder="제목" onChange={onChange}/>
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="subTitle">
          부제목
        </FormLabel>
        <FormData>
          <TextForm name="subTitle" value={levelData.subTitle} placeholder="부제목" onChange={onChange}/>
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="description">
          설명
        </FormLabel>
        <FormData>
          <TextForm name="description" value={levelData.description} placeholder="설명" onChange={onChange}/>
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="text">
          타자 데이터
        </FormLabel>
        <FormData>
          <TextForm type="textarea" name="text" value={levelData.text} placeholder="타자 데이터" onChange={onChange}/>
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="groupId">
          레벨 그룹
        </FormLabel>
        <FormData>
          <SelectForm name="groupId" value={levelData.groupId} valueKey="id" labelKey="title" placeholder="그룹 ID 선택"
                      options={store.levelGroupList} onChange={onChangeLevelGroup}/>
          <button onClick={onClickEditGroup}>수정</button>
          {isShowGroupLayer && (
            <LevelGroupModal onClose={onCloseGroupModal}/>
          )}
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="inputType">
          유형
        </FormLabel>
        <FormData>
          <SwitchForm onChange={onChangeInputType} name="inputType" checkedLabel={inputType.letter.label}
                      checkedValue={inputType.word.value} uncheckedLabel={inputType.word.label}
                      uncheckedValue={inputType.letter.value} checked={levelData.inputType === inputType.word.value}/>
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="difficulty">
          난이도
        </FormLabel>
        <FormData>
          <InputRangeForm name="difficulty" value={levelData.difficulty} onChange={onChange}/>
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="language">
          언어
        </FormLabel>
        <FormData>
          <RadioFormGroup name="language" value={levelData.language} options={languageOptions} onChange={onChange}/>
        </FormData>
      </FormRow>
      <pre>
                {JSON.stringify(levelData, null, '\t')}
            </pre>
      <button onClick={onClickSave}>저장</button>
    </div>
  )
}

LevelsEditorPage.getProvider = (page: ReactElement): ReactElement => {
  return (
    <LevelProvider>{page}</LevelProvider>
  )
}

export default observer(LevelsEditorPage);