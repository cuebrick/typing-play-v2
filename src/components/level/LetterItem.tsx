import {useEffect, useState} from 'react';
import Hangul from 'korean-js/src/hangul';
import {ILetter} from 'interfaces/LevelInterface';
import clsx from 'clsx';

interface IProps {
  data: ILetter;
  active: boolean;
}

function LetterItem({data, active}: IProps): JSX.Element {
  const [assembledSampleText, setAssembledSampleText] = useState<string>();
  const [assembledTypingText, setAssembledTypingText] = useState<string>();
  const [correctTypo, setCorrectTypo] = useState<string>();

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
      // undefined로 내려와서 else로 state 초기화
      setAssembledTypingText('');
    }
    const result = JSON.stringify(data.sampleText) === JSON.stringify(data.typingText) ? 'correct' : 'incorrect';
    if (data.typingText?.length || (data.typingText?.length && !active)) {
      setCorrectTypo(result);
    }
  }, [data.typingText, active, data.sampleText]);

  // todo:

  return (
    <div
      className={clsx('letter-item', {active}, [
        {incorrect: correctTypo === 'incorrect'},
        {isModify: data.isModify && correctTypo === 'correct'},
        {correct: !data.isModify && correctTypo === 'correct'}
      ])}
    >
      <span className="token">{assembledSampleText}</span>
      <span className="typing">{assembledTypingText}</span>
    </div>
  );
}

export default LetterItem;
