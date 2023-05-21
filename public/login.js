const {useEffect, useState} = require('react');
const { Link, useNavigate } = require('react-router-dom');
var {auth, signInWithGoogle, signInWithEmailAndPassword} = require("../config/firebase-config.js");
var { getAuth, logInWithEmailAndPassword} = require('firebase/auth');
const {useAuthState} = require('react-firebase-hooks/auth');
const [user, loading, error] = useAuthState(auth);
//const auth = require('../config/firebase-config');
const app = require('../config/firebase-config');




function Login() {
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  

 



  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /> <br />
        <button className="login__btn" onClick={() => signInWithEmailAndPassword(auth, email, password)}>
          Login
        </button>

        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}