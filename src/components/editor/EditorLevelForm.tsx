import {
  FormData,
  FormLabel,
  FormRow,
  InputRangeForm,
  RadioFormGroup,
  SelectForm,
  SwitchForm,
  TextForm
} from 'components/forms';
import {inputType, languageOptions} from 'constants/Constants';
import {ChangeEvent, useContext, useEffect, useState} from 'react';
import {ILevel} from 'interfaces/LevelInterface';
import {LevelContext} from 'store/LevelContext';

interface IProps {
  levelData: ILevel;

  onSave(levelData: ILevel): void;
}

function EditorLevelForm({levelData, onSave}: IProps): JSX.Element {
  const store = useContext(LevelContext);
  const [data, setData] = useState<ILevel>(levelData);

  useEffect(() => {
    if (levelData) {
      setData(levelData);
    }
  }, [levelData]);

  const onChange = (e: ChangeEvent): void => {
    const {value, name, type} = e.target as HTMLInputElement;
    console.log('<<<<< ', name, type, value);
    let merged = {
      ...data,
      [name]: type === 'number' ? Number(value) : value
    } as ILevel;
    setData(merged);
  };

  const onChangeLevelGroup = (e: ChangeEvent): void => {
    const {value, name, selectedIndex, options} = e.target as HTMLSelectElement;
    const groupTitle = selectedIndex > 0 ? options[selectedIndex].label : '';
    let merged = {
      ...data,
      [name]: value,
      groupTitle
    } as ILevel;
    setData(merged);
  };

  const onChangeInputType = (e: ChangeEvent): void => {
    const {checked, name} = e.target as HTMLInputElement;
    let merged = {
      ...data,
      [name]: checked ? inputType.word.value : inputType.letter.value
    } as ILevel;
    setData(merged);
  };

  const onClickSave = () => {
    onSave(data);
  };

  const isDisableToSave = (): boolean => {
    return JSON.stringify(levelData) === JSON.stringify(data);
  };

  return (
    <div className="editor-level-form">
      <div className="header">
        <h3>{levelData.title}</h3>
      </div>
      <FormRow>
        <FormLabel htmlFor="title" required>
          제목
        </FormLabel>
        <FormData>
          <TextForm name="title" value={data.title} placeholder="제목" onChange={onChange} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="subTitle">
          부제목
        </FormLabel>
        <FormData>
          <TextForm name="subTitle" value={data.subTitle} placeholder="부제목" onChange={onChange} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="description">
          설명
        </FormLabel>
        <FormData>
          <TextForm name="description" value={data.description} placeholder="설명" onChange={onChange} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="text">
          타자 데이터
        </FormLabel>
        <FormData>
          <TextForm type="textarea" name="text" value={data.text} placeholder="타자 데이터" onChange={onChange} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="groupId">
          레벨 그룹
        </FormLabel>
        <FormData>
          <SelectForm name="groupId" value={data.groupId} valueKey="id" labelKey="title" placeholder="그룹 ID 선택"
                      options={store.levelGroupList} onChange={onChangeLevelGroup} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="inputType">
          유형
        </FormLabel>
        <FormData>
          <SwitchForm onChange={onChangeInputType} name="inputType" checkedLabel={inputType.letter.label}
                      checkedValue={inputType.word.value} uncheckedLabel={inputType.word.label}
                      uncheckedValue={inputType.letter.value} checked={data.inputType === inputType.word.value} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="difficulty">
          난이도
        </FormLabel>
        <FormData>
          <InputRangeForm name="difficulty" value={data.difficulty} onChange={onChange} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="language">
          언어
        </FormLabel>
        <FormData>
          <RadioFormGroup name="language" value={data.language} options={languageOptions} onChange={onChange} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor="order">
          order
        </FormLabel>
        <FormData>
          <TextForm type="number" name="order" value={data.order} placeholder="순서" onChange={onChange} />
        </FormData>
      </FormRow>
      <FormRow>
        <FormData>
          <button className="default" onClick={onClickSave} disabled={isDisableToSave()}>저장</button>
        </FormData>
      </FormRow>
      {/*<pre>{JSON.stringify(data, null, '\t')}</pre>*/}
    </div>
  );
}

export default EditorLevelForm;
