import {observer} from "mobx-react-lite";
import {ChangeEvent, ReactElement, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {inputType, languageOptions} from "constants/Constants";
import {ILevel} from "interfaces/LevelInterface";
import LevelGroupModal from "components/modal/LevelGroupModal";
import {LevelContext, LevelProvider} from "store/LevelContext";
import {
  FormData,
  FormLabel,
  FormRow,
  InputRangeForm,
  RadioFormGroup,
  SelectForm,
  SwitchForm,
  TextForm
} from "components/forms";
import {DocumentReference} from 'firebase/firestore';
import {defaultLevelData} from 'dto/Level';

const CREATE = 'create';

function LevelsEditorPage(): JSX.Element {
  const store = useContext(LevelContext);
  const router = useRouter();
  const {levelId} = router.query;
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (levelId) {
      setIsEdit(CREATE !== levelId);
      store.getLevelGroupList();
      store.getLevel(levelId as string);
    }
    return () => {
      store.setLevel({...defaultLevelData});
    };
  }, [levelId, store]);

  const [levelData, setLevelData] = useState<ILevel>({...defaultLevelData});

  useEffect(() => {
    if (store.level) {
      setLevelData({...store.level});
    }
  }, [store.level]);


  return (
    <div className="editor-page">

    </div>
  );
}

LevelsEditorPage.getProvider = (page: ReactElement): ReactElement => {
  return (
    <LevelProvider>{page}</LevelProvider>
  );
};

export default observer(LevelsEditorPage);
