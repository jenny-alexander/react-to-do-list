import React from "react";
import axios from "axios";
import { useState } from "react";
import './TaskItem.css';
import Swal from "sweetalert2";

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
            <button class="btn btn-default btn-outline-secondary" id="editTaskButton" onClick={editTask}>
                <img src="/images/pencil.svg" alt="edit" width="15" height="15" />
            </button>
        )
    }
    const removeTask = ( )=>{
        Swal.fire({
            title: 'Would you like to delete the task?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#4CAF50',
            denyButtonText: `No`,
            denyButtonColor: '#78808C',
          }).then( ( result ) => {
            if ( result.isConfirmed ) {    
                axios.delete(`/todo/delete/${task.id}`, task ).then( (response ) =>{
                //use sweetalert functionality
                Swal.fire({
                  title: 'Success!',
                  text: "Item deleted!",
                  icon: 'success',
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: '#3da133',
                  confirmButtonText: 'Ok!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    props.getTasks();
                  }
                })   
              }).catch( ( error ) =>{
                  console.log( error );
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops, something went wrong!',
                    text: 'There was an error removing the item.',
                    footer: 'Check console for details.'
                  })             
              })
            }
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
        
        //updateDBForComplete( task ); //<---------Testing something out here

        //make a call to server via axios 
        axios.put( `/todo/completed/${task.id}`, task ).then( ( response )=>{
            console.log( response.data );  
        }).catch( ( error ) =>{
            alert( 'error' );
            console.log( error );
        });
        
    }
    const editTask = async ( )=>{
        //Display SweetAlert popup to user and allow the user to enter task name and assigned to
        const { value: formValues } = await Swal.fire({
            title: 'Edit task',
            html:
            `<label>Enter task name and assigned to:</label>` +
            `<input id="swal-taskName" type="text" placeholder="${task.taskName}" class="swal2-input">` +
            `<input id="swal-assignedTo" type="text" placeholder="${task.assignedTo}" class="swal2-input">`,
                focusConfirm: false,
                showCancelButton: true,
                showCloseButton: true,
                //here we are grabbing the values entered by the user
                preConfirm: () => {
                    //since task name is mandatory on DB, check to make sure it was entered in popup
                    if ( document.getElementById( 'swal-taskName').value ) {
                        return [
                            document.getElementById('swal-taskName' ).value,                        
                            document.getElementById('swal-assignedTo' ).value                        
                        ]
                    } else {                    
                        Swal.showValidationMessage( 'Task name missing!' ); 
                    }
            }
        })      
        if (formValues) {
            //First, make sure user enters a task name
            if ( formValues[0] ) {

                //Get what was input by user and send to DB without checking to see if anything actually changed.
                //Build the data string to get sent to PUT method on server side.
                let taskNameFromSwal = `${formValues[0]}`;
                let taskAssignedToFromSwal = `${formValues[1]}`;
                let taskObject = {
                    task_name : taskNameFromSwal,
                    assigned_to: taskAssignedToFromSwal
                }
                
                axios.put( `/todo/update/${task.id}`, taskObject 
                ).then( ( response )=>{
                    console.log( response.data );
                   setTask( { ...task, taskName:taskNameFromSwal, assignedTo: taskAssignedToFromSwal } );
                    Swal.fire('Task updated!', '', 'success')
                }).catch( ( error )=>{
                    console.log( `error with update:`, error );
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops, something went wrong!',
                        text: 'There was an error editing the task.',
                        footer: 'Check console for details.'
                        })  
                })
         
            }         
        } 



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