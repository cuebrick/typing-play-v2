interface IProps {
  text: string;
}

function TypingStage({text}: IProps): JSX.Element {
  return (
    <div className="typing-stage">{text}</div>
  );
}

export default TypingStage;
