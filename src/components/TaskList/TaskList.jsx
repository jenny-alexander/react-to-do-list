import React from "react";
import { useEffect, useState } from "react";
import './TaskList.css'
import TaskItem from '../TaskItem/TaskItem';

function TaskList( props ){
    //const[ name, useName ] = useState( null );

    return (
        <div className="outputDiv">
            <table class="table table-fixed"><caption>List of tasks</caption><thead id="tableHeader" class="table-light">
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