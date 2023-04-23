import {
  FormData,
  FormLabel,
  FormRow,
  InputRangeForm,
  NumberStepper,
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

  onCreate(withClear: boolean): void;
}

function EditorLevelForm({levelData, onSave, onCreate}: IProps): JSX.Element {
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
    const merged = {
      ...data,
      [name]: type === 'number' ? Number(value) : value
    } as ILevel;
    setData(merged);
  };

  const onChangeOrder = (order: number): void => {
    const merged = {
      ...data,
      order
    } as ILevel;
    setData(merged);
  };

  const onChangeCategory = (e: ChangeEvent): void => {
    const {value, name, selectedIndex, options} = e.target as HTMLSelectElement;
    const categoryTitle = selectedIndex > 0 ? options[selectedIndex].label : '';
    const merged = {
      ...data,
      [name]: value,
      categoryTitle
    } as ILevel;
    setData(merged);
  };

  const onChangeInputType = (e: ChangeEvent): void => {
    const {checked, name} = e.target as HTMLInputElement;
    const merged = {
      ...data,
      [name]: checked ? inputType.word.value : inputType.letter.value
    } as ILevel;
    setData(merged);
  };

  const onClickSave = async () => {
    await store.saveLevel(data);
    onSave(data);
    // 레벨 목록을 릴레이 하지 않고 여기서 호출함.
    store.getLevelList({categoryId: data.categoryId});
  };

  const isDisableToSave = (): boolean => {
    return JSON.stringify(levelData) === JSON.stringify(data);
  };

  const isInvalidatedOrder = (): boolean => {
    return store.levelList.some((level) => level.id !== data.id && level.order === data.order);
  };

  return (
    <div className="editor-level-form">
      <div className="header">
        <h3>{levelData.title || '이름 없는 레벨'}</h3>
        <div className="button-group">
          <button className="default" onClick={onClickSave} disabled={isDisableToSave()}>
            저장
          </button>
          <button className="default" onClick={() => onCreate(true)}>
            +
          </button>
          <button className="default" disabled={levelData.id === ''} onClick={() => onCreate(false)}>
            현재 데이터를 이용해 새 레벨
          </button>
        </div>
      </div>
      <div className="detail-form">
        <FormRow>
          <FormLabel htmlFor="categoryId">카테고리</FormLabel>
          <FormData>
            <SelectForm
              name="categoryId"
              value={data.categoryId}
              valueKey="id"
              labelKey="title"
              placeholder="카테고리 선택"
              options={store.categoryList}
              onChange={onChangeCategory}
            />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="title" required>
            제목
          </FormLabel>
          <FormData>
            <TextForm name="title" value={data.title} placeholder="제목" onChange={onChange} />
            {data.id}
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="subTitle">부제목</FormLabel>
          <FormData>
            <TextForm name="subTitle" value={data.subTitle} placeholder="부제목" onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="description">설명</FormLabel>
          <FormData>
            <TextForm name="description" value={data.description} placeholder="설명" onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="text">타자 데이터</FormLabel>
          <FormData>
            <TextForm type="textarea" name="text" value={data.text} placeholder="타자 데이터" onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="inputType">유형</FormLabel>
          <FormData>
            <SwitchForm
              onChange={onChangeInputType}
              name="inputType"
              checkedLabel={inputType.letter.label}
              checkedValue={inputType.word.value}
              uncheckedLabel={inputType.word.label}
              uncheckedValue={inputType.letter.value}
              checked={data.inputType === inputType.word.value}
            />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="difficulty">난이도</FormLabel>
          <FormData>
            <InputRangeForm name="difficulty" value={data.difficulty} onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="language">언어</FormLabel>
          <FormData>
            <RadioFormGroup name="language" value={data.language} options={languageOptions} onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="order">order</FormLabel>
          <FormData>
            <NumberStepper name="order" value={data.order} invalidated={isInvalidatedOrder()} onStep={onChangeOrder} />
          </FormData>
        </FormRow>
        {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
      </div>
    </div>
  );
}

export default EditorLevelForm;
