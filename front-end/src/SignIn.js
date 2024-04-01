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
    const [ResponseData,setResponseData] = useState();
    const [ResponseStatus,setResponseStatus] = useState(0);
    const [K,setK] = useState(0);

    const Log_In = async (login,password) =>
  {
    if(!(login)||!(password))
    {
        document.getElementById("errorlabel").value = "Please fill all the fields";
    }
    else
    {
        document.getElementById("errorlabel").value = "";
        const url = "http://localhost:8000/api/user/validate/" + login + "/" + password;
        await fetch(url, {
          method: "GET",
          headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods' : 'GET'},
        })
          .then((response) => response.json())
          .then((data) => {setResponseData(data);})        
          .catch((error) => {
            console.log(error);
            document.getElementById("errorlabel").value = "Incorrect login or pass";
          });
        console.log(ResponseData);
        if(ResponseData)
        {
          localStorage.setItem('id',ResponseData[0].id);
          localStorage.setItem('name',ResponseData[0].username);
          window.location.assign('http://localhost:3000/workzone');
        }
    }
  }

  const Registrate = async (login,password) =>
  {
    if(!(login)||!(password))
    {
        document.getElementById("errorlabel").value = "Please fill all the fields";
    }
    else
    {
      let json = {
        username: login,
        password: password,
        email: "NO"
      };
        document.getElementById("errorlabel").value = "";
        const url = "http://localhost:8000/api/user/create/";
        await fetch(url, {
          method: "POST",
          body: JSON.stringify(json),
          headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods' : 'POST',"Content-Type": "application/json"},
        })
          .then((response) => response.json())
          .then((data) => {
            let res = data;
            console.log(res);
            if(res == 1)
          {
            localStorage.setItemItem('id');
            localStorage.setItem('name');
            document.getElementById("errorlabel").value = "You signed in";
          }
          else
          {
            document.getElementById("errorlabel").value = "This username is taken";
            localStorage.removeItem('id');
            localStorage.removeItem('name');
          }
        })        
          .catch((error) => {
            console.log(error);
          });
    }
  }

  const Log_In_check = async () =>
  {
    const url = "http://localhost:8000/api/user/check/" + localStorage.getItem('id') + "/" + localStorage.getItem('name');
        await fetch(url, {
          method: "GET",
          headers: {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods' : 'GET'},
        })
          .then((response) => response.json())
          .then((data) => {
            let res = data;
            console.log(res);
            if(res == 1)
          {
            window.location.assign('http://localhost:3000/workzone');
          }
          else
          {
            localStorage.removeItem('id');
            localStorage.removeItem('name');
          }
        })        
          .catch((error) => {
            console.log(error);
          });
  }

  useEffect(() => {
    document.getElementById("errorlabel").disabled = true;
    Log_In_check();
  }, []);

  return (
    <div className='App'>
        <header></header>
        <div className='signinbox centered'>
            <label className='Label'>Auth</label>
            <label className='Label' style={{fontSize:'3vh'}}>Username</label>
            <input id="username" type="text" maxLength="25" className='inputs'></input>
            <label className='Label' style={{fontSize:'3vh'}}>Password</label>
            <input id="password" type="password" className='inputs'></input>
            <button onClick={() => Log_In(document.getElementById("username").value,document.getElementById("password").value)}className='buttons'>Log In</button>
            <button onClick={() => Registrate(document.getElementById("username").value,document.getElementById("password").value)}className='buttons'>Sign In</button>
            <input id="errorlabel" className='Label' type='text' style={{marginTop:'5vh',fontSize:'3vh',background:'none',border:'none',color:'#F22000'}}></input>
        </div>
    </div>
  );
}

export default SignIn;