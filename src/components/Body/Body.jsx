import './Body.css'
import AddTask from '../AddTask/AddTask'
import TaskList from '../TaskList/TaskList'

function Body( props ){
    return (
        <div className="Body" class="shadow p-3 mb-5 bg-white rounded">
            {/* <h3>{JSON.stringify( props )}</h3> */}
            <AddTask list={props.tasks} getTasks={props.getTasks}/>
            <TaskList list={props.tasks} getTasks={props.getTasks}/>
        </div>
    )

}

export default Body;