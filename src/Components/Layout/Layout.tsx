import React , { Component } from 'react';
import { Route, Switch , Router} from 'react-router-dom';
import {IonSplitPane, IonPage, IonRouterOutlet , IonApp, IonContent, IonRouterOutletInner} from '@ionic/react';
import MainMenu from '../Menu/MainMenu';
import MyRoutes from '../../Utils/Routes';
import AllRoutes, { MyUser, MyProps } from '../../Utils/Declaration/Utils';
import Context from '../../HOC/Context/Context';
import Aux from '../../HOC/Auxilliary/Auxilliary';

export var hashHistory = require("history").createHashHistory;

const createHashHistory = hashHistory();

declare const firebase : any;

interface Props extends MyProps {}

interface State {
    user : MyUser
}

class Layout extends Component<Props , State>{

    private interval : any;

    constructor(props : Props){
        super(props);
        this.state = {
            user : {
                displayName : "",
                email : "",
                uid : "",
                emailVerified : false
            }
        }
    }

    renderPath = () =>{
        return MyRoutes.map((val: AllRoutes, i: number, arr: AllRoutes[])=>{
            if(val.exact){
                return (
                    <Route exact key={i} path={val.path} component={val.component}></Route>
                )
            } else if ((/:/i).test(val.path ? val.path : "") && val.component && val.childrenComponent){
                return (
                    <Route key={i} path={val.path} render={(props) => (
                        <Aux>
                        <val.component {...props}>
                        {
                            val.childrenComponent!.map((value : AllRoutes , i : number , arr : AllRoutes[])=>{
                                return(
                                    <Route exact key={i} path={value.path} component={value.component}></Route>
                                )
                            })
                        }
                        </val.component>
                        </Aux>
                    ) }></Route>
                )
            } else if ((/:{1}/i).test(val.path ? val.path : "")){
                return (
                    <Route key={i} path={val.path} render={(props : any)=> <val.component {...props}/>}></Route>
                )
            }
            else{
                return (
                    <Route key={i} path={val.path} component={val.component}></Route>
                )
            }
        })
    }

    componentDidMount(){
        var react = this;
        firebase.auth().onAuthStateChanged(function (user : any) {
            if (user) {
                // Update user to pass onto context
                return react.setState({
                    user : {
                        uid : user.uid,
                        email : user.email,
                        displayName : user.displayName,
                        emailVerified : user.emailVerified,
                        photoURL: user.photoURL ? user.photoURL : ""
                    }
                })
            } else {
                return;
            }
        });
    }

    render(){
        return (
        <Router history={createHashHistory}>
            <Context.Provider value={{
                user : this.state.user
            }}>
                <IonSplitPane contentId="MyMenu">
                    <MainMenu />
                        <IonContent id="MyMenu">
                            {this.renderPath()}
                        </IonContent>
                </IonSplitPane>
            </Context.Provider>
        </Router>
        )
    }
}
export default Layout;