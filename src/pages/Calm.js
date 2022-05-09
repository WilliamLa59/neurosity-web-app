import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";

import axios from 'axios';
import { set } from "mongoose";

export function Calm() {

  const { user } = useNotion();
  const [brainwaves, setBrainWaves] = useState("");
  const [calm, setCalm] = useState(0);
  const [focus, setFocus] = useState(0);

  const [inputs, setInputs] = useState({
    newcalm: "",
    newfocus: "",
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    console.log(inputs);
    
    setCalm(inputs.newcalm);
    setFocus(inputs.newfocus);
    console.log()

    setInputs({
      calm: "",
      focus: ""
    })

    event.preventDefault();
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (calm != 0 && focus != 0){
      
      console.log("calm changed to: " + calm);
      console.log("focus changed to: " + focus);
      
      const payload = {
        brainwaves: brainwaves,
        calm: calm,
        focus: focus
      };
      
      console.log(payload);
  
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
  
    }
    
  },[calm, focus])

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }

  //   const brainSub = notion.brainwaves("raw").subscribe((brainwaves) => {
  //     const brainWaves = brainwaves.toString();
  //     setBrainWaves(brainWaves);  
  //     console.log(brainwaves);
  //   });

  //   const calmSub = notion.calm().subscribe((calm) => {
  //     const calmScore = Math.trunc(calm.probability * 100);
  //     setCalm(calmScore);
  //   });
    
  //   const focusSub = notion.focus().subscribe((focus) => {
  //     const focusScore = Math.trunc(focus.probability * 100);
  //     setFocus(focusScore);
  //   })

  //   return () => {
  //     brainSub.unsubscribe();
  //     calmSub.unsubscribe();
  //     focusSub.unsubscribe();
  //   };
  // }, [user, brainwaves, calm, focus]);

  return (
    <main className="main-container">
      {user ? <Nav /> : null}
      <div className="calm-score">
        <>&nbsp;{calm}%</> <div className="calm-word">Calm</div>
      </div>
      <div className="calm-score">
        <>&nbsp;{focus}%</> <div className="calm-word">focus</div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-input" >
            <input type='Text' name="newcalm" value={inputs.newcalm || ""} onChange={handleChange}/>
          </div>
          <div className="form-input">
            <input type='Text' name="newfocus" value={inputs.newfocus || ""} onChange={handleChange}/>
          </div>
          <button>submit</button>
        </form>
      </div>

    </main>
  );
}
