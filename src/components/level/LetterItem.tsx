import {useEffect, useState} from 'react';
import Hangul from 'korean-js/src/hangul';
import {ILetter} from 'interfaces/LevelInterface';

interface IProps {
  data: ILetter;
}

function LetterItem({data}: IProps): JSX.Element {
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
    }
  }, [data.typingText]);

  // todo:

  return (
    <div className="letter-item">
      <span className="token">{assembledSampleText}</span>
      <span className="typing">{assembledTypingText}</span>
    </div>
  );
}

export default LetterItem;
