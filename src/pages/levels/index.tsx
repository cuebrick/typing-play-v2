import levelData from "sample/json/level-data.json"
import LevelItem from "../../components/level/LevelItem";
function LevelsIndexPage(): JSX.Element {
  return (
    <div className="level-list">
        {levelData.map(level => (
            <LevelItem key={level.id} levelData={level}/>
        ))}
    </div>
  )
}

export default LevelsIndexPage;
