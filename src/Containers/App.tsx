import React, { Component } from 'react';
import Main from './Pages/Main/Main';
import { IonApp, IonContent } from '@ionic/react';
import Aux from '../HOC/Auxilliary/Auxilliary';
import Layout from '../Components/Layout/Layout';
import Context from '../HOC/Context/Context';
import { MyContext } from '../Utils/Declaration/Utils';
import '../theme.css';

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
          authenticated: undefined
        }
      })
    }
    this.state = {
      authenticated : false,
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
    return (
      <Aux>
          {this.state.authenticated ? 
            <Layout /> 
            : 
            <Context.Provider value={{
              recheckUser: this.state.checkAuth
            }}>
              <Main />
            </Context.Provider>
          }
      </Aux>
    );
  }
}

export default App;
