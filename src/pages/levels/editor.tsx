import FormRow from "components/forms/FormRow";
import FormLabel from "components/forms/FormLabel";
import FormData from "components/forms/FormData";
import TextForm from "components/forms/TextForm";
import {useState} from "react";
import SelectForm from "components/forms/SelectForm";

function EditorPage(): JSX.Element {

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
    return (
        <div className="editor-page">
            <FormRow>
                <FormLabel htmlFor="title" required>
                    제목
                </FormLabel>
                <FormData>
                    <TextForm name="title" value={levelData.title} placeholder="제목"/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="subTitle">
                    부제목
                </FormLabel>
                <FormData>
                    <TextForm name="subTitle" value={levelData.subTitle} placeholder="부제목"/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="description">
                    설명
                </FormLabel>
                <FormData>
                    <TextForm name="description" value={levelData.description} placeholder="설명"/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="text">
                    타자 데이터
                </FormLabel>
                <FormData>
                    <TextForm type="textarea" name="text" value={levelData.text} placeholder="타자 데이터"/>
                </FormData>
            </FormRow>
            <FormRow>
                <FormLabel htmlFor="description">
                    그룹
                </FormLabel>
                <FormData>
                    <SelectForm name="groupId" value={levelData.groupId} valueKey="id" labelKey="title" placeholder="placeholder" options={groupOptions}/>
                </FormData>
            </FormRow>
        </div>
    )
}
export default EditorPage;