import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";

import { CSVLink } from "react-csv";

import axios from 'axios';

//2:52pm 8mins before crash
//3:05pm 7mins before crash 2531 entries
//3:16pm 23
export function Calm() {

  const data2 = {
    label: 'powerByBand',
    data: {
      alpha: [
        0.4326838933650053,
        0.7011913998347046,
        1.3717684682104212,
        0.4043711439234614,
        0.4276277910286375,
        0.7343967679911133,
        0.4643529443786634,
        0.5012185195340365
      ],
      beta: [
        1.0473270376446968,
        0.6565360935142369,
        0.9905849734272257,
        0.4167252084581245,
        0.5812834985846604,
        0.9092642713573444,
        0.9963075404421067,
        1.0495665446734443
      ],
      delta: [
        0.46131690566460004,
        1.0030278320362798,
        0.8563781797682917,
        0.2911634678359473,
        0.5829804845703581,
        0.6714666592936025,
        0.37730719195446316,
        1.0851178080710937
      ],
      gamma: [
        0.22648773160183822,
        0.2171827127990081,
        0.2626969784220435,
        0.16349594919353772,
        0.17327387900192714,
        0.18990085940799623,
        0.22908540295491436,
        0.2537584109981627
      ],
      theta: [
        0.6434504807739541,
        0.936240328507981,
        0.8679595766147628,
        0.23662065697316603,
        0.6048174207817718,
        0.816112075629094,
        0.3367745804938397,
        1.1043745310136739
      ]
    }
  }

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

  const [brainwaves2, setBrainWaves2] = useState({});

  const [calm, setCalm] = useState(0);
  const [focus, setFocus] = useState(0);
  const [counter, setCounter] = useState(1);

  const [status, setStatus] = useState(false);
  const [statusText, setStatusText] = useState("Start Reading");

  const [signalQuality, setSignalQuality] = useState({});

  //creates session start date and time 
  var now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = now.getFullYear();
  const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: "2-digit"});
  now = mm + '/' + dd + '/' + yyyy + ", " + time;
  
  //main state object
  const [currentSession, setCurrentSession] = useState({"date": now, "firstName":"", "lastName":"", "mindlogs": []});
  // const [currentSession, setCurrentSession] = useState(testData);
  console.log(currentSession);

  //copy of main state object for table data
  const [sessionTable, setSessionTable] = useState(currentSession);
  const [tableData, setTableData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [csvData2, setCsvData2] = useState([]);

  // const [graphXAxis, setGraphXAxis]=useState([]);
  // const [CP3, setCP3]=useState([]);
  // const [C3, setC3]=useState([]);
  // const [F5, setF5]=useState([]);
  // const [PO3, setPO3]=useState([]);
  // const [PO4, setPO4]=useState([]);
  // const [F6, setF6]=useState([]);

  // const [C4, setC4]=useState([]);
  // const [CP4, setCP4]=useState([]);



  //test input state object
  const [inputs, setInputs] = useState({
    newcalm: "",
    newfocus: "",
  });

  const [testState, setTestState] = useState(false);

  const testStateHandleChange = () => {
    if (testState === false){
      setFirstName("");
      setLastName("")
      setCsvData([]);
      setTestState(true);
      console.log("TEST: " + testState);
    }else{
      setTestState(false);
      console.log("TEST: " + testState);
    }
  }

  useEffect(() => {
    if(testState === true){
      const interval = setInterval(
        // set number every 1s
        () => {
          setCalm(Math.floor(Math.random() * (100 - 1)+1)); 
          setFocus(Math.floor(Math.random() * (100 - 1)+1));
          setBrainWaves(data);
          setBrainWaves2(data2);
        },
        62.5
      );
      return () => {
        clearInterval(interval);
      };

    }
  }, [testState]);


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

      //resets nessesarry states back to empty
      setFirstName("");
      setLastName("")
      setCsvData([]);

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
    setBrainWaves2(data2);
  

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
      
      // const payload = currentSession; 
      // axios({
      //   url:'http://localhost:8080/save',
      //   method: 'POST',
      //   data: payload
      // })
      // .then(() => {
      //   console.log("Data has been sent to the server");
      // })
      // .catch(() => {
      //   console.log("Internal server error");
      // });;
      
      const csvData = [];
      const csvData2 = [];
      currentSession.mindlogs.map((item, i) => {
        for(var x=0; x < 16; x++){
          // for(var y =0; y<8; y++){                     filters out values that are too high or too low
          //   if (item.brainWaves.data[y][x] > 150){
          //     item.brainWaves.data[y][x] = 150
          //   }
          //   if(item.brainWaves.data[y][x] < -150){
          //     item.brainWaves.data[y][x] = -150
          //   } 
          // }
          csvData.push([item.time,item.entryId,item.calm, item.focus, 
            item.brainWaves.data[0][x],item.brainWaves.data[1][x],item.brainWaves.data[2][x],item.brainWaves.data[3][x],
            item.brainWaves.data[4][x],item.brainWaves.data[5][x],item.brainWaves.data[6][x],item.brainWaves.data[7][x],
            ]);
        } 

        for(var y=0; y < 8; y++){
          csvData2.push([item.time,item.entryId,item.calm, item.focus,
            item.brainWaves2.data["alpha"][y],item.brainWaves2.data["beta"][y],item.brainWaves2.data["delta"][y],item.brainWaves2.data["gamma"][y],item.brainWaves2.data["theta"][y]
          ]);
        }

      });

      csvData.unshift(["timestamp", "entryId", "calm", "focus", "CP3", "C3", "F5", "PO3", "PO4", "F6", "C4", "CP4"])
      csvData2.unshift(["timestamp", "entryId", "calm", "focus","alpha", "beta", "delta", "gamma", "theta"])
      setCsvData(csvData);
      setCsvData2(csvData2);

      setCurrentSession({"date": now, "firstName":"", "lastName":"", "mindlogs": []});
    }else{
      alert("Cannot Log a Session With 0 Entries");
    }
    setCounter(0);
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
    if (calm!==0 && focus !== 0){

      var current = new Date();
      const currentTime = current.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', });
      current = currentTime;

      setCurrentSession((prevState) => ({
        ...prevState,
      "mindlogs": [...prevState.mindlogs, {"time":current ,"entryId": counter, "calm":calm/100, "focus":focus/100, "brainWaves":brainwaves, "brainWaves2": brainwaves2}]
      // "mindlogs": [...prevState.mindlogs, {"time":current ,"entryId": counter, "calm":calm/100, "focus":focus/100, "brainWaves":data, "brainWaves2": data2}]
      }));
      setCounter(counter + 1);

    }
  },[calm]);

  

  //updates the table
  //on log it keeps the last session's data until a new session begins 
  // useEffect(() =>{
  //   if(currentSession.mindlogs.length !== 0){
      
  //     const tabledata = [];
  //     const graphxaxis = [];

  //     // const CP3values = [];
  //     // const C3values = [];
  //     // const F5values = [];
  //     // const PO3values = [];
  //     // const PO4values = [];
  //     // const F6values = [];
  //     // const C4values = [];
  //     // const CP4values = [];

  //     currentSession.mindlogs.map((item, i) => {
  //       for(var x=0; x < 16; x++){
  //         tabledata.push([item.time,item.entryId,item.calm, item.focus, item.brainWaves.data[0][x],item.brainWaves.data[1][x],item.brainWaves.data[2][x],item.brainWaves.data[3][x],item.brainWaves.data[4][x],item.brainWaves.data[5][x],item.brainWaves.data[6][x],item.brainWaves.data[7][x]]);
  //     //     CP3values.push(item.brainWaves.data[0][x]);
  //     //     C3values.push(item.brainWaves.data[1][x]);
  //     //     F5values.push(item.brainWaves.data[2][x]);
  //     //     PO3values.push(item.brainWaves.data[3][x]);
  //     //     PO4values.push(item.brainWaves.data[4][x]);
  //     //     F6values.push(item.brainWaves.data[5][x]);
  //     //     C4values.push(item.brainWaves.data[6][x]);
  //     //     CP4values.push(item.brainWaves.data[7][x]);
  //       }
  //     //   graphxaxis.push("","","","","","","","","","","","","","","","",);
  //     })

  //     setTableData(tabledata);
  //     setSessionTable(currentSession);

  //     // setGraphXAxis(graphxaxis);
  //     // setCP3(CP3values);
  //     // setC3(C3values);
  //     // setF5(F5values);
  //     // setPO3(PO3values);
  //     // setPO4(PO4values);
  //     // setF6(F6values);
  //     // setC4(C4values);
  //     // setCP4(CP4values);

  //     const csvData = [...tableData];
  //     csvData.unshift(["timestamp", "entryId", "calm", "focus", "CP3", "C3", "F5", "PO3", "PO4", "F6", "C4", "CP4"])
  //     setCsvData(csvData);
      
  //   }
  // },[currentSession]);


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
        const brainwavedata = Math.trunc(brainwaves.data);
        setBrainWaves(brainwaves);  
        // setBrainWaves(data);  
      });

      const brainSub2 = notion.brainwaves("powerByBand").subscribe((brainwaves) => {
        const brainwavedata2 = Math.trunc(brainwaves.data);
        setBrainWaves2(brainwaves);  
        // setBrainWaves2(data2); 
      });

      const signalSub = notion.signalQuality().subscribe((signalQuality) => {
        setSignalQuality(signalQuality);
        console.log(signalQuality);
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
        signalSub.unsubscribe();
        calmSub.unsubscribe();
        focusSub.unsubscribe();
      };
    }
    
  }, [status]);


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
            <button className="input-btn simulate-btn" onClick={testStateHandleChange}>Simulate Values</button>
            {/* <form onSubmit={testHandleSubmit}>
              <div className="form-input" >
                <input type='Text' name="newcalm" value={inputs.newcalm || ""} onChange={testHandleChange} placeholder="Set Calm"/>
              </div>
              <div className="form-input">
                <input  type='Text' name="newfocus" value={inputs.newfocus || ""} onChange={testHandleChange} placeholder="Set Focus"/>
              </div>
              
              <button className="input-btn simulate-btn">Simulate New Values</button>
            
            </form> */}
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
          

          <CSVLink className="btn btn-primary" style={csvData.length !== 0 ? {pointerEvents: "auto" } : {pointerEvents: "none", background: "rgb(229, 229, 229)"}} data={csvData} filename={firstName+"_"+lastName+" Brainwaves.csv"}>Download Raw</CSVLink>
          <CSVLink className="btn btn-primary" style={csvData2.length !== 0 ? {pointerEvents: "auto" } : {pointerEvents: "none", background: "rgb(229, 229, 229)"}} data={csvData2} filename={firstName+"_"+lastName+" Brainwaves2.csv"}>Download PowerByBand</CSVLink>
        </div>
      </section>


      <section className="display-dashboard">
        
          <div>
            <table>
              {/* {signalQuality.map((signal, x) =>{
                return(
                  
                  <p>Cp3: {signal[1]}</p>
                );
              })}
             */}
                  
            </table>
          </div>

        <div className="gauge-container">
          <div className="calm-score">
            <>&nbsp;{calm}%</> <div className="calm-word">Calm</div>
          </div>
          <div className="calm-score">
            <>&nbsp;{focus}%</> <div className="calm-word">focus</div>
          </div>
        </div>
        
        {/* <Charts graphXAxis={graphXAxis} CP3={CP3} C3={C3} F5={F5} PO3={PO3} PO4={PO4} F6={F6} C4={C4} CP4={CP4}/> */}

        {/* <div className="table-container">
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
        </div> */}
      </section>

    </main>
  );
}
            