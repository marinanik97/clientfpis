import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./style/LogIn.css";
import AuthContext from "../contexts/auth/AuthContext";
import {Redirect} from "react-router-dom";
import toast from '../utils/toast'

const LogIn = () => {
    const {getToken, setToken} = AuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [getRedirect, setRedirect] = useState();

    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }

    const LogIn = () => {
      fetch('http://localhost:9000/login', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email,password})})
          .then(res => res.json())
          .then(res => {
              if(res && res.err){
                  toast.error("Neuspešno")
              }else{
                  toast.success("Uspešno ulogovani")
                  setRedirect(`/reports`)
                  setToken(res.token);
              }
          })
  }



  return (
    <div className="login">
        <div className="login_container" style={{position: "relative"}}>
        <TextField
          type="text"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
              setError();
              setEmail(e.target.value)
          }}
        />
        <TextField
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
              setError();
              setPassword(e.target.value)
          }}
        />
        <Button onClick={LogIn} className="myButton">
            LOG IN
          </Button>

        {error &&
            <span style={{position: "absolute", bottom: 0, color: 'red'}}>{error}</span>
        }
        </div>
    </div>
  );
};

export default LogIn;
