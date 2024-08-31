import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
`;
const CardHeader = styled.div``;
const CardBody = styled.div``;

function CardItem({title, children, width, height}: any): JSX.Element {
  return (
    <Container style={{width, height}}>
      <CardHeader>{title}</CardHeader>
      <CardBody>{children}</CardBody>
    </Container>
  );
}

export default CardItem;
