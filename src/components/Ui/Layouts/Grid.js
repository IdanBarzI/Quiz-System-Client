import "./Grid.css"

const Grid = (props) => {
    return(
        <div className={`Grid ${props.className}`}>
            {props.children}
        </div>
    )
}

export const Rows = (props) => {
    return <Grid {...props} className="rows"/>
}

export const Columns = (props) => {
    return <Grid {...props} className="columns"/>
}

export default Grid;