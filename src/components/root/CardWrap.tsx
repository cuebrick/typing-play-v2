'use client';

import {PropsWithChildren} from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
`;

function CardWrap({children}: PropsWithChildren): JSX.Element {
  return <Container>{children}</Container>;
}

export default CardWrap;
