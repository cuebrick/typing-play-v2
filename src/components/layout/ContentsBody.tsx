'use client';

import {PropsWithChildren} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 80px);
`;

function ContentsBody({children}: PropsWithChildren) {
  return <Container>{children}</Container>;
}

export default ContentsBody;
