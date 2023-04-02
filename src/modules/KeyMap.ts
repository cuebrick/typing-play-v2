import {IKeyInput} from "interfaces/LevelInterface";


const mapData: { [key: string]: string } = {
  // KeyQ: {"enn": "q", "ens": "Q", "krn": "ㅂ", "krs": "ㅃ"},
  q: 'ㅂ',
  Q: 'ㅃ'
}

const KeyMap = {
  get(keyInput: IKeyInput): string {
    console.log('check >>', keyInput, mapData[keyInput.key])
    return mapData[keyInput.key]
  }
}
export default KeyMap;