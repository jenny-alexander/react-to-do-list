import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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

    function CompleteButton( ) {
        return (
            <button class="btn btn-default btn-outline-secondary" id="completeTaskButton" onClick={ completeTask }>
                <img src="/images/check-lg.svg" alt="complete" width="15" height="15" />
            </button>   
        )
    }
    function TrashButton( ) {
        return (
            <button class="btn btn-default btn-outline-secondary " id="removeTaskButton" onClick={removeTask}>
                <img src="/images/trash.svg" alt="trash" width="15" height="15"/>
            </button>                
        )
    }
    function EditButton( ) {
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
        //The following is a workaround in order to get the completed date and completed status reflected on the DOM
        //I tried to use the setState hook like this but it didn't work. Commented out for now.
        //setTask( { ...task, completed: true,
        //                     dateCompleted: new Date().toISOString() } );

        //This is working which.
        setTask( task.completed = true ); //--> TODO: Also, setting to true in DB since couldn't get this hook to work
        setTask( task.dateCompleted = new Date().toISOString() );
        setTask( {...task}); //<--------TODO: Need help with this. This is the only way I could get the updated row to show.

        console.log( `in completeTask after setTask and task is:`, task );
        
        //updateDBForComplete( task );

        //make a call to server via axios 
        axios.put( `/todo/completed/${task.id}`, task ).then( ( response )=>{
            console.log( response.data );  
        }).catch( ( error ) =>{
            alert( 'error' );
            console.log( error );
        });
        
    }

//----------------->BEGIN TRYING THIS OUT

          // Call the updateDBForComplete function in order to update the db and delay --->DIDN'T WORK
          async function updateDBForComplete( task ) {
              console.log( `about to do axios call in updateDBForComplete function`)
            let response = await axios.put( `/todo/completed/${task.id}`, task );
            if( response.data === 'OK' ) {
                console.log( `response was OK and now about to call sleep function`)
                sleep(10000).then( ()=> {
                    console.log( `done sleep and about to get props`)
                    props.getTasks(); 
                } )
                console.log( `in if of await statement thingie`);
                
            } else {
                alert( 'error' );
                console.log( 'error' );                
            }
          }
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

//<-----------------END TRYING THIS OUT


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