import styled from 'styled-components';

const Container = styled.div`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  background-color: red;
`;

function TrophyBadge(): JSX.Element {
  return <Container>badge</Container>;
}
export default TrophyBadge;
