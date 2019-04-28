import React , { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {IonSplitPane, IonPage, IonRouterOutlet , IonApp, IonContent} from '@ionic/react';
import MainMenu from '../Menu/MainMenu';
import MyRoutes from '../../Utils/Routes';
import AllRoutes, { MyUser } from '../../Utils/Declaration/Utils';
import Context from '../../HOC/Context/Context';

var hashHistory = require("history").createHashHistory;

const createHashHistory = hashHistory();

declare const firebase : any;

interface Props {}

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
            }else{
                return (
                    <Route key={i} path={val.path} component={val.component}></Route>
                )
            }
        })
    }
    render(){
        return (
            <IonApp>
                <Router history={createHashHistory}>
                    <IonSplitPane contentId="main">
                        <MainMenu />
                            <IonContent id="main">
                                <Switch>
                                    {this.renderPath()} 
                                </Switch>
                            </IonContent>
                    </IonSplitPane>
                </Router>
            </IonApp>
        )
    }
}
export default Layout;