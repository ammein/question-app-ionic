import React, { Component } from 'react';
import Main from './Pages/Main/Main';
import { IonApp, IonContent } from '@ionic/react';
import Aux from '../HOC/Auxilliary/Auxilliary';
import Layout from '../Components/Layout/Layout';

var hashHistory = require("history").createHashHistory;

const createHashHistory = hashHistory();

declare var firebase : any;

interface State {
  authenticated ? : boolean
}

class App extends Component<{} , State> {

  constructor(props : any){
    super(props);

    this.state = {
      authenticated : false
    }
  }

  checkUser=()=>{
    var react = this;
    firebase.auth().onAuthStateChanged(function (user : any) {
      if (user) {
        return react.setState({
          authenticated: true
        })
      } else {
        return react.setState({
          authenticated: false
        })
      }
    });
  }

  componentDidMount(){
    this.checkUser();
  }


  render() {
    return (
      <Aux>
      <IonApp>
        {this.state.authenticated ? <Layout/> : <Main/>}
      </IonApp>
      </Aux>
    );
  }
}

export default App;
