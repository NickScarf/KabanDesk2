import axios from 'axios';
import { useEffect, useState, setState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { render } from 'react-dom';
import './App.css';
import './components/note.js';
import Note from './components/note.js';
import ModalEdit from './components/modalEdit.js';
import SignIn from './SignIn.js';
import Workzone from './Workzone.js';
///style={{backgroundcolor: '#000000'}}



function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' Component={SignIn}/>
      <Route path='/workzone' Component={Workzone}/>
      </Routes>
    </Router>
    );
  }

export default App;
