import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";

import { CSVLink } from "react-csv";

import axios from 'axios';


export function Calm() {

  const data = {
    label: 'raw',
    data: [
      [
          1,   4.851055413759571,
         2.7564288713972513, -0.5027899221971044,
         -2.738312652550817, -1.4222768509324195,
         3.7224881424127774,  10.026623768677425,
         13.387940036943913,   10.26958811063134,
        0.40214439930276313,  -10.90689891807639,
         -16.32031531728357,  -13.21110292437311,
         -4.346339152926361,   5.098462672115731
      ],
      [
         1,   1.352550875105505,
         0.6428681224481866,  0.3647622839064659,
          1.106405158893898,    3.33535030106603,
          6.439447624257519,   8.453867322080404,
          7.755719477492251,  3.8854840128526726,
         -2.468418708869076,  -8.666576946507902,
        -11.279063910921169,   -9.32163910159064,
        -4.6549399985975555, 0.22830321396497988
      ],
      [
         1,   5.845156697083605,
         3.8819440822537112,   1.452431055127227,
        -0.5878084105038387, -0.7746780077287738,
         1.8154316196085094,   6.074662974618359,
          9.322430831260775,   8.910160063433407,
         3.5874046672323043,  -4.554187036159066,
          -10.5813322711113, -11.267696723897789,
         -6.818338145262863,  0.6177864457464617
      ],
      [
        1, -0.3068494494059635,
         -2.2075671327003255,  -3.776991642244289,
          -3.708252867923816, -1.2505125622236009,
          3.2487010722502587,   7.931368090269462,
          10.511652358411597,   9.297157466389192,
           4.118487064147775,  -2.970255165231891,
          -8.603434324519576, -10.495401970387743,
          -8.913968355428027,  -5.576315727924461
      ],
      [
        1, 1.9781686568610883,
        2.4009012312957907, 2.3444623435812657,
         2.017191526524595,  2.021880260660721,
         2.982232584662937,  4.815498699074363,
        6.7093290202119835,  7.201157697368587,
         5.116090777276677, 0.6675802498302112,
        -4.274751517565271, -7.425134286013973,
        -7.838523284654038, -5.779233789541195
      ],
      [
         1,   6.831919893235682,
          6.468141714172544,   5.147606136919876,
          4.117592132996127,   4.788874365858218,
          7.116782027901927,    9.33554991116211,
          9.233167024756574,   5.130966403760715,
        -2.8162586562506586,  -11.22160733448037,
        -15.538132012307846, -13.939535958562475,
          -7.83032193319038, -0.5139467086717411
      ],
      [
        1,  1.6368537502872518,
          2.022946637839514,   0.940183871324582,
        -0.2837858448921892,  0.3170369574339986,
          3.778225479624427,   8.805770181583913,
         12.446309024446833,  11.648691354684154,
          5.113617281379798,  -4.345975093596486,
         -11.05811376487729, -11.719256256733335,
         -7.336025188705039,  -1.276174494743728
      ],
      [
          1,    8.201842402616839,
          5.517128178717949,   1.2864058791627557,
        -1.5101995538838966, -0.19819079250913285,
          5.195437241439434,   11.512563735679437,
         14.388370410845482,   10.711863367882668,
         0.8428177428317678,  -10.126402143316568,
         -15.75585412249734,  -13.887360795976967,
         -6.836657125920971,   1.1706118773123455
      ]
    ],
    info: {
      channelNames: [
        'CP3', 'C3',
        'F5',  'PO3',
        'PO4', 'F6',
        'C4',  'CP4'
      ],
      notchFrequency: '60Hz',
      samplingRate: 256,
      startTime: 1628194299499
    }
  }

  //individual states
  const { user } = useNotion();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [brainwaves, setBrainWaves] = useState({});
  const [calm, setCalm] = useState(0);
  const [focus, setFocus] = useState(0);
  const [counter, setCounter] = useState(0);

  const [status, setStatus] = useState(false);
  const [statusText, setStatusText] = useState("Start Reading");


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
  const [tableData, setTableData] = useState([]);
  const [csvData, setCsvData] = useState([]);


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
      setStatusText("Stop Reading");
      setStatus(true);
      console.log("Status: " + status);
    }else{
      setStatusText("Start Reading")
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
  
    setBrainWaves(data);
    
  

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
    if(currentSession.mindlogs.length !== 0){
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
      
      // // window.location.reload();
      setCurrentSession({"date": now, "firstName":"", "lastName":"", "mindlogs": []});
    }else{
      alert("Cannot Log a Session With 0 Entries");
    }
    
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
      const currentTime = current.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', });
      current = currentTime;

      setCurrentSession((prevState) => ({
        ...prevState,
        "mindlogs": [...prevState.mindlogs, {"time":current ,"entryId": counter, "calm":calm/100, "focus":focus/100, "brainWaves":brainwaves}]
      }));
    }
    
  },[calm, focus, brainwaves]);


  //updates the table
  //on log it keeps the last session's data until a new session begins 
  useEffect(() =>{
    if(currentSession.mindlogs.length !== 0){
      
      const tableData = [];
      currentSession.mindlogs.map((item, i) => {
        for(var x=0; x < 16; x++){
          tableData.push([item.time,item.entryId,item.calm, item.focus, item.brainWaves.data[0][x],item.brainWaves.data[1][x],item.brainWaves.data[2][x],item.brainWaves.data[3][x],item.brainWaves.data[4][x],item.brainWaves.data[5][x],item.brainWaves.data[6][x],item.brainWaves.data[7][x]])
        }
      })

     
      setTableData(tableData);
      setSessionTable(currentSession);

      const csvData = [...tableData];
      csvData.unshift(["timestamp", "entryId", "calm", "focus", "CP3", "C3", "F5", "PO3", "PO4", "F6", "C4", "CP4"])
      setCsvData(csvData);
      
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
        setBrainWaves((brainwaves));  
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
      
      <section className="main-dashboard">
        
        <section className="nav-container">
          {user ? <Nav /> : null}
        </section>

        <div className="inputs-container">

          <section className="start-btn-container">
            <button className="start-btn" style={status ? {background: "red"} : {background: "limegreen"}}onClick={statusHandleChange}>{statusText}</button>
          </section>

          {/*For Database testing */}
          <section style={{display: "block"}}>
            <form onSubmit={testHandleSubmit}>
              <div className="form-input" >
                <input type='Text' name="newcalm" value={inputs.newcalm || ""} onChange={testHandleChange} placeholder="Set Calm"/>
              </div>
              <div className="form-input">
                <input  type='Text' name="newfocus" value={inputs.newfocus || ""} onChange={testHandleChange} placeholder="Set Focus"/>
              </div>
              
              <button className="input-btn simulate-btn">Simulate New Values</button>
            
            </form>
          </section>
          {/*For Database testing */}


          <section>
            <form className="name-form" onSubmit={nameHandleSubmit}>
              <div className="form-input">
                <input className="fname-input" type='Text' name="newfirstName" value={nameinputs.newfirstName || ""} onChange={nameHandleChange} placeholder="First Name" required/>
              </div>
              <div className="form-input">
                <input className="lname-input" type='Text' name="newlastName" value={nameinputs.newlastName || ""} onChange={nameHandleChange} placeholder="Last Name" required/>
              </div>
              <div>
                <button className="input-btn log-btn">Log</button>
              </div>
              
            </form>
          </section>
          

          <CSVLink className="btn btn-primary" style={sessionTable.firstName !== "" && sessionTable.lastName !== "" ? {pointerEvents: "auto" } : {pointerEvents: "none", background: "rgb(229, 229, 229)"}} data={csvData} filename={sessionTable.firstName+" "+sessionTable.lastName+" Brainwaves.csv"}>Download</CSVLink>
        </div>
      </section>


      <section className="display-dashboard">
        
        <div className="gauge-container">
          <div className="calm-score">
            <>&nbsp;{calm}%</> <div className="calm-word">Calm</div>
          </div>
          <div className="calm-score">
            <>&nbsp;{focus}%</> <div className="calm-word">focus</div>
          </div>
        </div>

        <div className="table-container">
          <table className="table table-striped">
            <thead>
              <tr className="table-head">
                <th>timestamp</th>
                <th>entryId</th>
                <th>calm</th>
                <th>focus</th>
                <th>CP3</th>
                <th>C3</th>
                <th>F5</th>
                <th>PO3</th>
                <th>PO4</th>
                <th>F6</th>
                <th>C4</th>
                <th>CP4</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((log, x)=>{
                return(
                  <tr key={x}>
                    <td>{log[0]}</td>
                    <td>{log[1]}</td>
                    <td>{log[2]}</td>
                    <td>{log[3]}</td>
                    <td>{log[4]}</td>
                    <td>{log[5]}</td>
                    <td>{log[6]}</td>
                    <td>{log[7]}</td>
                    <td>{log[8]}</td>
                    <td>{log[9]}</td>
                    <td>{log[10]}</td>
                    <td>{log[11]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}
            