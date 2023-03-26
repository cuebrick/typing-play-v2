import {useEffect, useState} from "react";
import Hangul from "korean-js/src/hangul";

interface IProps {
  letter: any;
}

function LetterItem({letter}: IProps): JSX.Element {

  const [assembledText, setAssembledText] = useState<any>()
  useEffect(() => {
    if (letter) {
      let assembled = Hangul.assemble(letter)
      console.log('assembled >>', assembled)
      setAssembledText(assembled)
    }
  }, letter)

  return (
      <span className="token">{assembledText}</span>
  )
}

export default LetterItem