import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";

import axios from 'axios';


export function Calm() {
  //individual states
  const { user } = useNotion();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [brainwaves, setBrainWaves] = useState("");
  const [calm, setCalm] = useState(0);
  const [focus, setFocus] = useState(0);
  const [counter, setCounter] = useState(0);

  const [status, setStatus] = useState(false);
  const [statusText, setStatusText] = useState("Start");

  //creates session start date and time 
  var now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = now.getFullYear();
  const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: "2-digit"});
  now = mm + '/' + dd + '/' + yyyy + ", " + time;
  
  //main state object
  const [currentSession, setCurrentSession] = useState({"date": now, "firstName":"", "lastName":"", "mindlogs": []});
  console.log(currentSession);

  //copy of main state object for table data
  const [sessionTable, setSessionTable] = useState(currentSession);

  //test input state object
  const [inputs, setInputs] = useState({
    newcalm: "",
    newfocus: "",
  });

  //name input state object
  const [nameinputs, setNameInputs] = useState({
    newfirstName: "",
    newlastName: ""
  });


  //function that handles changes in status
  //lets the website know when to and when not to read from the device
  const statusHandleChange = () => {
    if(status === false){
      setStatusText("Stop");
      setStatus(true);
      console.log("Status: " + status);
    }else{
      setStatusText("Start")
      setStatus(false);
      console.log("Status: " + status);
    }
  }

  //function that takes the inputed calm and focus levels and 
  //builds them in a state object.
  const testHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  };


  //takes calm and focus levels from the state object and 
  //assigns them to their individual state
  //increments counter for main state
  const testHandleSubmit = (event) => {
    event.preventDefault();
    
    setCalm(inputs.newcalm);
    setFocus(inputs.newfocus);

    setCounter(counter + 1);

    setInputs({
      calm: "",
      focus: ""
    })  
  };


  //function that takes the inputed first and last name and 
  //builds them in a state object.
  const nameHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNameInputs(values => ({...values, [name]: value}))
  };


  //takes first and last name from the state object and 
  //assigns them to their individual state
  const nameHandleSubmit = (event) => {
    event.preventDefault();
    
    setFirstName(nameinputs.newfirstName);
    setLastName(nameinputs.newlastName);
    
    setNameInputs({
      newfirstName: "",
      newlastName: ""
    });
  }


  //function that takes the current state object and 
  //sends it to a API endpoint that saves it to a database
  const handleLog = () => {
    const payload = currentSession; 
      
    console.log("payload"+JSON.stringify(payload));

    axios({
      url:'http://localhost:8080/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log("Data has been sent to the server");
    })
    .catch(() => {
      console.log("Internal server error");
    });;
    
    // window.location.reload();
    setCurrentSession({"date": now, "firstName":"", "lastName":"", "mindlogs": []});
  };


  //if there is no user relocate back to login screen
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);


  //assigns the inputed first and last name to the main state object
  useEffect(()=> {

    setCurrentSession((prevState) => ({
      ...prevState,
      "firstName": firstName,
      "lastName": lastName
    }));
    
  },[firstName, lastName]);


  //detects when first and last names are assigned to the main state object and calls the handleLog function
  useEffect(()=>{
    if (currentSession.firstName !== "" && currentSession.lastName !== ""){
      handleLog();
    }
  },[currentSession.firstName, currentSession.lastName]);


  //detects a change in value for calm and focus levels and adds a mindlog entry using the new values
  useEffect(() => {
    if (calm !== 0 && focus !== 0){

      var current = new Date();
      const currentTime = current.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      current = currentTime;

      setCurrentSession((prevState) => ({
        ...prevState,
        "mindlogs": [...prevState.mindlogs, {"time":current ,"entryid": counter, "calm":calm, "focus":focus, "brainWaves":brainwaves}]
      }));

    }
    
  },[counter, calm, focus, brainwaves]);


  //updates the table
  //on log it keeps the last session's data until a new session begins 
  useEffect(() =>{
    if(currentSession.mindlogs.length !== 0){
      setSessionTable(currentSession);
    }
  },[currentSession]);


  //For Device Reading
  //if status is set to true
  //takes brainwave, calm, and focus reading from neurosity device
  useEffect(() => {
    if (!user) {
      return;
    } 
    
    if(status === false){
      console.log("is not reading");
    }

    if(status === true){
      console.log("is reading");

      const brainSub = notion.brainwaves("raw").subscribe((brainwaves) => {
        const brainWaves = brainwaves.toString();
        setBrainWaves(JSON.stringify(brainWaves));  
      });
  
      const calmSub = notion.calm().subscribe((calm) => {
        const calmScore = Math.trunc(calm.probability * 100);
        setCalm(calmScore);
      });
      
      const focusSub = notion.focus().subscribe((focus) => {
        const focusScore = Math.trunc(focus.probability * 100);
        setFocus(focusScore);
      })
  
      return () => {
        brainSub.unsubscribe();
        calmSub.unsubscribe();
        focusSub.unsubscribe();
      };
    }
    
  }, [user, brainwaves, calm, focus, status]);

  
  return (
    <main className="main-container">
      <button onClick={statusHandleChange}>{statusText}</button>

      {user ? <Nav /> : null}
      <div className="calm-score">
        <>&nbsp;{calm}%</> <div className="calm-word">Calm</div>
      </div>
      <div className="calm-score">
        <>&nbsp;{focus}%</> <div className="calm-word">focus</div>
      </div>


      {/*For Database testing */}
      <div>
        <form onSubmit={testHandleSubmit}>
          <div className="form-input" >
            <input type='Text' name="newcalm" value={inputs.newcalm || ""} onChange={testHandleChange} placeholder="Set Calm"/>
          </div>
          <div className="form-input">
            <input type='Text' name="newfocus" value={inputs.newfocus || ""} onChange={testHandleChange} placeholder="Set Focus"/>
          </div>
          <button>Simulate New Values</button>
        </form>
      </div>
      {/*For Database testing */}


      <div>
        <form onSubmit={nameHandleSubmit}>
          <div className="form-input">
            <input type='Text' name="newfirstName" value={nameinputs.newfirstName || ""} onChange={nameHandleChange} placeholder="First Name"/>
          </div>
          <div className="form-input">
            <input type='Text' name="newlastName" value={nameinputs.newlastName || ""} onChange={nameHandleChange} placeholder="Last Name"/>
          </div>
          <button>Log</button>
        </form>
      </div>
      
      <table className="table table-striped">
        <tbody>
          <tr className="table-head">
            <th>timestamp</th>
            <th>entryid</th>
            <th>calm</th>
            <th>focus</th>
          </tr>
          {sessionTable.mindlogs.map((item, i) => (
            <tr key={i}>
              <td>{item.time}</td>
              <td>{item.entryid}</td>
              <td>{item.calm}</td>
              <td>{item.focus}</td>
            </tr>
            
          ))}
        </tbody>
      </table>

    </main>
  );
}
