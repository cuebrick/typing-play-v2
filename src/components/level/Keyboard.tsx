import {useEffect} from "react";

interface IProps {
  keyCode: number;
  keyCap: string;
  isShift: boolean;
}

function Keyboard({keyCode, keyCap, isShift}: IProps): JSX.Element {

  useEffect(() => {
    if (keyCap) {
      let elements = Array.from(document.querySelectorAll('[data-key]'))
      elements.map((element) => {
        if ((element as HTMLElement).dataset.key === keyCap) {
          element.classList.add("next-key")
        } else {
          element.classList.remove("next-key")
        }
      })
    }
  }, [keyCap])

  let isShiftKey = isShift ? "next-key" : '';

  return (
    <div className="keyboard">
      <svg width="805" height="280" viewBox="0 0 805 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="layout">
          <rect width="805" height="280" rx="10" fill="white"/>
          <rect data-key="`" data-key-code={192} x="10.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="1" data-key-code={49} x="65.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="2" data-key-code={50} x="120.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="3" data-key-code={51} x="175.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="4" data-key-code={52} x="230.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="5" data-key-code={53} x="285.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="6" data-key-code={54} x="340.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="7" data-key-code={55} x="395.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="8" data-key-code={56} x="450.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="9" data-key-code={57} x="505.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="0" data-key-code={48} x="560.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="-" data-key-code={189} x="615.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="=" data-key-code={187} x="670.5" y="10.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="Backspace" data-key-code={8} x="725.5" y="10.5" width="69" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>

          <rect data-key="Tab" data-key-code={9} x="10.5" y="63.5" width="69" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="q" data-key-code={81} x="87.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="w" data-key-code={87} x="142.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="e" data-key-code={69} x="197.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="r" data-key-code={82} x="252.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="t" data-key-code={84} x="307.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="y" data-key-code={89} x="362.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="u" data-key-code={85} x="417.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="i" data-key-code={73} x="472.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="o" data-key-code={79} x="527.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="p" data-key-code={80} x="582.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="[" data-key-code={219} x="637.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="]" data-key-code={221} x="692.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="\\" data-key-code={220} x="747.5" y="63.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>

          <rect data-key="CapsLock" data-key-code={20} x="10.5" y="116.5" width="82" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="a" data-key-code={65} x="100.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="s" data-key-code={83} x="155.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="d" data-key-code={68} x="210.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="f" data-key-code={70} x="265.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="g" data-key-code={71} x="320.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="h" data-key-code={72} x="375.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="j" data-key-code={74} x="430.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="k" data-key-code={75} x="485.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="l" data-key-code={76} x="540.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key=";" data-key-code={186} x="595.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="'" data-key-code={222} x="650.5" y="116.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="Enter" data-key-code={13} x="705.5" y="116.5" width="89" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>

          <rect data-key="Shift" data-key-code={16} className={isShiftKey} x="10.5" y="169.5" width="114" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="z" data-key-code={90} x="132.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="x" data-key-code={88} x="187.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="c" data-key-code={67} x="242.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="v" data-key-code={86} x="297.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="b" data-key-code={66} x="352.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="n" data-key-code={78} x="407.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="m" data-key-code={77} x="462.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="," data-key-code={188} x="517.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="." data-key-code={190} x="572.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="/" data-key-code={191} x="627.5" y="169.5" width="47" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="Shift" data-key-code={16} className={isShiftKey} x="682.5" y="169.5" width="112" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>

          <rect data-key="Control" data-key-code={17} x="10.5" y="222.5" width="59" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="Alt" data-key-code={18} x="77.5" y="222.5" width="59" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key=" " data-key-code={32} x="144.5" y="222.5" width="516" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="HangulMode" data-key-code={21} x="668.5" y="222.5" width="59" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
          <rect data-key="HanjaMode" data-key-code={25} x="735.5" y="222.5" width="59" height="47" rx="3.5" fill="white" stroke="#ACB0B8"/>
        </g>
        <g className="letter">
          <text transform="matrix(1, 0, 0, 1, 29.04, 23.93)" dx="0" dy="7">~</text>
          <text transform="matrix(1, 0, 0, 1, 32.52, 33.45)" dx="0" dy="16">`</text>
          <text transform="matrix(1, 0, 0, 1, 86.98, 18.36)" dx="0" dy="12">!</text>
          <text transform="matrix(1, 0, 0, 1, 84.98, 38.36)" dx="0" dy="12">1</text>
          <text transform="matrix(1, 0, 0, 1, 135.28, 18.8)" dx="0" dy="12">@</text>
          <text transform="matrix(1, 0, 0, 1, 138.76, 38.2)" dx="0" dy="12">2</text>
          <text transform="matrix(1, 0, 0, 1, 193.93, 18.36)" dx="0" dy="12">#</text>
          <text transform="matrix(1, 0, 0, 1, 194.93, 38.2)" dx="0" dy="12">3</text>
          <text transform="matrix(1, 0, 0, 1, 249.31, 17.36)" dx="0" dy="12">$</text>
          <text transform="matrix(1, 0, 0, 1, 249.8, 38.2)" dx="0" dy="12">4</text>
          <text transform="matrix(1, 0, 0, 1, 301.84, 17.36)" dx="0" dy="12">%</text>
          <text transform="matrix(1, 0, 0, 1, 304.36, 38.2)" dx="0" dy="12">5</text>
          <text transform="matrix(1, 0, 0, 1, 358.89, 17.36)" dx="0" dy="12">^</text>
          <text transform="matrix(1, 0, 0, 1, 359.36, 38.2)" dx="0" dy="12">6</text>
          <text transform="matrix(1, 0, 0, 1, 412.7, 17.86)" dx="0" dy="12">&</text>
          <text transform="matrix(1, 0, 0, 1, 414.8, 38.2)" dx="0" dy="12">7</text>
          <text transform="matrix(1, 0, 0, 1, 470.89, 18.16)" dx="0" dy="12">*</text>
          <text transform="matrix(1, 0, 0, 1, 469.8, 37.8)" dx="0" dy="12">8</text>
          <text transform="matrix(1, 0, 0, 1, 526.81, 18.06)" dx="0" dy="12">(</text>
          <text transform="matrix(1, 0, 0, 1, 524.8, 37.8)" dx="0" dy="12">9</text>
          <text transform="matrix(1, 0, 0, 1, 581.21, 18.06)" dx="0" dy="12">)</text>
          <text transform="matrix(1, 0, 0, 1, 579.8, 37.8)" dx="0" dy="12">0</text>
          <text transform="matrix(1, 0, 0, 1, 635.46, 18.06)" dx="0" dy="12">_</text>
          <text transform="matrix(1, 0, 0, 1, 635.36, 37.8)" dx="0" dy="12">-</text>
          <text transform="matrix(1, 0, 0, 1, 688.25, 18.06)" dx="0" dy="12">+</text>
          <text transform="matrix(1, 0, 0, 1, 688.5, 38.5)" dx="0" dy="12">=</text>
          <text transform="matrix(1, 0, 0, 1, 775.25, 18.06)" dx="0" dy="12">←</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 739.5, 36.2)" dx="0" dy="12">Backspace</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 88.8)" dx="0" dy="12">Tab</text>
          <text transform="matrix(1, 0, 0, 1, 93.56, 71.1)" dx="0" dy="12">Q</text>
          <text transform="matrix(1, 0, 0, 1, 114.2, 71.1)" dx="0" dy="12">ㅃ</text>
          <text transform="matrix(1, 0, 0, 1, 114.2, 91.5)" dx="0" dy="12">ㅂ</text>
          <text transform="matrix(1, 0, 0, 1, 148.56, 71.1)" dx="0" dy="12">W</text>
          <text transform="matrix(1, 0, 0, 1, 169.8, 71.1)" dx="0" dy="12">ㅉ</text>
          <text transform="matrix(1, 0, 0, 1, 169.5, 91.5)" dx="0" dy="12">ㅈ</text>
          <text transform="matrix(1, 0, 0, 1, 206.56, 71.1)" dx="0" dy="12">E</text>
          <text transform="matrix(1, 0, 0, 1, 224.8, 71.1)" dx="0" dy="12">ㄸ</text>
          <text transform="matrix(1, 0, 0, 1, 223.9, 91.5)" dx="0" dy="12">ㄷ</text>
          <text transform="matrix(1, 0, 0, 1, 260.71, 71.1)" dx="0" dy="12">R</text>
          <text transform="matrix(1, 0, 0, 1, 278.8, 71.1)" dx="0" dy="12">ㄲ</text>
          <text transform="matrix(1, 0, 0, 1, 278.9, 91.5)" dx="0" dy="12">ㄱ</text>
          <text transform="matrix(1, 0, 0, 1, 317.11, 71.1)" dx="0" dy="12">T</text>
          <text transform="matrix(1, 0, 0, 1, 333.8, 71.1)" dx="0" dy="12">ㅆ</text>
          <text transform="matrix(1, 0, 0, 1, 334.2, 91.5)" dx="0" dy="12">ㅅ</text>
          <text transform="matrix(1, 0, 0, 1, 371.11, 71.1)" dx="0" dy="12">Y</text>
          <text transform="matrix(1, 0, 0, 1, 389.2, 90.2)" dx="0" dy="12">ㅛ</text>
          <text transform="matrix(1, 0, 0, 1, 425.41, 71.1)" dx="0" dy="12">U</text>
          <text transform="matrix(1, 0, 0, 1, 444.2, 90.2)" dx="0" dy="12">ㅕ</text>
          <text transform="matrix(1, 0, 0, 1, 483.41, 71.1)" dx="0" dy="12">I</text>
          <text transform="matrix(1, 0, 0, 1, 498.2, 90.5)" dx="0" dy="12">ㅑ</text>
          <text transform="matrix(1, 0, 0, 1, 534.41, 71.1)" dx="0" dy="12">O</text>
          <text transform="matrix(1, 0, 0, 1, 553.8, 71.1)" dx="0" dy="12">ㅒ</text>
          <text transform="matrix(1, 0, 0, 1, 553.9, 91.5)" dx="0" dy="12">ㅐ</text>
          <text transform="matrix(1, 0, 0, 1, 590.41, 71.1)" dx="0" dy="12">P</text>
          <text transform="matrix(1, 0, 0, 1, 608.8, 71.1)" dx="0" dy="12">ㅖ</text>
          <text transform="matrix(1, 0, 0, 1, 608.9, 91.5)" dx="0" dy="12">ㅔ</text>
          <text transform="matrix(1, 0, 0, 1, 658.21, 71.06)" dx="0" dy="12">&#123;</text>
          <text transform="matrix(1, 0, 0, 1, 658.8, 91.8)" dx="0" dy="12">[</text>
          <text transform="matrix(1, 0, 0, 1, 713.21, 71.06)" dx="0" dy="12">&#125;</text>
          <text transform="matrix(1, 0, 0, 1, 713.8, 91.8)" dx="0" dy="12">]</text>
          <text transform="matrix(1, 0, 0, 1, 768.21, 71.06)" dx="0" dy="12">|</text>
          <text transform="matrix(1, 0, 0, 1, 763.8, 91.8)" dx="0" dy="12">\</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 141.8)" dx="0" dy="12">Caps Lock</text>
          <text transform="matrix(1, 0, 0, 1, 108.41, 124.1)" dx="0" dy="12">A</text>
          <text transform="matrix(1, 0, 0, 1, 126.2, 144.2)" dx="0" dy="12">ㅁ</text>
          <text transform="matrix(1, 0, 0, 1, 164.41, 124.1)" dx="0" dy="12">S</text>
          <text transform="matrix(1, 0, 0, 1, 182.2, 144.2)" dx="0" dy="12">ㄴ</text>
          <text transform="matrix(1, 0, 0, 1, 218.41, 124.1)" dx="0" dy="12">D</text>
          <text transform="matrix(1, 0, 0, 1, 237.2, 144.2)" dx="0" dy="12">ㅇ</text>
          <text transform="matrix(1, 0, 0, 1, 274.6, 124.1)" dx="0" dy="12">F</text>
          <text transform="matrix(1, 0, 0, 1, 292.2, 144.2)" dx="0" dy="12">ㄹ</text>
          <text transform="matrix(1, 0, 0, 1, 328.6, 124.1)" dx="0" dy="12">G</text>
          <text transform="matrix(1, 0, 0, 1, 346.1, 144.2)" dx="0" dy="12">ㅎ</text>
          <text transform="matrix(1, 0, 0, 1, 382.6, 124.1)" dx="0" dy="12">H</text>
          <text transform="matrix(1, 0, 0, 1, 401.1, 142.4)" dx="0" dy="12">ㅗ</text>
          <text transform="matrix(1, 0, 0, 1, 442.6, 124.1)" dx="0" dy="12">J</text>
          <text transform="matrix(1, 0, 0, 1, 457.1, 142.4)" dx="0" dy="12">ㅓ</text>
          <text transform="matrix(1, 0, 0, 1, 494.6, 124.1)" dx="0" dy="12">K</text>
          <text transform="matrix(1, 0, 0, 1, 510.7, 142.4)" dx="0" dy="12">ㅏ</text>
          <text transform="matrix(1, 0, 0, 1, 548.6, 124.1)" dx="0" dy="12">L</text>
          <text transform="matrix(1, 0, 0, 1, 567.7, 142.4)" dx="0" dy="12">ㅣ</text>
          <text transform="matrix(1, 0, 0, 1, 616.21, 123.71)" dx="0" dy="12">:</text>
          <text transform="matrix(1, 0, 0, 1, 616.8, 142.8)" dx="0" dy="12">;</text>
          <text transform="matrix(1, 0, 0, 1, 669.81, 123.71)" dx="0" dy="12">"</text>
          <text transform="matrix(1, 0, 0, 1, 671.8, 142.8)" dx="0" dy="12">'</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 765.5, 142.4)" dx="0" dy="12">Enter</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 194.8)" dx="0" dy="12">Shift</text>
          <text transform="matrix(1, 0, 0, 1, 140.9, 175.8)" dx="0" dy="12">Z</text>
          <text transform="matrix(1, 0, 0, 1, 158.1, 195.4)" dx="0" dy="12">ㅋ</text>
          <text transform="matrix(1, 0, 0, 1, 195.9, 175.8)" dx="0" dy="12">X</text>
          <text transform="matrix(1, 0, 0, 1, 214.1, 196.4)" dx="0" dy="12">ㅌ</text>
          <text transform="matrix(1, 0, 0, 1, 250.3, 176.3)" dx="0" dy="12">C</text>
          <text transform="matrix(1, 0, 0, 1, 268.1, 196.1)" dx="0" dy="12">ㅊ</text>
          <text transform="matrix(1, 0, 0, 1, 306.1, 176.3)" dx="0" dy="12">V</text>
          <text transform="matrix(1, 0, 0, 1, 324.1, 195.1)" dx="0" dy="12">ㅍ</text>
          <text transform="matrix(1, 0, 0, 1, 361.1, 177.3)" dx="0" dy="12">B</text>
          <text transform="matrix(1, 0, 0, 1, 378.1, 195.1)" dx="0" dy="12">ㅠ</text>
          <text transform="matrix(1, 0, 0, 1, 414.6, 177.3)" dx="0" dy="12">N</text>
          <text transform="matrix(1, 0, 0, 1, 434.1, 196.1)" dx="0" dy="12">ㅜ</text>
          <text transform="matrix(1, 0, 0, 1, 468.6, 177.3)" dx="0" dy="12">M</text>
          <text transform="matrix(1, 0, 0, 1, 488.1, 196.1)" dx="0" dy="12">ㅡ</text>
          <text transform="matrix(1, 0, 0, 1, 535.81, 176.71)" dx="0" dy="12">&lt;</text>
          <text transform="matrix(1, 0, 0, 1, 538.8, 196.8)" dx="0" dy="12">,</text>
          <text transform="matrix(1, 0, 0, 1, 590.81, 176.71)" dx="0" dy="12">&gt;</text>
          <text transform="matrix(1, 0, 0, 1, 594.8, 196.8)" dx="0" dy="12">.</text>
          <text transform="matrix(1, 0, 0, 1, 646.71, 176.71)" dx="0" dy="12">?</text>
          <text transform="matrix(1, 0, 0, 1, 647.8, 196.8)" dx="0" dy="12">/</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 767.4, 194.8)" dx="0" dy="12">Shift</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 15.48, 247.8)" dx="0" dy="12">Ctrl</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 80.48, 247.8)" dx="0" dy="12">Alt</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 710.48, 247.8)" dx="0" dy="12">Alt</text>
          <text className="small-letter" transform="matrix(1, 0, 0, 1, 772.48, 247.8)" dx="0" dy="12">Ctrl</text>
        </g>
      </svg>
    </div>
  );
}

export default Keyboard;
