import axios from "axios";
import react from "react";
import { useEffect, useState } from "react";
import './AddTask.css'

function AddTask( props ){
    //const[ name, useName ] = useState( null );
    const [ newTask, setNewTask ] = useState ( {
        taskName: '',
        assignedTo: ''
    })

    const handleTaskNameChange = ( event )=>{
        setNewTask( {...newTask, taskName: event.target.value })
    }

    const handleAssignedToChange = ( event )=>{
        setNewTask( {...newTask, assignedTo: event.target.value })
    }

    const handleAddEvent = ( ) =>{
        if( newTask.taskName && newTask.assignedTo !== '' ) {
            console.log( `in handleAddEvent with task:`, newTask );
            axios.post( `/todo`, newTask ).then( ( response )=>{
                //props.getTasks();
            }).catch( ( error )=>{
                alert( 'Error adding new task!' );
                console.log( error );
            })
        }

    }
    return (
        <div className="AddTask">
            {/* <h3>{JSON.stringify( props )}</h3> */}

            <div className="itemInput">
                <form>
                <div class="row">
                    <p id="addTaskTitle">Add a task:</p>
                </div>
                <div class="row">
                    <div class="col-5">
                    <input type="text" class="form-control" id="taskName" placeholder="Task Name"
                            onChange= { ( event )=>handleTaskNameChange ( event ) } required/>
                    </div>
                    <div class="col-5">
                    <input type="text" class="form-control" id="assignedTo" placeholder="AssignedTo"
                            onChange={ ( event )=>handleAssignedToChange( event ) } required />
                    </div>                
                    <div class="col-2">
                    <button id="addButton" class="btn btn-secondary" onClick={ handleAddEvent }>Add Task</button>
                    </div>
                </div>

                </form>
            </div>

        </div>
    )

}

export default AddTask;