import React, { Component } from 'react';
import Main from './Pages/Main/Main';
import { IonApp, IonContent } from '@ionic/react';
import Aux from '../HOC/Auxilliary/Auxilliary';
import Layout from '../Components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Aux>
      <IonApp>
        <Main/>
        <IonContent>
          <Layout/>
        </IonContent>
      </IonApp>
      </Aux>
    );
  }
}

export default App;
