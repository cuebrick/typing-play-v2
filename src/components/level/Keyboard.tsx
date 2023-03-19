interface IProps {
  keyCode: number;
}

function Keyboard({keyCode}: IProps): JSX.Element {
  return (
    <div className="keyboard">
      keyboard layout here {keyCode}
    </div>
  );
}

export default Keyboard;
