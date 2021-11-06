import axios from "axios";
import react from "react";
import { useEffect, useState } from "react";
import './TaskItem.css';

function TaskItem( props ) {
    const [ task, setTask ] = useState ( {
        id: props.task.id,
        taskName: props.task.task_name,
        assignedTo: props.task.assigned_to,
        completed: props.task.completed,
        dateCompleted: props.task.date_completed
    })

    let completedDateCell = '';

    function CompleteButton( props ) {
        return (
            <button class="btn btn-default btn-outline-secondary" id="completeTaskButton" onClick={completeTask}>
                <img src="/images/check-lg.svg" alt="complete" width="15" height="15" />
            </button>   
        )
    }
    function TrashButton( props ) {
        return (
            <button class="btn btn-default btn-outline-secondary " id="removeTaskButton" onClick={removeTask}>
                <img src="/images/trash.svg" alt="trash" width="15" height="15"/>
            </button>                
        )
    }
    function EditButton( props ) {
        return (
            <button class="btn btn-default btn-outline-secondary" id="editTaskButton">
                <img src="/images/pencil.svg" alt="edit" width="15" height="15" />
            </button>
        )
    }

    const removeTask = ( )=>{
        axios.delete(`/todo/delete/${task.id}`, task ).then( (response ) =>{
            props.getTasks();
        }).catch( ( error ) =>{
            console.log( error );
            alert( `Error deleting task!`);
        })
    }

    const completeTask = ( )=>{
        setTask({...task, completed: true, dateCompleted: new Date().toISOString()})
        //make a call to server via axios
        axios.put( `/todo/completed/${task.id}`, task ).then( ( response )=>{
            console.log( response.data );
            props.getTasks();
        }).catch( ( error ) =>{
            console.log( error );
            alert( 'Error with update!' );
        });    
    }

    function CompletedTaskRow( props ) {
        let options = {hour: "2-digit", minute: "2-digit"};
        completedDateCell = new Date(task.dateCompleted ).toLocaleDateString() + ' ' +
                            new Date(task.dateCompleted ).toLocaleTimeString( `en-US`, options );
        return (
            <tr id="successRow" class="table-default h5" data-id={task.id}>
                <td id="completedImg"><img id="checkComplete" src='/images/check-square.svg' alt="complete" width="18" height="18"/></td>
                <td id="name">{task.taskName}</td>
                <td id="assigned">{task.assignedTo}</td>
                <td id="completedDate">{completedDateCell}</td>
                <td id="action">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <TrashButton />   
                    </div>  
                </td>
            </tr>
        )
        
    }

    function NotCompletedTaskRow( props ) {
        return (
            <tr class="table-default h5" data-id={task.id}>
                <td><img src='/images/square.svg' alt="not complete" width="18" height="18"></img></td>
                <td id="name">{task.taskName}</td>
                <td id="assigned">{task.assignedTo}</td>
                <td id="completedDate"></td>
                <td id="action">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <EditButton />
                        <CompleteButton />  
                        <TrashButton />   
                    </div>           
                </td>
            </tr>
        )
        
    }   

    return (
            task.completed? <CompletedTaskRow /> : <NotCompletedTaskRow />
        )
}

export default TaskItem;