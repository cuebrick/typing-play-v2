'use client';

import {useContext} from 'react';
import {CommonContext} from 'store/CommonContext';
import {observer} from 'mobx-react-lite';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column-reverse;
  gap: 15px;
`;
const ModelessItem = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);

  span {
    padding: 10px;
    line-height: 1.6em;
    word-break: keep-all;
  }
`;
const BtnClose = styled.button`
  width: 40px;
  height: 50px;
  padding: 10px;
  display: inline-block;
  border: none;
  color: #666;
  font-size: 22px;
  line-height: 30px;
  background-color: transparent;
  cursor: pointer;
  margin-left: auto;
`;

function Modeless(): JSX.Element {
  const commonStore = useContext(CommonContext);

  return (
    <Container>
      {commonStore.modeless.map((item) => (
        <ModelessItem key={item.id}>
          <span>{item.text}</span>
          <BtnClose onClick={() => commonStore.removeModeless(item.id)}>×</BtnClose>
        </ModelessItem>
      ))}
      {/*       <button
        onClick={() => {
          commonStore.addModeless(`hello ${Math.random()}`);
          console.log('in page >>', commonStore.modeless);
        }}
        className="add-modeless"
      >
        add
      </button> */}
    </Container>
  );
}

export default observer(Modeless);
