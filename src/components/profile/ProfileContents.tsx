import {PropsWithChildren} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  & + div {
    border-top: 1px solid #ccc;
  }
`;

function ProfileContents({children}: PropsWithChildren): JSX.Element {
  return <Container>{children}</Container>;
}

export default ProfileContents;
