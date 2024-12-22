import {IKeyInput, ILetter, ILevel, ILevelInfo, IScoreData} from 'interfaces/level-interface';
import {useCallback, useEffect, useState} from 'react';
import Hangul from 'korean-js/src/hangul';
import {useRouter} from 'next/navigation';

interface IProps {
  levelData: ILevel | null;
  letterList: ILetter[] | null;
  keyInputList: IKeyInput[];
  clearKeyInputData(): void;
  onSaveUserTypingData(data: IScoreData): void;
  isFinished: boolean;
  setIsFinished(boolean: boolean): void;
}
function ScoreBoard({
  levelData,
  letterList,
  keyInputList,
  clearKeyInputData,
  onSaveUserTypingData,
  isFinished,
  setIsFinished
}: IProps): JSX.Element {
  const [scoreData, setScoreData] = useState<IScoreData>({} as IScoreData);
  const [nextLevel, setNextLevel] = useState<ILevel>({} as ILevel);
  const router = useRouter();

  const calculate = useCallback(() => {
    if (!letterList || isFinished) return;
    if (!levelData) return;

    const typingList = Hangul.disassemble(levelData.text);
    // 단어 기준 오타율 계산 시 사용
    const inputList = letterList.reduce((acc: string[], curr: ILetter) => {
      if (curr.typingText) {
        acc = acc.concat(curr.typingText);
      }
      return acc;
    }, []);

    // 타자 시간 계산 부분
    // 총 나노초 공식 : totalNanoseconds = seconds * 10^9 + nanoseconds
    const startTime =
      (keyInputList[0].timestamp?.seconds as number) * 10 ** 9 + (keyInputList[0].timestamp?.nanoseconds as number);
    const lastTime =
      (keyInputList[keyInputList.length - 1].timestamp?.seconds as number) * 10 ** 9 +
      (keyInputList[keyInputList.length - 1].timestamp?.nanoseconds as number);
    const typingDuration = (lastTime - startTime) / 10 ** 9;

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
      speed: typingSpeed,
      duration: Math.floor(typingDuration),
      score: 0
    };
    setScoreData(data);
    onSaveUserTypingData(data);
  }, [letterList, isFinished, levelData, keyInputList, onSaveUserTypingData]);

  // const getNextLevelId = () => {
  //   const currentCategory = store.levelList.filter((item) => {
  //     return item.categoryId === store.level.categoryId;
  //   });
  //   const currentLevelIndex = currentCategory.findIndex((item) => {
  //     return item.id === store.level.id;
  //   });
  //   setNextLevel(currentCategory[currentLevelIndex + 1]);
  // };

  useEffect(() => {
    if (!levelData) return;
    if (letterList) {
      // 점수계산 및 서버에 저장 후 다음 행동 선택(목록 or 다음레벨)
      const currentCategory = JSON.parse(localStorage.getItem('levelList') as string).find(
        (item: ILevelInfo) => item.id === levelData.categoryId
      );
      const result = currentCategory.levels.find((item: ILevel) => item.order === levelData.order + 1);
      setNextLevel(result);
      calculate();
      setIsFinished(true);
    }
  }, [letterList, calculate, setIsFinished, levelData]);

  const onClickNextLevelBtn = (level: ILevel): void => {
    clearKeyInputData();
    router.push(`/levels/${level.id}`);
  };

  const onClickLevelListBtn = (): void => {
    clearKeyInputData();
    router.push('/levels');
  };

  if (!isFinished) {
    return <>계산 중</>;
  }

  return (
    <div>
      <span>Scoreboard is here!</span>
      <span>정확도 : {scoreData.accuracy}</span>
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
