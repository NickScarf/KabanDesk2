import axios from 'axios';
import { useEffect, useState, setState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { render } from 'react-dom';
import './SignIn.css';
import './components/note.js';
import Note from './components/note.js';
import ModalEdit from './components/modalEdit.js';
///style={{backgroundcolor: '#000000'}}



function SignIn() {
    const [errorlabel,seterrorlabel] = useState();
    const Log_In = async (login,password) =>
  {
    if(!(login)||!(password))
    {
        document.getElementById("errorlabel").value = "Please fill all the fields";
    }
    else
    {
        document.getElementById("errorlabel").value = "";
    }
    /*
      const url = "http://localhost:8000/api/task/get_by_user_id/";
      await fetch(url, {
        method: "GET",
        headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'},
      })
        .then((response) => response.json())        
        .catch((error) => {
          console.log(error);
        });
        */
  }

  useEffect(() => {
    document.getElementById("errorlabel").disabled = true;
  }, []);

  return (
    <div className='App'>
        <header></header>
        <div className='signinbox centered'>
            <label className='Label'>Auth</label>
            <label className='Label' style={{fontSize:'3vh'}}>Username</label>
            <input id="username" type="text" maxLength="25" className='inputs'></input>
            <label className='Label' style={{fontSize:'3vh'}}>Password</label>
            <input id="password" type="text" className='inputs'></input>
            <button onClick={() => Log_In(document.getElementById("username").value,document.getElementById("password").value)}className='buttons'>Log In</button>
            <button className='buttons'>Sign In</button>
            <input id="errorlabel" className='Label' type='text' style={{marginTop:'5vh',fontSize:'3vh',background:'none',border:'none',color:'#F22000'}}></input>
        </div>
    </div>
  );
}

export default SignIn;