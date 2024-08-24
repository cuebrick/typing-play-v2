import clsx from 'clsx';
import {IKeyInput, IKeyData} from 'interfaces/LevelInterface';
import styled from 'styled-components';

const Container = styled.div``;

const Layout = styled.g`
  fill: #fff;

  rect {
    transition: fill 0.15s;

    &.next-key {
      fill: #dc7cb5;
    }

    &.pressed-key {
      fill: #96caff;
    }
  }
`;

const Letter = styled.g`
  fill: #000;
  line-height: 16px;

  .small-letter {
    font-size: 10px;
    font-weight: bold;
  }
`;

interface IProps {
  nextKey: IKeyData;
  keyInput: IKeyInput | null;
}

interface IKeyCap {
  code: string;
  keyCode: number;
  text: string;
  width?: number;
  height?: number;
  x: number;
  y: number;
}

function Keyboard({nextKey, keyInput}: IProps): JSX.Element {
  // todo: 타자 완료 시 keyInput 막기

  const keyCapData: IKeyCap[] = [
    {
      code: 'Backquote',
      keyCode: 192,
      text: '`',
      x: 10.5,
      y: 10.5
    },
    {
      code: 'Digit1',
      keyCode: 49,
      text: '1',
      x: 65.5,
      y: 10.5
    },
    {
      code: 'Digit2',
      keyCode: 50,
      text: '2',
      x: 120.5,
      y: 10.5
    },
    {
      code: 'Digit3',
      keyCode: 51,
      text: '3',
      x: 175.5,
      y: 10.5
    },
    {
      code: 'Digit4',
      keyCode: 52,
      text: '4',
      x: 230.5,
      y: 10.5
    },
    {
      code: 'Digit5',
      keyCode: 53,
      text: '5',
      x: 285.5,
      y: 10.5
    },
    {
      code: 'Digit6',
      keyCode: 54,
      text: '6',
      x: 340.5,
      y: 10.5
    },
    {
      code: 'Digit7',
      keyCode: 55,
      text: '7',
      x: 395.5,
      y: 10.5
    },
    {
      code: 'Digit8',
      keyCode: 56,
      text: '8',
      x: 450.5,
      y: 10.5
    },
    {
      code: 'Digit9',
      keyCode: 57,
      text: '9',
      x: 505.5,
      y: 10.5
    },
    {
      code: 'Digit0',
      keyCode: 48,
      text: '0',
      x: 560.5,
      y: 10.5
    },
    {
      code: 'Minus',
      keyCode: 189,
      text: '-',
      x: 615.5,
      y: 10.5
    },
    {
      code: 'Equal',
      keyCode: 187,
      text: '=',
      x: 670.5,
      y: 10.5
    },
    {
      code: 'Backspace',
      keyCode: 8,
      text: 'Backspace',
      x: 725.5,
      y: 10.5,
      width: 69
    },
    {
      code: 'Tab',
      keyCode: 9,
      text: 'Tab',
      x: 10.5,
      y: 63.5,
      width: 69
    },
    {
      code: 'KeyQ',
      keyCode: 81,
      text: 'q',
      x: 87.5,
      y: 63.5
    },
    {
      code: 'KeyW',
      keyCode: 87,
      text: 'w',
      x: 142.5,
      y: 63.5
    },
    {
      code: 'KeyE',
      keyCode: 69,
      text: 'e',
      x: 197.5,
      y: 63.5
    },
    {
      code: 'KeyR',
      keyCode: 82,
      text: 'r',
      x: 252.5,
      y: 63.5
    },
    {
      code: 'KeyT',
      keyCode: 84,
      text: 't',
      x: 307.5,
      y: 63.5
    },
    {
      code: 'KeyY',
      keyCode: 89,
      text: 'y',
      x: 362.5,
      y: 63.5
    },
    {
      code: 'KeyU',
      keyCode: 85,
      text: 'u',
      x: 417.5,
      y: 63.5
    },
    {
      code: 'KeyI',
      keyCode: 73,
      text: 'i',
      x: 472.5,
      y: 63.5
    },
    {
      code: 'KeyO',
      keyCode: 79,
      text: 'o',
      x: 527.5,
      y: 63.5
    },
    {
      code: 'KeyP',
      keyCode: 80,
      text: 'p',
      x: 582.5,
      y: 63.5
    },
    {
      code: 'BracketLeft',
      keyCode: 219,
      text: '[',
      x: 637.5,
      y: 63.5
    },
    {
      code: 'BracketRight',
      keyCode: 221,
      text: ']',
      x: 692.5,
      y: 63.5
    },
    {
      code: 'Backslash',
      keyCode: 220,
      text: '\\',
      x: 747.5,
      y: 63.5
    },
    {
      code: 'CapsLock',
      keyCode: 20,
      text: 'CapsLock',
      x: 10.5,
      y: 116.5,
      width: 82
    },
    {
      code: 'KeyA',
      keyCode: 80,
      text: 'a',
      x: 100.5,
      y: 116.5
    },
    {
      code: 'KeyS',
      keyCode: 83,
      text: 's',
      x: 155.5,
      y: 116.5
    },
    {
      code: 'KeyD',
      keyCode: 68,
      text: 'd',
      x: 210.5,
      y: 116.5
    },
    {
      code: 'KeyF',
      keyCode: 70,
      text: 'f',
      x: 265.5,
      y: 116.5
    },
    {
      code: 'KeyG',
      keyCode: 71,
      text: 'g',
      x: 320.5,
      y: 116.5
    },
    {
      code: 'KeyH',
      keyCode: 72,
      text: 'h',
      x: 375.5,
      y: 116.5
    },
    {
      code: 'KeyJ',
      keyCode: 74,
      text: 'j',
      x: 430.5,
      y: 116.5
    },
    {
      code: 'KeyK',
      keyCode: 75,
      text: 'k',
      x: 485.5,
      y: 116.5
    },
    {
      code: 'KeyL',
      keyCode: 76,
      text: 'l',
      x: 540.5,
      y: 116.5
    },
    {
      code: 'Semicolon',
      keyCode: 186,
      text: ';',
      x: 595.5,
      y: 116.5
    },
    {
      code: 'Quote',
      keyCode: 222,
      text: "'",
      x: 650.5,
      y: 116.5
    },
    {
      code: 'Enter',
      keyCode: 13,
      text: 'Enter',
      x: 705.5,
      y: 116.5,
      width: 89
    },
    {
      code: 'ShiftLeft',
      keyCode: 16,
      text: 'Shift',
      x: 10.5,
      y: 169.5,
      width: 114
    },
    {
      code: 'KeyZ',
      keyCode: 90,
      text: 'z',
      x: 132.5,
      y: 169.5
    },
    {
      code: 'KeyX',
      keyCode: 88,
      text: 'x',
      x: 187.5,
      y: 169.5
    },
    {
      code: 'KeyC',
      keyCode: 67,
      text: 'c',
      x: 242.5,
      y: 169.5
    },
    {
      code: 'KeyV',
      keyCode: 86,
      text: 'v',
      x: 297.5,
      y: 169.5
    },
    {
      code: 'KeyB',
      keyCode: 66,
      text: 'b',
      x: 352.5,
      y: 169.5
    },
    {
      code: 'KeyN',
      keyCode: 78,
      text: 'n',
      x: 407.5,
      y: 169.5
    },
    {
      code: 'KeyM',
      keyCode: 77,
      text: 'm',
      x: 462.5,
      y: 169.5
    },
    {
      code: 'Comma',
      keyCode: 188,
      text: ',',
      x: 517.5,
      y: 169.5
    },
    {
      code: 'Period',
      keyCode: 190,
      text: '.',
      x: 572.5,
      y: 169.5
    },
    {
      code: 'Slash',
      keyCode: 191,
      text: '/',
      x: 627.5,
      y: 169.5
    },
    {
      code: 'ShiftRight',
      keyCode: 16,
      text: 'Shift',
      x: 682.5,
      y: 169.5,
      width: 112
    },
    {
      code: 'ControlLeft',
      keyCode: 17,
      text: 'Control',
      x: 10.5,
      y: 222.5,
      width: 59
    },
    {
      code: 'AltLeft',
      keyCode: 18,
      text: 'Alt',
      x: 77.5,
      y: 222.5,
      width: 59
    },
    {
      code: 'Space',
      keyCode: 32,
      text: ' ',
      x: 144.5,
      y: 222.5,
      width: 516
    },
    {
      code: 'AltRight',
      keyCode: 21,
      text: 'HangulMode',
      x: 668.5,
      y: 222.5,
      width: 59
    },
    {
      code: 'ControlRight',
      keyCode: 25,
      text: 'HanjaMode',
      x: 735.5,
      y: 222.5,
      width: 59
    }
  ];

  return (
    <Container>
      <svg width="805" height="280" viewBox="0 0 805 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Layout>
          <rect width="805" height="280" rx="10" fill="white" />
          {keyCapData.map((item) => (
            <rect
              key={item.code}
              x={item.x}
              y={item.y}
              className={clsx({'next-key': item.text === nextKey.key, 'pressed-key': item.text === keyInput?.key})}
              width={item?.width || 47}
              height={item?.height || 47}
              rx="3.5"
              fill="white"
              stroke="#ACB0B8"
            />
          ))}
        </Layout>
        <Letter className="letter">
          <text transform="matrix(1, 0, 0, 1, 29.04, 23.93)" dx="0" dy="7">
            ~
          </text>
          <text transform="matrix(1, 0, 0, 1, 32.52, 33.45)" dx="0" dy="16">
            `
          </text>
          <text transform="matrix(1, 0, 0, 1, 86.98, 18.36)" dx="0" dy="12">
            !
          </text>
          <text transform="matrix(1, 0, 0, 1, 84.98, 38.36)" dx="0" dy="12">
            1
          </text>
          <text transform="matrix(1, 0, 0, 1, 135.28, 18.8)" dx="0" dy="12">
            @
          </text>
          <text transform="matrix(1, 0, 0, 1, 138.76, 38.2)" dx="0" dy="12">
            2
          </text>
          <text transform="matrix(1, 0, 0, 1, 193.93, 18.36)" dx="0" dy="12">
            #
          </text>
          <text transform="matrix(1, 0, 0, 1, 194.93, 38.2)" dx="0" dy="12">
            3
          </text>
          <text transform="matrix(1, 0, 0, 1, 249.31, 17.36)" dx="0" dy="12">
            $
          </text>
          <text transform="matrix(1, 0, 0, 1, 249.8, 38.2)" dx="0" dy="12">
            4
          </text>
          <text transform="matrix(1, 0, 0, 1, 301.84, 17.36)" dx="0" dy="12">
            %
          </text>
          <text transform="matrix(1, 0, 0, 1, 304.36, 38.2)" dx="0" dy="12">
            5
          </text>
          <text transform="matrix(1, 0, 0, 1, 358.89, 17.36)" dx="0" dy="12">
            ^
          </text>
          <text transform="matrix(1, 0, 0, 1, 359.36, 38.2)" dx="0" dy="12">
            6
          </text>
          <text transform="matrix(1, 0, 0, 1, 412.7, 17.86)" dx="0" dy="12">
            &
          </text>
          <text transform="matrix(1, 0, 0, 1, 414.8, 38.2)" dx="0" dy="12">
            7
          </text>
          <text transform="matrix(1, 0, 0, 1, 470.89, 18.16)" dx="0" dy="12">
            *
          </text>
          <text transform="matrix(1, 0, 0, 1, 469.8, 37.8)" dx="0" dy="12">
            8
          </text>
          <text transform="matrix(1, 0, 0, 1, 526.81, 18.06)" dx="0" dy="12">
            (
          </text>
          <text transform="matrix(1, 0, 0, 1, 524.8, 37.8)" dx="0" dy="12">
            9
          </text>
          <text transform="matrix(1, 0, 0, 1, 581.21, 18.06)" dx="0" dy="12">
            )
          </text>
          <text transform="matrix(1, 0, 0, 1, 579.8, 37.8)" dx="0" dy="12">
            0
          </text>
          <text transform="matrix(1, 0, 0, 1, 635.46, 18.06)" dx="0" dy="12">
            _
          </text>
          <text transform="matrix(1, 0, 0, 1, 635.36, 37.8)" dx="0" dy="12">
            -
          </text>
          <text transform="matrix(1, 0, 0, 1, 688.25, 18.06)" dx="0" dy="12">
            +
          </text>
          <text transform="matrix(1, 0, 0, 1, 688.5, 38.5)" dx="0" dy="12">
            =
          </text>
          <text transform="matrix(1, 0, 0, 1, 775.25, 18.06)" dx="0" dy="12">
            ←
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 739.5, 36.2)" dx="0" dy="12">
            Backspace
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 88.8)" dx="0" dy="12">
            Tab
          </text>
          <text transform="matrix(1, 0, 0, 1, 93.56, 71.1)" dx="0" dy="12">
            Q
          </text>
          <text transform="matrix(1, 0, 0, 1, 114.2, 71.1)" dx="0" dy="12">
            ㅃ
          </text>
          <text transform="matrix(1, 0, 0, 1, 114.2, 91.5)" dx="0" dy="12">
            ㅂ
          </text>
          <text transform="matrix(1, 0, 0, 1, 148.56, 71.1)" dx="0" dy="12">
            W
          </text>
          <text transform="matrix(1, 0, 0, 1, 169.8, 71.1)" dx="0" dy="12">
            ㅉ
          </text>
          <text transform="matrix(1, 0, 0, 1, 169.5, 91.5)" dx="0" dy="12">
            ㅈ
          </text>
          <text transform="matrix(1, 0, 0, 1, 206.56, 71.1)" dx="0" dy="12">
            E
          </text>
          <text transform="matrix(1, 0, 0, 1, 224.8, 71.1)" dx="0" dy="12">
            ㄸ
          </text>
          <text transform="matrix(1, 0, 0, 1, 223.9, 91.5)" dx="0" dy="12">
            ㄷ
          </text>
          <text transform="matrix(1, 0, 0, 1, 260.71, 71.1)" dx="0" dy="12">
            R
          </text>
          <text transform="matrix(1, 0, 0, 1, 278.8, 71.1)" dx="0" dy="12">
            ㄲ
          </text>
          <text transform="matrix(1, 0, 0, 1, 278.9, 91.5)" dx="0" dy="12">
            ㄱ
          </text>
          <text transform="matrix(1, 0, 0, 1, 317.11, 71.1)" dx="0" dy="12">
            T
          </text>
          <text transform="matrix(1, 0, 0, 1, 333.8, 71.1)" dx="0" dy="12">
            ㅆ
          </text>
          <text transform="matrix(1, 0, 0, 1, 334.2, 91.5)" dx="0" dy="12">
            ㅅ
          </text>
          <text transform="matrix(1, 0, 0, 1, 371.11, 71.1)" dx="0" dy="12">
            Y
          </text>
          <text transform="matrix(1, 0, 0, 1, 389.2, 90.2)" dx="0" dy="12">
            ㅛ
          </text>
          <text transform="matrix(1, 0, 0, 1, 425.41, 71.1)" dx="0" dy="12">
            U
          </text>
          <text transform="matrix(1, 0, 0, 1, 444.2, 90.2)" dx="0" dy="12">
            ㅕ
          </text>
          <text transform="matrix(1, 0, 0, 1, 483.41, 71.1)" dx="0" dy="12">
            I
          </text>
          <text transform="matrix(1, 0, 0, 1, 498.2, 90.5)" dx="0" dy="12">
            ㅑ
          </text>
          <text transform="matrix(1, 0, 0, 1, 534.41, 71.1)" dx="0" dy="12">
            O
          </text>
          <text transform="matrix(1, 0, 0, 1, 553.8, 71.1)" dx="0" dy="12">
            ㅒ
          </text>
          <text transform="matrix(1, 0, 0, 1, 553.9, 91.5)" dx="0" dy="12">
            ㅐ
          </text>
          <text transform="matrix(1, 0, 0, 1, 590.41, 71.1)" dx="0" dy="12">
            P
          </text>
          <text transform="matrix(1, 0, 0, 1, 608.8, 71.1)" dx="0" dy="12">
            ㅖ
          </text>
          <text transform="matrix(1, 0, 0, 1, 608.9, 91.5)" dx="0" dy="12">
            ㅔ
          </text>
          <text transform="matrix(1, 0, 0, 1, 658.21, 71.06)" dx="0" dy="12">
            &#123;
          </text>
          <text transform="matrix(1, 0, 0, 1, 658.8, 91.8)" dx="0" dy="12">
            [
          </text>
          <text transform="matrix(1, 0, 0, 1, 713.21, 71.06)" dx="0" dy="12">
            &#125;
          </text>
          <text transform="matrix(1, 0, 0, 1, 713.8, 91.8)" dx="0" dy="12">
            ]
          </text>
          <text transform="matrix(1, 0, 0, 1, 768.21, 71.06)" dx="0" dy="12">
            |
          </text>
          <text transform="matrix(1, 0, 0, 1, 763.8, 91.8)" dx="0" dy="12">
            \
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 141.8)" dx="0" dy="12">
            Caps Lock
          </text>
          <text transform="matrix(1, 0, 0, 1, 108.41, 124.1)" dx="0" dy="12">
            A
          </text>
          <text transform="matrix(1, 0, 0, 1, 126.2, 144.2)" dx="0" dy="12">
            ㅁ
          </text>
          <text transform="matrix(1, 0, 0, 1, 164.41, 124.1)" dx="0" dy="12">
            S
          </text>
          <text transform="matrix(1, 0, 0, 1, 182.2, 144.2)" dx="0" dy="12">
            ㄴ
          </text>
          <text transform="matrix(1, 0, 0, 1, 218.41, 124.1)" dx="0" dy="12">
            D
          </text>
          <text transform="matrix(1, 0, 0, 1, 237.2, 144.2)" dx="0" dy="12">
            ㅇ
          </text>
          <text transform="matrix(1, 0, 0, 1, 274.6, 124.1)" dx="0" dy="12">
            F
          </text>
          <text transform="matrix(1, 0, 0, 1, 292.2, 144.2)" dx="0" dy="12">
            ㄹ
          </text>
          <text transform="matrix(1, 0, 0, 1, 328.6, 124.1)" dx="0" dy="12">
            G
          </text>
          <text transform="matrix(1, 0, 0, 1, 346.1, 144.2)" dx="0" dy="12">
            ㅎ
          </text>
          <text transform="matrix(1, 0, 0, 1, 382.6, 124.1)" dx="0" dy="12">
            H
          </text>
          <text transform="matrix(1, 0, 0, 1, 401.1, 142.4)" dx="0" dy="12">
            ㅗ
          </text>
          <text transform="matrix(1, 0, 0, 1, 442.6, 124.1)" dx="0" dy="12">
            J
          </text>
          <text transform="matrix(1, 0, 0, 1, 457.1, 142.4)" dx="0" dy="12">
            ㅓ
          </text>
          <text transform="matrix(1, 0, 0, 1, 494.6, 124.1)" dx="0" dy="12">
            K
          </text>
          <text transform="matrix(1, 0, 0, 1, 510.7, 142.4)" dx="0" dy="12">
            ㅏ
          </text>
          <text transform="matrix(1, 0, 0, 1, 548.6, 124.1)" dx="0" dy="12">
            L
          </text>
          <text transform="matrix(1, 0, 0, 1, 567.7, 142.4)" dx="0" dy="12">
            ㅣ
          </text>
          <text transform="matrix(1, 0, 0, 1, 616.21, 123.71)" dx="0" dy="12">
            :
          </text>
          <text transform="matrix(1, 0, 0, 1, 616.8, 142.8)" dx="0" dy="12">
            ;
          </text>
          <text transform="matrix(1, 0, 0, 1, 669.81, 123.71)" dx="0" dy="12">
            "
          </text>
          <text transform="matrix(1, 0, 0, 1, 671.8, 142.8)" dx="0" dy="12">
            '
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 765.5, 142.4)" dx="0" dy="12">
            Enter
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 194.8)" dx="0" dy="12">
            Shift
          </text>
          <text transform="matrix(1, 0, 0, 1, 140.9, 175.8)" dx="0" dy="12">
            Z
          </text>
          <text transform="matrix(1, 0, 0, 1, 158.1, 195.4)" dx="0" dy="12">
            ㅋ
          </text>
          <text transform="matrix(1, 0, 0, 1, 195.9, 175.8)" dx="0" dy="12">
            X
          </text>
          <text transform="matrix(1, 0, 0, 1, 214.1, 196.4)" dx="0" dy="12">
            ㅌ
          </text>
          <text transform="matrix(1, 0, 0, 1, 250.3, 176.3)" dx="0" dy="12">
            C
          </text>
          <text transform="matrix(1, 0, 0, 1, 268.1, 196.1)" dx="0" dy="12">
            ㅊ
          </text>
          <text transform="matrix(1, 0, 0, 1, 306.1, 176.3)" dx="0" dy="12">
            V
          </text>
          <text transform="matrix(1, 0, 0, 1, 324.1, 195.1)" dx="0" dy="12">
            ㅍ
          </text>
          <text transform="matrix(1, 0, 0, 1, 361.1, 177.3)" dx="0" dy="12">
            B
          </text>
          <text transform="matrix(1, 0, 0, 1, 378.1, 195.1)" dx="0" dy="12">
            ㅠ
          </text>
          <text transform="matrix(1, 0, 0, 1, 414.6, 177.3)" dx="0" dy="12">
            N
          </text>
          <text transform="matrix(1, 0, 0, 1, 434.1, 196.1)" dx="0" dy="12">
            ㅜ
          </text>
          <text transform="matrix(1, 0, 0, 1, 468.6, 177.3)" dx="0" dy="12">
            M
          </text>
          <text transform="matrix(1, 0, 0, 1, 488.1, 196.1)" dx="0" dy="12">
            ㅡ
          </text>
          <text transform="matrix(1, 0, 0, 1, 535.81, 176.71)" dx="0" dy="12">
            &lt;
          </text>
          <text transform="matrix(1, 0, 0, 1, 538.8, 196.8)" dx="0" dy="12">
            ,
          </text>
          <text transform="matrix(1, 0, 0, 1, 590.81, 176.71)" dx="0" dy="12">
            &gt;
          </text>
          <text transform="matrix(1, 0, 0, 1, 594.8, 196.8)" dx="0" dy="12">
            .
          </text>
          <text transform="matrix(1, 0, 0, 1, 646.71, 176.71)" dx="0" dy="12">
            ?
          </text>
          <text transform="matrix(1, 0, 0, 1, 647.8, 196.8)" dx="0" dy="12">
            /
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 767.4, 194.8)" dx="0" dy="12">
            Shift
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 247.8)" dx="0" dy="12">
            Ctrl
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 80.48, 247.8)" dx="0" dy="12">
            Alt
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 710.48, 247.8)" dx="0" dy="12">
            Alt
          </text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 772.48, 247.8)" dx="0" dy="12">
            Ctrl
          </text>
        </Letter>
      </svg>
    </Container>
  );
}

export default Keyboard;
