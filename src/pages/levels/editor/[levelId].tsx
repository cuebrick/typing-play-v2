import FormRow from "components/forms/FormRow";
import FormLabel from "components/forms/FormLabel";
import FormData from "components/forms/FormData";
import TextForm from "components/forms/TextForm";
import {ChangeEvent, useEffect, useState} from "react";
import SelectForm from "components/forms/SelectForm";
import {useRouter} from "next/router";
import SwitchForm from "components/forms/SwitchForm";
import RadioFormGroup from "components/forms/RadioFormGroup";
import {inputType, languageOptions} from "constants/Constants";
import InputRangeForm from "components/forms/InputRangeForm";
import {ILevel} from "interfaces/levelInterface";
import { collection, addDoc } from "firebase/firestore";
import { db } from "database"
import LevelGroupSelector from "components/level/LevelGroupSelector";
import Modal from "components/modal/Modal";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import LevelGroupModal from "components/modal/LevelGroupModal";

function LevelsEditorPage(): JSX.Element {
    const router = useRouter()
    const { levelId } = router.query

    useEffect(() => {
        if (levelId) {
            console.log('콘솔 ====>', levelId, router)
            // called api
            // and response

        }
    }, [levelId])

    const [groupOptions, setGroupOptions] = useState([
        {
            id: "A01",
            title: "첫 번째 그룹"
        },
        {
            id: "A02",
            title: "두 번째 그룹"
        },
        {
            id: "A03",
            title: "세 번째 그룹"
        }
    ])
    const [levelData, setLevelData] = useState<ILevel>({
        groupId: "",
        groupTitle: "",
        title: "",
        subTitle: "",
        description: "",
        text: "",
        inputType: "word",
        difficulty: "1",
        language: "ko",
        levelId: "",
        writer: "",
        createDateTime: null,
        modifiedDateTime: null
    })

    const onChange = (e: ChangeEvent): void => {
        const {value, name} = e.target as HTMLInputElement;
        let data = {
            ...levelData,
            [name]: value
        }
        setLevelData(data);
    }

    const onChangeSelect = (e: ChangeEvent) : void => {
        const {value, name, selectedIndex, options} = e.target as HTMLSelectElement;
        const groupTitle = selectedIndex > 0 ? options[selectedIndex].label : '';
        let data = {
            ...levelData,
            [name]: value,
            groupTitle
        }
        setLevelData(data);
    }

    const onChangeCheckbox = (e: ChangeEvent) : void => {
        const {checked, name} = e.target as HTMLInputElement;
        let data = {
            ...levelData,
            [name]: checked ? inputType.word.value : inputType.letter.value
        }
        console.log('<<<<<<<', data)
        setLevelData(data);
    }

    return (
        <div className="editor-page">
            <FormRow>
                <FormLabel htmlFor="title" required>
                    제목
                </FormLabel>
                <FormData>
                    <TextForm name="title" value={levelData.title} placeholder="제목" onChange={onChange}/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="subTitle">
                    부제목
                </FormLabel>
                <FormData>
                    <TextForm name="subTitle" value={levelData.subTitle} placeholder="부제목" onChange={onChange}/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="description">
                    설명
                </FormLabel>
                <FormData>
                    <TextForm name="description" value={levelData.description} placeholder="설명" onChange={onChange}/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="text">
                    타자 데이터
                </FormLabel>
                <FormData>
                    <TextForm type="textarea" name="text" value={levelData.text} placeholder="타자 데이터" onChange={onChange}/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="groupId">
                    레벨 그룹
                </FormLabel>
                <FormData>
                    <SelectForm name="groupId" value={levelData.groupId} valueKey="id" labelKey="title" placeholder="그룹 ID 선택" options={groupOptions} onChange={onChangeSelect}/>
                    <button onClick={onClickEditGroup}>수정</button>
                    {isShowGroupLayer && (
                        <LevelGroupModal onChangeGroups={onChangeGroup} />
                    )}
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="inputType">
                    유형
                </FormLabel>
                <FormData>
                    <SwitchForm onChange={onChangeCheckbox} name="inputType" checkedLabel={inputType.letter.label} checkedValue={inputType.word.value} uncheckedLabel={inputType.word.label} uncheckedValue={inputType.letter.value} checked={levelData.inputType === inputType.word.value} />
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="difficulty">
                    난이도
                </FormLabel>
                <FormData>
                    <InputRangeForm name="difficulty" value={levelData.difficulty} onChange={onChange} />
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="language">
                    언어
                </FormLabel>
                <FormData>
                    <RadioFormGroup name="language" value={levelData.language} options={languageOptions} onChange={onChange} />
                </FormData>
            </FormRow>
            <pre>
                {JSON.stringify(levelData, null, '\t')}
            </pre>
            <button onClick={onClickSave}>저장</button>
        </div>
    )
}
export default LevelsEditorPage;