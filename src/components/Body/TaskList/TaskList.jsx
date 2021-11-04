import react from "react";
import { useEffect, useState } from "react";
import './TaskList.css'

function TaskList( props ){
    //const[ name, useName ] = useState( null );

    return (
        <div className = "TaskList">
            <h1>TaskList</h1>
            <h3>{JSON.stringify( props )}</h3>
        </div>
    )

}

export default TaskList;