'use client';

import {PropsWithChildren} from 'react';
import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 5px 1px rgba(0, 0, 0, 0.2);
`;

function DefaultLayoutHeader({children}: PropsWithChildren) {
  return <Container>{children}</Container>;
}

export default DefaultLayoutHeader;
