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
import {inputType, languageOptions} from 'constants/constants';
import {ChangeEvent, useContext, useEffect, useState} from 'react';
import {ILevel} from 'interfaces/level-interface';
import {ICategory} from 'interfaces/category-interface';
import {ILanguage} from 'interfaces/language-interface';
import {EditorContext} from 'store/EditorContext';
import styled from 'styled-components';
import Button from 'components/forms/Button';
import TimeSelector, {TimeUnitTypes} from 'components/forms/TimeSelector';

const Container = styled.div`
  flex-grow: 1;
`;
const LevelFormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;
const ButtonGroup = styled.div`
  height: 30px;
  display: flex;
  column-gap: 2px;
`;
const DetailForm = styled.div`
  background-color: #fff;
  padding: 20px;
`;

interface IProps {
  levelData: ILevel;

  onSave(levelData: ILevel): void;

  onCreate(withClear: boolean): void;
}

function EditorLevelForm({levelData, onSave, onCreate}: IProps): JSX.Element {
  const store = useContext(EditorContext);
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
    const {checked, name, value} = e.target as HTMLInputElement;
    const merged = {
      ...data,
      [name]: checked ? inputType.word.value : inputType.letter.value
    } as ILevel;
    console.log('>>> 나오자 2', value);
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

  const [timeValue, setTimeValue] = useState<number>();
  const [timeUnit, setTimeUnit] = useState<TimeUnitTypes>();
  const onChangeTimeSelector = (value: number, unit: TimeUnitTypes, isDisabled: boolean): void => {
    setTimeValue(value);
    setTimeUnit(unit);
  };

  return (
    <Container>
      <LevelFormHeader>
        <h3>{levelData.title || '이름 없는 레벨'}</h3>
        <ButtonGroup>
          <Button onClick={onClickSave} disabled={isDisableToSave()}>
            저장
          </Button>
          <Button onClick={() => onCreate(true)}>+</Button>
          <Button disabled={levelData.id === ''} onClick={() => onCreate(false)}>
            현재 데이터를 이용해 새 레벨
          </Button>
        </ButtonGroup>
      </LevelFormHeader>
      <DetailForm>
        <FormRow>
          <FormLabel htmlFor="categoryId">카테고리</FormLabel>
          <FormData>
            <SelectForm<ICategory>
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
          <FormLabel required>제목</FormLabel>
          <FormData>
            <TextForm name="title" value={data.title} placeholder="제목" onChange={onChange} />
            {data.id}
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>부제목</FormLabel>
          <FormData>
            <TextForm name="subTitle" value={data.subTitle} placeholder="부제목" onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>설명</FormLabel>
          <FormData>
            <TextForm name="description" value={data.description} placeholder="설명" onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>타자 데이터</FormLabel>
          <FormData>
            <TextForm type="textarea" name="text" value={data.text} placeholder="타자 데이터" onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>유형</FormLabel>
          <FormData>
            <SwitchForm
              onChange={onChangeInputType}
              name="inputType"
              checkedLabel={inputType.letter.label}
              // checkedValue={inputType.word.value}
              uncheckedLabel={inputType.word.label}
              // uncheckedValue={inputType.letter.value}
              checked={data.inputType === inputType.word.value}
            />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>난이도</FormLabel>
          <FormData>
            <InputRangeForm name="difficulty" value={data.difficulty} onChange={onChange} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>언어</FormLabel>
          <FormData>
            <RadioFormGroup<ILanguage>
              name="language"
              value={data.language}
              options={languageOptions}
              onChange={onChange}
            />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>order</FormLabel>
          <FormData>
            <NumberStepper name="order" value={data.order} invalidated={isInvalidatedOrder()} onStep={onChangeOrder} />
          </FormData>
        </FormRow>
        <FormRow>
          <FormLabel>Time Selector</FormLabel>
          <FormData>
            <TimeSelector value={timeValue ?? 1} min={10} max={40} unit="minute" onChange={onChangeTimeSelector} />
          </FormData>
        </FormRow>
        {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
      </DetailForm>
    </Container>
  );
}

export default EditorLevelForm;
