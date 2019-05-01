import React, { Component } from 'react';
import Main from './Pages/Main/Main';
import { IonApp, IonContent } from '@ionic/react';
import Aux from '../HOC/Auxilliary/Auxilliary';
import Layout from '../Components/Layout/Layout';
import Context from '../HOC/Context/Context';
import { MyContext } from '../Utils/Declaration/Utils';
import '../theme.css';
import Loading from '../Components/Loading/Loading';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

interface State {
  authenticated? : boolean,
  checkAuth? : () => void
}

declare const firebase : any;

class App extends Component<{}, State> {

  static contextType : any = Context;

  private checkUser : any;

  constructor(props : any){
    super(props);
    this.checkUser = () => {
      return this.setState((state: State) => {
        return {
          authenticated: true
        }
      })
    }
    this.state = {
      authenticated : undefined,
      checkAuth : this.checkUser
    };
  }

  componentDidMount(){
    var react = this;
    firebase.auth().onAuthStateChanged(function (user : any) {
      if (user && user.emailVerified) {
        return react.setState({
          authenticated : true
        });
      } else {
        return react.setState({
          authenticated: false
        });
      }
    });
  }


  render() {

    var render : any;

    if(this.state.authenticated === undefined){
      render = (
        <Loading stateStop={this.state.authenticated} dissapear={this.state.authenticated} />
      )
    }else if(this.state.authenticated === false){
      render = (
        <Context.Provider value={{
          recheckUser: this.state.checkAuth
        }}>
          <Main />
        </Context.Provider>
      )
    }else if(this.state.authenticated === true){
      render = (
        <Layout /> 
      )
    }

    return (
      <Aux>
        <IonApp>
          {render}
        </IonApp>
      </Aux>
    );
  }
}

export default App;
