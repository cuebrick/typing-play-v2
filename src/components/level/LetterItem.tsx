import {useEffect, useState} from 'react';
import Hangul from 'korean-js/src/hangul';
import {ILetter} from 'interfaces/LevelInterface';

function LetterItem({sampleText, typingText}: ILetter): JSX.Element {
  const [assembledSampleText, setAssembledSampleText] = useState<string>();
  const [assembledTypingText, setAssembledTypingText] = useState<string>();

  useEffect(() => {
    if (sampleText) {
      const assembled = Hangul.assemble(sampleText as string[]);
      setAssembledSampleText(assembled);
    }
  }, [sampleText]);

  useEffect(() => {
    if (typingText) {
      const assembled = Hangul.assemble(typingText as string[]);
      setAssembledTypingText(assembled);
    }
  }, [typingText]);

  // todo:

  return (
    <div className="letter-item">
      <span className="token">{assembledSampleText}</span>
      <span className="typing">{assembledTypingText}</span>
    </div>
  );
}

export default LetterItem;
