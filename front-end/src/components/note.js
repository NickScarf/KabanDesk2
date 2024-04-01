import './note.css';
import { useEffect, useState} from 'react';

function Note(props) {
  const [id,setId] = useState(props.id);
  const [task,setTask] = useState(props.task);
  const [deadline,setDeadline] = useState(props.deadline);
  const [status,setStatus] = useState(props.status);
  
  const increaseStatus = async (task_id) =>
  {
    console.log(props);
      const url = "http://localhost:8000/api/task/update/status_increase/"+ task_id + "/";
      await fetch(url, {
        method: "PUT",
        headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "PUT", "Access-Control-Allow-Headers": "*"},
      })
        .then((response) => response.json())        
        .then((data) => {
          setStatus(data);
        })
        .catch((error) => {
          console.log(error);
        });
        props.updateFunction()
    }
    const decreaseStatus = async (task_id) =>
    {
      console.log(props);
        const url = "http://localhost:8000/api/task/update/status_decrease/"+ task_id + "/";
        await fetch(url, {
          method: "PUT",
          headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "PUT", "Access-Control-Allow-Headers": "*"},
        })
          .then((response) => response.json())        
          .then((data) => {
            setStatus(data);
          })
          .catch((error) => {
            console.log(error);
          });
          props.updateFunction()
      }
    
    const deleteCard = async (task_id) =>
    {
        const url = "http://localhost:8000/api/task/delete/"+ task_id + "/";
        await fetch(url, {
          method: "DELETE",
          headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "DELETE", "Access-Control-Allow-Headers": "*"},
          })
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          });
          props.updateFunction()
    }

    const editCard = (id,task,deadline) =>
    {
          props.editfunction(id,task,deadline)
    }

    return (
      <div class="card">
        <div class="card-body">
          <h5 name={id} class="card-title">{task}</h5>
          <h6 class="card-subtitle mb-2">{deadline}</h6>
          <div class="card-buttons-container">
            {status > 0 &&
              <button onClick={() => {decreaseStatus(id)}} class="btn btn-outline-light card-btn-navigate"> ← </button>
            }
            {status < 3 &&
              <button onClick={() => increaseStatus(id)} class="btn btn-outline-light card-btn-navigate"> → </button>
            }
            <button onClick={() => editCard(id,task,deadline)} class="btn btn-outline-light card-btn-edit"> E </button>
            <button onClick={() => deleteCard(id)} class="btn btn-outline-danger card-btn-remove"> X </button>
          </div>
        </div>
      </div>
);
  }

export default Note;
