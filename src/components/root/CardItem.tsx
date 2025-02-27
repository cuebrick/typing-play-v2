'use client';

import styled from 'styled-components';
import {PropsWithChildren} from 'react';

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
`;
const CardHeader = styled.div``;
const CardBody = styled.div``;

interface IProps {
  title: string;
  width: number;
  height: number;
}

function CardItem({title, children, width, height}: PropsWithChildren<IProps>): JSX.Element {
  return (
    <Container style={{width, height}}>
      <CardHeader>{title}</CardHeader>
      <CardBody>{children}</CardBody>
    </Container>
  );
}

export default CardItem;
