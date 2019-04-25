import React , { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {IonSplitPane, IonPage, IonRouterOutlet , IonApp, IonContent} from '@ionic/react';
import MainMenu from '../Menu/MainMenu';
import MyRoutes from '../../Utils/Routes';
import AllRoutes from '../../Utils/Declaration/Utils';

var hashHistory = require("history").createHashHistory;

const createHashHistory = hashHistory();

interface Props {}

interface State {}

class Layout extends Component<Props , State>{
    constructor(props : Props){
        super(props);
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