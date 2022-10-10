import TrophyBadge from "./TrophyBadge";

function LevelItem({levelData}: any): JSX.Element {
    return (
        <div className="level-item">
            <TrophyBadge />
            <div className="level-info">
                <div className="level-num">00</div>
                <div className="level-title">{levelData.title}</div>
                <div className="level-subtitle">{levelData.subtitle}</div>
            </div>
        </div>
    )
}
export default LevelItem