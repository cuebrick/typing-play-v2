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
  }, [data.typingText]);

  // todo:

  return (
    <div className={clsx('letter-item', {active})}>
      <span className="token">{assembledSampleText}</span>
      <span className="typing">{assembledTypingText}</span>
    </div>
  );
}

export default LetterItem;
