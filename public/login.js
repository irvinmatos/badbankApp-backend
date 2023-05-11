function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  
const tokenStorage = JSON.parse(window.localStorage.getItem('token')) || {};
const userStorage = JSON.parse(window.localStorage.getItem('user')) || {};

function saveUserData(data) {
  tokenStorage.setItem('token', data.token);
  userStorage.setItem('user', JSON.stringify(data.user));
  return { token: data.token, user: data.user };
}

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} saveUserData={saveUserData}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus} user={JSON.parse(window.localStorage.getItem('user'))}/> }
    />
  ) 
}

function LoginMsg({ user, setShow, setStatus }) {
  const [balance, setBalance] = React.useState(null);

  React.useEffect(() => {
    fetch(`/account/find/${user?.email}`)
      .then(response => response.json())
      .then(data => setBalance(data.balance))
      .catch(error => console.log(error));
  }, [user?.email]);

  return (
    <>
      <h5>Success welcome back {user?.name}</h5>
      <h6>You have a balance of {user?.balance !== null ? balance : 'loading...'}</h6>
      Please choose the following:
      <a href="#/deposit/">
        <button type="submit" className="btn btn-dark">Deposit Money</button>
      </a>
      <button type="submit" className="btn btn-light" onClick={() => { setShow(true); setStatus(''); }}>Authenticate again</button>
    </>
  );
  
}


function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
          props.saveUserData(data);
        } catch(err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      }); 
  }

  return (
    <>
      Email<br/>
      <input type="input" className="form-control" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      Password<br/>
      <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    </>
  );
}
