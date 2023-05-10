import { useEffect, useState } from 'react';
function localStorage(props) {
  localStorage.setItem('token', props.response.data.token);
  localStorage.setItem('user', JSON.stringify(props.response.data.user));   
}


function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  


  return (

    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg  setShow={setShow} setStatus={setStatus}/> }
    />
  ) 

}

function LoginMsg(props){
  
  return(<>
    
    <h5>Success welcome back {}</h5>

    <h6>You have a balance of {}</h6>

    Please choose the following:
    <a href="#/deposit/">
    <button type="submit" 
      className="btn btn-dark" >
        Deposit Money
    </button>
    </a>
    
  
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}



function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  
 
  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
      
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);               
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
        
        localStorage();  
    }); 
  }

  
  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}