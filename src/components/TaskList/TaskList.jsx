import react from "react";
import { useEffect, useState } from "react";
import './TaskList.css'
import TaskItem from '../TaskItem/TaskItem';

function TaskList( props ){
    //const[ name, useName ] = useState( null );

    return (
        <div>
            <table class="table table-hover"><caption>List of tasks</caption><thead>
            <tr><th>Completed</th><th>Task</th><th>Assigned To</th>
            <th>Date Completed</th><th>Actions</th></tr></thead><tbody>
            { 
                props.list.map( ( thisTask ) =>(
                <TaskItem key={ thisTask.id } task={thisTask} getTasks={props.getTasks} /> ) )
            }
            </tbody></table>
        </div>
    )

}

export default TaskList;