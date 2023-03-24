
import './App.css';

import { useState, useEffect } from 'react'

function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  
 
  const updateTasks = (task) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/luispablo", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

  }

  const getTask = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/luispablo")
      .then(res => res.json())
      .then(data => setTasks(data) )
      .catch(error => console.error(error))    
  }

  




  const del = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/luispablo",{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTasks)
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log('error', error));

  }
  


  const handleChange = (e) => {
    setInput(e.target.value);
    
  }
  //let writeTask = [...tasks, { label: input, done: false }]
  //const update = () => {
    //setTasks([...tasks, { label: input, done: false }]);
    //updateTasks([...tasks, { label: input, done: false }])
  //}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      setTasks([...tasks, { label: input, done: false }])
      updateTasks([...tasks, { label: input, done: false }])
      setInput('')
      //actualizar(tarea.concat({label: input, done: false}));
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container  justify-content-center my-5">

      <h2 className="d-block fw-bold ">Lista de tareas</h2>

      <form onSubmit={handleSubmit} className="form-control">
        <input type="text"
          className="form-control"
          placeholder="¿Qué quieres hacer hoy?"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"

          onChange={handleChange}
          value={input}
        />

      </form >

      <span className="form-text my-2" id="span">Tareas pendientes : {tasks.length}</span>



      <div className="mt-3">
        <ul>
          {tasks.map((item, index) =>
            <div className="row input-group mb-3 ">
              <li className="form-control col-md-6" key={index}>{item.label} </li>
              

              <button onClick={del}
                className="justify-content-around btn btn-danger col-md-2 "
                type="button">

                Borrar
              </button>
            </div>

          )}


        </ul>

      </div>
      <div className='d-flex justify-content-center '>
        <button className='btn btn-danger  ' onClick={del}>Borrar todo</button>
      </div>

    </div>
  )
}

export default App;


/* ver si se puede cambiar para actualizar 
<input type="text" 
              key={index} 
              onSubmit={(e) => {
                e.preventDefault(); 
                'click' && actualizar !== item ?
                  setTarea(tarea[index].concat(actualizar)): 
                  item }}
              className="form-control form-control-lg"  
              placeholder={item} 
              value={actualizar} 
              onChange={(e) => {
                e.preventDefault();
                setActializar(e.target.value);
              }}
              />
*/