import {createGlobalStyle} from 'styled-components';
import {defaultTheme} from '../../theme/theme';

export const GlobalStyle = createGlobalStyle`
  // reset
  body, p {
      margin: 0;
  }

  div, header {
      box-sizing: border-box;
  }

  // base style
  body {
      background-color: ${defaultTheme.presets.light.background};
      font-size: ${defaultTheme.fonts.size};
  }

  input[type=text],
  input[type=password],
  textarea,
  select {
      font-size: ${defaultTheme.fonts.size};
  }

  input, textarea, select {
      outline: none;
  }
`;
