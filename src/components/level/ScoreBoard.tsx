import {IKeyInput, ILetter} from 'interfaces/LevelInterface';
import {useCallback, useContext, useEffect} from 'react';
import {LevelContext} from 'store/LevelContext';
import Hangul from 'korean-js/types/hangul';

interface IProps {
  letterList: ILetter[] | null;
  keyInputList: IKeyInput[];
}
function ScoreBoard({letterList, keyInputList}: IProps): JSX.Element {
  const store = useContext(LevelContext);
  const calculate = useCallback(() => {
    if (!letterList) return;

    // 분당 타수 계산 => 타자수 * 60 / 걸린시간
    const typingList = Hangul.disassemble(store.level.text);
    // ['ㄱ', 'ㅏ']
    const inputList = letterList.reduce((acc: string[], curr: ILetter) => {
      if (curr.typingText) {
        acc = acc.concat(curr.typingText);
      }
      return acc;
    }, []);

    // 오타율 계산
  }, [letterList, keyInputList, store]);

  useEffect(() => {
    if (letterList) {
      // 점수계산 및 서버에 저장 후 다음 행동 선택(목록 or 다음레벨)
      calculate();
    }
  }, [letterList, calculate]);

  return <div>some</div>;
}
export default ScoreBoard;
