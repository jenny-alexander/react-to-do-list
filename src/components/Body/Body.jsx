import react from "react";
import { useState } from "react";
import './Body.css'
import AddTask from './AddTask/AddTask'
import TaskList from './TaskList/TaskList'

function Body( props ){
    //const[ name, useName ] = useState( null );

    return (
        <div className="Body">
            <h1>Body</h1>
            {/* <h3>{JSON.stringify( props )}</h3> */}
            <AddTask />
            <TaskList list={props.tasks}/>
        </div>
    )

}

export default Body;