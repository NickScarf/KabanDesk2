import logo from './logo.svg';
import './App.css';
///style={{backgroundcolor: '#000000'}}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="title">KabanDesk</div>
        <div class='btn-create-container'>
          <button type="button" class="btn btn-outline-light" style={{top:'100px'}}>Create</button>
        </div>
        <div class = 'btn-exit-container'>
        <button type="button" class="btn btn-outline-danger" style={{top:'100px'}}>Exit</button>
        </div>
      </header>



      <div>Giosidog </div>
    </div>
  );
}

export default App;
