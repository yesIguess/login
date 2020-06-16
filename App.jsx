import React from 'react';
import Auth0Lock from 'auth0-lock'

class App extends React.Component {

  constructor() {
    super();

    let _self = this;

    _self.state = {
      authenticated: sessionStorage.getItem("user") ? true : false,
      user: sessionStorage.getItem("user") ? sessionStorage.getItem("user").given_name : null
    };

    _self.wm = new WeakMap();
    _self.privateStore = {};
  }

  componentDidMount() {
    let _self = this;

    _self.lock = new Auth0Lock(
        'rBRLT9fc3OaiU4ws2kb5FYQ08937rEMM',
        'dev-akvjo65d.eu.auth0.com',
        {
          redirect: false
        }
    );

    _self.wm.set(this.privateStore, {
      appName: '2'
    });

    _self.lock.on("authenticated", function (authResult) {

       function lock(error, profileResult)
      {
        if (error) {
          console.log("Błąd");
          return;
        }

        let accessToken = authResult.accessToken;
        let profile = profileResult;

        _self.setState({
          authenticated: true,
          user: profile.given_name
        })

        sessionStorage.setItem("token", accessToken);
        sessionStorage.setItem("user", profile);
      }
      console.log(authResult);

      _self.lock.getUserInfo(authResult.accessToken, lock);
    });
  }

  render() {
    let _self = this;

    return (
      <div>
        {(_self.state.authenticated ? <div className={'auth-area'}>
          <p>{_self.state.user}</p>
          <button onClick={function() {_self.lock.logout(); sessionStorage.clear(); _self.setState({authenticated: false, user: null});}}>Wyloguj</button>
        </div> : <button onClick={function () {
          _self.lock.show();
        }}>
          Zaloguj
        </button>)}
    </div>
    );
  }
}

export default App;