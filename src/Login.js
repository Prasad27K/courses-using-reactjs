import './App.css';
import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const obj = {
        "userName": userName,
        "password": password
    }
    const handleSignIn = () => {
        axios.post("http://localhost:3000/api/signin/", obj)
        .then((response) => {
            console.log(response.data.token);
            sessionStorage.setItem('token', response.data.token);
            history.push('/RenderSyllabus');
        })
        .catch((error) => {
            console.log(error);
        })
    } 
    return (
        <div>
            <input type="text" placeholder="Email" onChange={handleUserNameChange}></input>
            <br></br>
            <input type="password" placeholder="Password" onChange={handlePasswordChange}></input>
            <br></br>
            <button onClick={handleSignIn}>Login</button>
        </div>
    )
}
export default Login;