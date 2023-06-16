import {IKeyInput, ILetter, ILevel, IScoreData} from 'interfaces/LevelInterface';
import {useCallback, useContext, useEffect, useState} from 'react';
import {LevelContext} from 'store/LevelContext';
import Hangul from 'korean-js/src/hangul';
import {useRouter} from 'next/router';

interface IProps {
  letterList: ILetter[] | null;
  keyInputList: IKeyInput[];
  nextLevel: ILevel;
  clearKeyInputData(): void;
  onSaveUserTypingData(data: IScoreData): void;
}
function ScoreBoard({
  letterList,
  keyInputList,
  nextLevel,
  clearKeyInputData,
  onSaveUserTypingData
}: IProps): JSX.Element {
  const [scoreData, setScoreData] = useState<IScoreData>({} as IScoreData);
  const store = useContext(LevelContext);
  const router = useRouter();
  const calculate = useCallback(() => {
    if (!letterList) return;

    const typingList = Hangul.disassemble(store.level.text);
    // 단어 기준 오타율 계산 시 사용
    // const typingGroupedList = Hangul.disassemble(store.level.text, true);
    const inputList = letterList.reduce((acc: string[], curr: ILetter) => {
      if (curr.typingText) {
        acc = acc.concat(curr.typingText);
      }
      return acc;
    }, []);

    // 타자 시간 계산 부분
    const typingDuration =
      (keyInputList[keyInputList.length - 1].timestamp?.seconds as number) -
      (keyInputList[0].timestamp?.seconds as number);

    // 오타율 계산 부분
    // 자소 기준 오타율 계산
    const letterLength = typingList.length;
    let checkCorrectLetter = 0;
    typingList.forEach((letter, index) => {
      if (letter === inputList[index]) {
        checkCorrectLetter += 1;
      }
    });
    const typingAccuracy = Math.floor((checkCorrectLetter / letterLength) * 100);

    // 단어 기준 오타율 계산
    // const textLength = typingGroupedList.length;
    // let checkCorrectText = 0;
    // typingGroupedList.forEach((text, index) => {
    //   if (JSON.stringify(text) === JSON.stringify(letterList[index].typingText)) {
    //     checkCorrectText += 1;
    //   }
    // });
    // const typingAccuracy = Math.floor((checkCorrectText / textLength) * 100);

    // 타자 속도 계산 부분
    // 공식 => 타자 데이터의 자소 개수 * (60 / 걸린시간) * 정확도
    const typingSpeed = Math.floor(((typingList.length * 60) / typingDuration) * (typingAccuracy / 100));
    const data = {
      accuracy: typingAccuracy,
      realAccuracy: 0,
      speed: typingSpeed,
      duration: typingDuration,
      score: 0
    };
    setScoreData(data);
    onSaveUserTypingData(data);
  }, [letterList, keyInputList, store]);

  useEffect(() => {
    if (letterList?.length !== 0) {
      // 점수계산 및 서버에 저장 후 다음 행동 선택(목록 or 다음레벨)
      calculate();
    }
  }, [letterList, calculate]);

  const onClickNextLevelBtn = (level: ILevel): void => {
    clearKeyInputData();
    router.push(`/levels/${level.id}`);
  };

  const onClickLevelListBtn = (): void => {
    clearKeyInputData();
    router.push('/levels');
  };

  return (
    <div>
      <span>Scoreboard is here!</span>
      <span>정확도 : {scoreData.accuracy}</span>
      <span>실제 정확도 : {scoreData.realAccuracy}</span>
      <span>타수 : {scoreData.speed}</span>
      <span>진행시간 : {scoreData.duration}</span>
      <span>점수 : {scoreData.score}</span>
      <button onClick={onClickLevelListBtn}>목록으로 이동</button>
      {nextLevel && (
        <button
          onClick={() => {
            onClickNextLevelBtn(nextLevel);
          }}
        >
          다음 레벨로 이동
        </button>
      )}
    </div>
  );
}
export default ScoreBoard;
