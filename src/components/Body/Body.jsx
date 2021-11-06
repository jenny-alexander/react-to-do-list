import react from "react";
import { useState } from "react";
import './Body.css'
import AddTask from '../AddTask/AddTask'
import TaskList from '../TaskList/TaskList'

function Body( props ){
    //const[ name, useName ] = useState( null );

    return (
        <div className="Body">
            {/* <h3>{JSON.stringify( props )}</h3> */}
            <AddTask list={props.tasks} getTasks={props.getTasks}/>
            <TaskList list={props.tasks} getTasks={props.getTasks}/>
        </div>
    )

}

export default Body;