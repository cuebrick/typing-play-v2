import {ChangeEvent, ReactElement, useRef, useState} from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const Container = styled.div`
  height: 30px;
`;
const NumInput = styled.input`
  width: 50px;
  height: 100%;
  text-align: center;
  font-size: 15px;
  background-color: #eaeffa;
  border: 1px solid #c7cede;
  color: #475885;
  box-sizing: border-box;
  outline: none;
  appearance: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &.invalid {
    border-color: tomato;
    background-color: rgba(255, 45, 45, 0.05);
  }

  &:focus {
    background-color: #ffffff;
  }
`;
const UnitSelect = styled.select`
  background-color: #eaeffa;
  border: 1px solid #c7cede;
  color: #475885;
  border-left: none;
  font-size: 15px;
  padding: 0 5px;
  outline: none;
  height: 100%;
  width: 90px;

  &:focus {
    background-color: #ffffff;
  }
`;

export const timeUnitList = ['minute', 'hour', 'day', 'week', 'month', 'year'] as const;
export type TimeUnitTypes = (typeof timeUnitList)[number];
const minutesInUnit = {minute: 1, hour: 60, day: 1440, week: 10080, month: 43200, year: 525600};

type IProps = {
  value: number | string;
  unit: TimeUnitTypes;
  defaultUnit?: TimeUnitTypes;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange?(value: number | undefined, unit: TimeUnitTypes, isInvalid: boolean): void;
};

function TimeSelector({
  value,
  unit,
  defaultUnit = 'minute',
  placeholder,
  min = 0,
  max = Infinity,
  onChange
}: IProps): ReactElement {
  const ref = useRef<HTMLInputElement>(null);
  const [invalid, setInvalid] = useState(false);
  const [num, setNum] = useState<string>(value?.toString() ?? '1');
  const [unitType, setUnitType] = useState<TimeUnitTypes>(unit);
  const maxByUnit = max * minutesInUnit[defaultUnit];
  const minByUnit = min * minutesInUnit[defaultUnit];

  const getIsOutOfRange = (value: number, unit: TimeUnitTypes): boolean => {
    const parsedByUnit = value * minutesInUnit[unit];
    return parsedByUnit > maxByUnit || parsedByUnit < minByUnit;
  };

  /**
   * 기간 단위 select 변경 - 이벤트 처리부
   * @param e
   */
  const onChangeUnit = (e: ChangeEvent<HTMLSelectElement>): void => {
    const {value} = e.target;
    const u = value as TimeUnitTypes;

    setUnitType(u);

    const n = num as unknown as number;
    const outOfRange = getIsOutOfRange(n, u);
    const bool = isNaN(n) || outOfRange;
    setInvalid(bool);

    onChange?.(isNaN(n) ? undefined : n, u, bool);

    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  };

  /**
   * 기간 단위 숫자 입력 - 이벤트 처리부
   * @param e
   */
  const onChangeNum = (e: ChangeEvent<HTMLInputElement>): void => {
    const {value} = e.target;
    setNum(value);

    let parsed = parseFloat(value);
    const outOfRange = getIsOutOfRange(parsed, unitType);
    const bool = isNaN(parsed) || outOfRange;
    setInvalid(bool);

    onChange?.(isNaN(parsed) ? undefined : parsed, unitType, bool);
  };

  return (
    <Container>
      <NumInput
        type="number"
        ref={ref}
        value={num}
        className={clsx({invalid})}
        disabled={!unitType}
        onChange={onChangeNum}
      />
      <UnitSelect value={unitType} onChange={onChangeUnit}>
        {placeholder && <option value={undefined}>{placeholder}</option>}
        {timeUnitList.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
            {num > '1' && 's'}
          </option>
        ))}
      </UnitSelect>
    </Container>
  );
}

export default TimeSelector;
