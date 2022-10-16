function CardItem({title, children, width, height}: any): JSX.Element {
    return (
        <div className="card-item" style={{width, height}}>
            <div className="header">
                {title}
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    )
}
export default CardItem