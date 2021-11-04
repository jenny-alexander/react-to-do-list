import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import Body from './components/Body/Body';

function App() {
  const[ tasks, setTasks ] = useState( [] );

  useEffect(()=>{
    getTasks();
  }, [] )

  const getTasks = () =>{
    console.log( `in getTasks` );
    axios.get( '/todo').then( (response )=>{
      console.log( response.data );
      setTasks( response.data );
    }).catch( ( error ) =>{
      alert( `Error getting tasks!`);
      console.log( `Error getting tasks from database` );
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React To-Do List</h1>
      </header>
      <Body tasks={ tasks }/>
    </div>
  );
}

export default App;
