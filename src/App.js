
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useState, useEffect } from 'react'

function App() {
  const [input, setInput] = useState("");
  const [tarea, setTarea] = useState([]);

  
  const crear = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/luispablo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([])
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

  }




  const obtener = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => { setTarea(data) })
      .catch(error => console.error(error))    
  }
  
  const actualizar = (tarea) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/luispablo", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarea)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log('error', error))
  }



  const borrar = () => {
    setTarea([]);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/",
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log('error', error));

  }

  useEffect(() => {
    obtener()
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      setTarea(tarea.concat(input));
      setInput('')
      actualizar(tarea.concat({label: input, done: false}));
    }
  }




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

      <span className="form-text my-2" id="span">Tareas pendientes : {tarea.length}</span>



      <div className="mt-3">
        <ul>
          {tarea.map((item, index) =>
            <div className="row input-group mb-3">
              <li className="form-control col-md-6" key={index}>{item} </li>

              <button onClick={() => setTarea(tarea.filter(borrar => borrar != item))}
                className="justify-content-around btn btn-danger col-md-2 "
                type="button">

                Borrar
              </button>
            </div>

          )}


        </ul>

      </div>
      <div className='d-flex justify-content-center '>
        <button className='btn btn-danger  ' onClick={borrar}>Borrar todo</button>
      </div>







    </div>
  )
}

export default App;
