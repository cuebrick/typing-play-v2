import {PropsWithChildren} from 'react';
import styled from 'styled-components';

const Container = styled.div<{$justifyContents?: string}>`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => props.$justifyContents};
`;

const RowTitle = styled.span`
  padding-right: 10px;
  font-weight: 500;
  color: ${({theme}) => theme.presets.light.gray};
`;

interface IProps {
  title?: string;
  justifyContents?: string;
}

function ProfileRow({children, title, justifyContents}: PropsWithChildren<IProps>): JSX.Element {
  return (
    <Container $justifyContents={justifyContents}>
      {title && <RowTitle>{title}</RowTitle>}
      {children}
    </Container>
  );
}

export default ProfileRow;
