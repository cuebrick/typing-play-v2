'use client';

import {PropsWithChildren} from 'react';
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../theme/theme';

function ProfileLayout({children}: PropsWithChildren): JSX.Element {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

export default ProfileLayout;
