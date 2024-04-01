import axios from 'axios';
import { useEffect, useState, setState,useCallback} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { render } from 'react-dom';
import './App.css';
import './components/note.js';
import Note from './components/note.js';
import ModalEdit from './components/modalEdit.js';
///style={{backgroundcolor: '#000000'}}



function Workzone() {
  const my_Id = 0;
  const [Data,setData] = useState('');
  const [EditId,setEditId] = useState(0);
  const [Active, setActive] = useState(false);

  function Log_In_check()
  {
    const url = "http://localhost:8000/api/user/check/" + localStorage.getItem('id') + "/" + localStorage.getItem('name');
        fetch(url, {
          method: "GET",
          headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods' : 'GET'},
        })
          .then((response) => response.json())
          .then((data) => {
            let res = data;
            if(res == 0)
          {
            window.location.assign('http://localhost:3000');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
          }
        })        
          .catch((error) => {
            console.log(error);
          });
  }

  function Unlog_in()
  {
    window.location.assign('http://localhost:3000');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }


  const get_tasks_Data = async (id) =>
  {
      const url = "http://localhost:8000/api/task/get_by_user_id/"+ id;
      await fetch(url, {
        method: "GET",
        headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'},
      })
        .then((response) => response.json())        
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  

  const updatescreen = async () =>
  {
    await get_tasks_Data(localStorage.getItem('id'));
  }

  const edittask = (id,task,deadline) =>
  {
    document.getElementById("taskeditfield").value = task;
    document.getElementById("deadlineeditfield").value = deadline;
    setEditId(id);
    setActive(true);
  }
  const createCard = async (owner_id,task,deadline) =>
  {
    let json = {
      description: task,
      deadline: deadline,
      owner: owner_id
    };
    if((task)&&(deadline))
    {
      const url = "http://localhost:8000/api/task/add/";
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "POST", "Access-Control-Allow-Headers": "*","Content-Type": "application/json"},
      })
        .then((response) => response.json())        
        .catch((error) => {
          console.log(error);
        });
        updatescreen();
    }
    }
  const UpdateCard = async (task,deadline) =>
    {
        let json = {
            description: task,
            deadline: deadline
          };
        const url = "http://localhost:8000/api/task/update/"+ EditId + "/";
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify(json),
          headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "PUT", "Access-Control-Allow-Headers": "*","Content-Type": "application/json"},
          })
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          });
          document.getElementsByName(EditId).task = task;
          document.getElementsByName(EditId).deadline = deadline;
          window.location.reload();
          setActive(false);
    }
  
  useEffect(() => {
    Log_In_check();
    get_tasks_Data(localStorage.getItem('id'));
  }, []);

  return (
    <div className="App">
      <header class="column-header">
        <div class="column-block" style = {{position: 'relative',left:0, background:'#AA0000'}}>
          <div class="column-block-text">Queue</div> 
        </div>
        <div class="column-block" style = {{position: 'relative',left:'25%',top:'-100px', background:'#AAAA00'}}>
          <div class="column-block-text">In progress</div>
        </div>
        <div class="column-block" style = {{position: 'relative',left:'50%',top:'-200px', background:'#0000AA'}}>
          <div class="column-block-text">Testing</div>
        </div>
        <div class="column-block" style = {{position: 'relative',left:'75%',top:'-300px', background:'#00AA00'}}>
          <div class="column-block-text">Done</div>
        </div>
      </header>


      <div id="workfield" class="working-field">
        <ul class="note-container" name="column1">
          {
            Data && Data.filter((task) => task.state == 0).map((item, index) =>
            <li key={item.id} sequencenumber={index} data={item} style={{listStyle: 'none'}}>
              <Note name={item.id} editfunction={edittask} updateFunction={updatescreen} id={item.id} task={item.description} deadline={item.deadline} status={item.state}></Note>
            </li>
            )
          }
        </ul>
        <ul class="note-container" name="column2" style={{position:'absolute',left:'25%',top:'180px'}}>
        {
            Data && Data.filter((task) => task.state == 1).map((item, index) =>
            <li key={item.id} sequencenumber={index} data={item} style={{listStyle: 'none'}}>
              <Note name={item.id} editfunction={edittask} updateFunction={updatescreen} id={item.id} task={item.description} deadline={item.deadline} status={item.state}></Note>
            </li>
            )
          }
        </ul>
        <ul class="note-container" name="column3" style={{position:'absolute',left:'50%',top:'180px'}}>
        {
            Data && Data.filter((task) => task.state == 2).map((item, index) =>
            <li key={item.id} sequencenumber={index} data={item} style={{listStyle: 'none'}}>
              <Note name={item.id} editfunction={edittask} updateFunction={updatescreen} id={item.id} task={item.description} deadline={item.deadline} status={item.state}></Note>
            </li>
            )
          }
        </ul>
        <ul class="note-container" name="column4" style={{position:'absolute',left:'75%',top:'180px'}}>
        {
            Data && Data.filter((task) => task.state == 3).map((item, index) =>
            <li key={item.id} sequencenumber={index} data={item} style={{listStyle: 'none'}}>
              <Note name={item.id} editfunction={edittask} updateFunction={updatescreen} id={item.id} task={item.description} deadline={item.deadline} status={item.state}></Note>
            </li>
            )
          }
        </ul>
      </div>
      
      <header className="App-header">
      <div> </div>
        <div class="title">KabanDesk</div>
        <div class="username">{localStorage.getItem('name')}</div>

        <div class='btn-create-container'>
          <button onClick={() => createCard(localStorage.getItem('id'),document.getElementById("taskcreatefield").value,document.getElementById("deadlinecreatefield").value)}type="button" class="btn btn-outline-light btn-create" style={{top:'100px'}}>Create task</button>
        </div>

        <div class = 'btn-exit-container'>
          <button onClick={() => Unlog_in()}type="button" class="btn btn-outline-danger" style={{top:'100px'}}>Exit</button>
        </div>
        <label class="fieldlabels" style={{left: '20vw'}}>Task</label>
        <label class="fieldlabels" style={{left: '35vw'}}>Deadline</label>
        <input id="taskcreatefield" type="text" maxlength="50" class="alert alert-info" style={{left: '20vw'}}></input>
        <input id="deadlinecreatefield" type="text" maxlength="12" class="alert alert-info" style={{left: '35vw'}}></input>
      </header>
      <div className={Active ? 'modal-back active' : 'modal-back'}>
          <div className='edit-box centered'>
            <label className='edit-label'>EDIT WINDOW</label>
            <input id="taskeditfield" type="text" maxlength="50" class="information-field"></input>
            <input id="deadlineeditfield" type="text" maxlength="12" class="information-field"></input>
            <button onClick={() => setActive(false)} className='edit-button cancel' style={{position: 'relative',top:'-0.4vh',left:'1.5vw'}}>Cancel</button>
            <button onClick={() => UpdateCard(document.getElementById("taskeditfield").value,document.getElementById("deadlineeditfield").value)} className='edit-button submit' style={{position: 'relative',top:'-0.4vh',left:'2.9vw'}}>Submit</button>
          </div>
      </div>
    </div>
  );
}

export default Workzone;
