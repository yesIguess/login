import React from 'react';
import Auth0Lock from 'auth0-lock'

class App extends React.Component {

  constructor() {
    super();

    let _self = this;

    _self.wm = new WeakMap();
    _self.privateStore = {};

    _self.lock = new Auth0Lock(
        'rBRLT9fc3OaiU4ws2kb5FYQ08937rEMM',
        'dev-akvjo65d.eu.auth0.com'
    );

    _self.wm.set(this.privateStore, {
      appName: "2"
    });

    _self.lock.on("authenticated", function (authResult) {
      _self.lock.getUserInfo(authResult.accessToken, function (error, profileResult) {
        if (error) {
          console.log("Błąd");
          return;
        }

        let accessToken = authResult.accessToken;
        let profile = profileResult;

        // Update DOM
      });
    });

    console.log(_self.accessToken, _self.profile);
  }

  render() {
    let _self = this;

    return (
        <><button onClick={function () {
          _self.lock.show();
        }}>
          Zaloguj
        </button>
      <button onClick={function() {_self.lock.logout();}}></button></>);
  }
}

export default App;
