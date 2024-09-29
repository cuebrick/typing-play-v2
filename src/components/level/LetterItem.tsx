import {useEffect, useRef, useState} from 'react';
import Hangul from 'korean-js/src/hangul';
import {ILetter} from 'interfaces/level-interface';
import clsx from 'clsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.4em;

  &.active .typing {
    animation-name: currentText;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes currentText {
    0% {
      border-color: rgba(220, 124, 181, 1);
    }
    50% {
      border-color: rgba(220, 124, 181, 0);
    }
    100% {
      border-color: rgba(220, 124, 181, 1);
    }
  }

  &.correct .token {
    background-color: #c4f2bd;
  }

  &.incorrect .token {
    background-color: #f8a1ab;
  }

  &.isModify .token {
    background-color: #ffd47e;
  }
`;

const Token = styled.span`
  color: #666;
  //min-width: 0.325em;
  width: 1em;
  flex-shrink: 1;
  flex-basis: 1.4em;
  border-radius: 5px;
`;

const Typing = styled.span`
  min-width: 0.325em;
  flex-shrink: 1;
  flex-basis: 1.4em;
  border-bottom: 2px solid transparent;
`;

/*const TypingLineHighlighter = styled.div`
  width: 550px;
  height: 50px;
  top: 62px;
  position: absolute;
  border: 2px solid #dc7cb5;
  border-radius: 5px;
  font-size: 32px;
  line-height: 46px;
  padding: 3px;
`;*/

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
    <Container
      className={clsx('letter-item', {active}, [
        {incorrect: correctTypo === 'incorrect'},
        {isModify: isModify && correctTypo === 'correct'},
        {correct: !isModify && correctTypo === 'correct'}
      ])}
    >
      <Token className="token">{assembledSampleText}</Token>
      <Typing className="typing">{assembledTypingText}</Typing>
    </Container>
  );
}

export default LetterItem;
