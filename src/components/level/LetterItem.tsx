import {useEffect, useRef, useState} from 'react';
import Hangul from 'korean-js/src/hangul';
import {ILetter} from 'interfaces/LevelInterface';
import clsx from 'clsx';

interface IProps {
  data: ILetter;
  active: boolean;
  isModify: boolean;
  itemIndex: number;
  currentIndex: number;
}

function LetterItem({data, active, isModify, itemIndex, currentIndex}: IProps): JSX.Element {
  const [assembledSampleText, setAssembledSampleText] = useState<string>();
  const [assembledTypingText, setAssembledTypingText] = useState<string>();
  const [correctTypo, setCorrectTypo] = useState<string>();
  const isReadyRef = useRef(false);

  useEffect(() => {
    if (data.sampleText) {
      const assembled = Hangul.assemble(data.sampleText as string[]);
      setAssembledSampleText(assembled);
    }
  }, [data.sampleText]);

  useEffect(() => {
    if (data.typingText) {
      const assembled = Hangul.assemble(data.typingText as string[]);
      setAssembledTypingText(assembled);
    } else {
      // 빈 텍스트는 undefined라 else에서 빈 string으로 초기화
      setAssembledTypingText('');
    }
  }, [data, data.typingText, active, data.sampleText, isModify]);

  useEffect(() => {
    if (itemIndex === currentIndex || itemIndex === currentIndex - 1) {
      // todo: 모종의 이유로 -1을 넣었으나 해당 이유 까먹음.
      isReadyRef.current = true;
    }
    if (isReadyRef && itemIndex !== currentIndex) {
      isReadyRef.current = false;
      const result = JSON.stringify(data.sampleText) === JSON.stringify(data.typingText) ? 'correct' : 'incorrect';
      if (data.typingText?.length || isModify) {
        // 자소 지우기                 // 글자 지우기 (글자 지울 시 isModify = true가 꼭 들어감)
        setCorrectTypo(result);
      }
    }
  }, [currentIndex, itemIndex]);

  return (
    <div
      className={clsx('letter-item', {active}, [
        {incorrect: correctTypo === 'incorrect'},
        {isModify: isModify && correctTypo === 'correct'},
        {correct: !isModify && correctTypo === 'correct'}
      ])}
    >
      <span className="token">{assembledSampleText}</span>
      <span className="typing">{assembledTypingText}</span>
    </div>
  );
}

export default LetterItem;
