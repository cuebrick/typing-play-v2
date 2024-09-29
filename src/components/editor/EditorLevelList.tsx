import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {EditorContext} from 'store/EditorContext';
import {ILevel} from 'interfaces/level-interface';
import {defaultLevelData} from 'default-objects/Level';
import EditorLevelItem from 'components/editor/EditorLevelItem';
import {ICategory} from 'interfaces/category-interface';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  flex-shrink: 0;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;
const LevelList = styled.div``;

interface IProps {
  categoryData: ICategory | null;
  selectedLevel: ILevel;

  onSelect(levelData: ILevel): void;
}

function EditorLevelList({categoryData, selectedLevel, onSelect}: IProps): JSX.Element {
  const store = useContext(EditorContext);
  const [selectedLevelData, setSelectedLevelData] = useState<ILevel>({...defaultLevelData});

  useEffect(() => {
    if (categoryData?.id) {
      const params = categoryData.id === '__ALL__' ? undefined : {categoryId: categoryData.id};
      store.getLevelList(params);
    }
  }, [store, categoryData?.id]);

  useEffect(() => {
    if (selectedLevel) {
      setSelectedLevelData(selectedLevel);
    }
  }, [selectedLevel]);

  const onClickLevel = (levelData: ILevel): void => {
    setSelectedLevelData(levelData);
    onSelect(levelData);
  };

  return (
    <Container>
      <Header>
        <h3>{categoryData?.title || '전체 카테고리'}</h3>
      </Header>
      <div className="list">
        {store.levelList.map((level) => (
          <EditorLevelItem
            key={level.id}
            isActive={level.id === selectedLevelData.id}
            data={level}
            onClick={() => onClickLevel(level)}
          />
        ))}
      </div>
    </Container>
  );
}

export default observer(EditorLevelList);
