import FormRow from "components/forms/FormRow";
import FormLabel from "components/forms/FormLabel";
import FormData from "components/forms/FormData";
import TextForm from "components/forms/TextForm";
import {ChangeEvent, useEffect, useState} from "react";
import SelectForm from "components/forms/SelectForm";
import {useRouter} from "next/router";
import SwitchForm from "components/forms/SwitchForm";

function LevelEditor(): JSX.Element {
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
    const [levelData, setLevelData] = useState({
        groupId: "",
        groupTitle: "",
        title: "",
        subTitle: "",
        description: "",
        text: "",
        inputType: "",
        difficulty: "",
        language: "",
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

    const onChangeCheckbox = (e: ChangeEvent) : void => {
        const {checked, name} = e.target as HTMLInputElement;
        let data = {
            ...levelData,
            [name]: checked ? 'word' : 'letter'
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
                <FormLabel htmlFor="input-type">
                    유형
                </FormLabel>
                <FormData>
                    <SwitchForm onChange={onChangeCheckbox} name="inputType" checkedLabel="자소" checkedValue="word" uncheckedLabel="단어" uncheckedValue="letter" checked={levelData.inputType === 'word'} />
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="difficulty">
                    난이도
                </FormLabel>
                <FormData>
                    slide bar
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="language">
                    언어
                </FormLabel>
                <FormData>
                    radio button
                </FormData>
            </FormRow>
        </div>
    )
}
export default LevelEditor;