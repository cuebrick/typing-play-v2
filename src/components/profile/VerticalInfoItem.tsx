import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  align-items: center;
`;

const InfoTitle = styled.span`
  font-weight: 500;
`;

const InfoText = styled.span`
  font-size: 2em;
  font-weight: 300;
`;
const InfoUnit = styled.span`
  padding-left: 5px;
`;

interface IProps {
  title: string;
  data: number;
  unit: string;
}

function VerticalInfoItem({title, data, unit}: IProps): JSX.Element {
  return (
    <Container>
      <InfoTitle>{title}</InfoTitle>
      <span>
        <InfoText>{data}</InfoText>
        <InfoUnit>{unit}</InfoUnit>
      </span>
    </Container>
  );
}

export default VerticalInfoItem;
