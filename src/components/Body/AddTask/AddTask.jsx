import react from "react";
import { useEffect, useState } from "react";
import './AddTask.css'

function AddTask( props ){
    //const[ name, useName ] = useState( null );

    return (
        <div className="AddTask">
            <h1>AddTask</h1>
            <h3>{JSON.stringify( props )}</h3>
        </div>
    )

}

export default AddTask;