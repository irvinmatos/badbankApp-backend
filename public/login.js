/*
const FBAuth = require('./firebase-config.js');
const { auth } = require('../../../Module26/Authenticate Express Routes/admin.js');
const { signInWithEmailAndPassword } = require('firebase/auth');
*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";


function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  const tokenStorage = JSON.stringify(window.localStorage.getItem('token')) || {};
  const userStorage = JSON.stringify(window.localStorage.getItem('user')) || {};
  function saveUserData(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { token: tokenStorage, user: userStorage };
  }


  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? (
        <LoginForm 
        setShow={setShow} 
        setStatus={setStatus} 
        saveUserData={saveUserData}
        /> 

      ):(
        <LoginMsg 
        setShow={setShow} 
        setStatus={setStatus} 
        user={JSON.stringify(localStorage.getItem('user'))}
        
        /> 
      )}
    />
  ) 
}

function LoginMsg(user) {
  const [balance, setBalance] = React.useState(null);

  React.useEffect(() => {
    fetch(`/account/findone/${'matos.irvin@gmail.com'}`)
      .then(response => response.json())
      .then(data => setBalance(data.balance))
      .then(user => setBalance(user.name))
      .catch(error => console.log(error));
  }, ['matos.irvin@gmail.com']);

  function removeUserData(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.setShow(true);
    return;
  }

  
 
  return (
    <>
      <h5>Success welcome back, {user?.name}</h5>
      <h6>You have a balance of {balance !== null ? balance : 'loading...'}</h6>
      Please choose the following:<br />
      <a href="#/deposit/" className="card-link">Deposit Money </a> <br />
      <a href="#/withdraw/" className="card-link">withdraw Money </a> <br />
      <a href="#/transfer/" className="card-link">transfer Money </a> <br />
      <a href="#/login/">
      <button type="submit"  className="btn btn-light" onClick={removeUserData}>Log Out</button>
      </a>
    </>
  );
  
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function loginGoogle(){
    
    FBAuth.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userCredential)=>{
      console.log(userCredential);
    })
  }

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.stringify(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
          //props.saveUserData(data);
        } catch(err) {
          props.setStatus(text);
          console.log('err:', text);
        } 
      }); 
  }

  function fbhandle () {
    console.log(email,password);
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    })

  }

  

  return (
    <>
      Email<br/>
      <input type="input" className="form-control" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      Password<br/>
      <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
      
      <button type="submit" className="btn btn-light" onClick={loginGoogle}>Login with Google</button>
    </>
  );
}
