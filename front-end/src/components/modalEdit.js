import './modalEdit.css';
import { useEffect, useState} from 'react';


function ModalEdit(props) {
    const [Active, setActive] = useState(false);
    const updateCard = async (task_id,task,deadline) =>
    {
        console.log(props);
        let json = {
            description: task,
            deadline: deadline
          };
        const url = "http://localhost:8000/api/task/update/"+ task_id + "/";
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify(json),
          headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "DELETE", "Access-Control-Allow-Headers": "*","Content-Type": "application/json"},
          })
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          });
          setActive(false);
    }


      return (
        <div className={Active ? 'modal-back active' : 'modal-back'}>
          <div className='edit-box centered'>
            <label className='edit-label'>EDIT WINDOW</label>
            <input id="taskeditfield" type="text" maxlength="20" class="information-field"></input>
            <input id="deadlineeditfield" type="text" maxlength="20" class="information-field"></input>
            <input id="id"  style={{fontSize:'16px'}}></input>
            <button onClick={() => setActive(false)} className='edit-button cancel' style={{position: 'relative',top:'-0.4vh',left:'1.5vw'}}>Cancel</button>
            <button onClick={() => updateCard(document.getElementById("id").value,document.getElementById("taskeditfield").value,document.getElementById("deadlineeditfield").value)} className='edit-button submit' style={{position: 'relative',top:'-0.4vh',left:'2.9vw'}}>Submit</button>
          </div>
      </div>
  );
    }
  
export default ModalEdit;