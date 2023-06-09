function NavBar(){
  return(
      <>
      <nav className="navbar navbar-expand-md navbar-dark ">
            <a className="navbar-brand" href="#">BadBank</a>
            <button className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="nav navbar-nav">
                <li className="nav-item" id="target">
                  <a className="nav-link" href="#/deposit/">Deposit</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/withdraw/">Withdraw</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/balance/">Balance</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/alldata/">AllData</a>
                </li>   
                <li className="nav-item">
                  <a className="nav-link" href="#/newlogin/"> New Login</a>
                </li>     
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item" id="target">
                  <a className="nav-link" href="#/CreateAccount/">Create Account</a>
                </li>
              <li className="nav-item ml-auto">
                  <a className="nav-link" href="#/login/">Login</a>
              </li> 
              </ul>
            </div>
          </nav>

          </>
        );

    
}