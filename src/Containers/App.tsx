import React, { Component } from 'react';
import SignUp from './Pages/SignUp/SignUp';
import { IonApp } from '@ionic/react';

class App extends Component {
  render() {
    return (
      <IonApp>
        <SignUp/>
      </IonApp>
    );
  }
}

export default App;
