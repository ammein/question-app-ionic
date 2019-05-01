import React , { Component } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/react';
import Routes , {PageState, MyProps , ArrayRoutes} from '../../Utils/Declaration/Utils';
import SubMenu from './SubMenu/SubMenu';
import MyRoutes from '../../Utils/Routes';
import Aux from '../../HOC/Auxilliary/Auxilliary';
import context from '../../HOC/Context/Context';
import classes from './MainMenu.css';

interface Props extends MyProps {
    toolbarColor ? : string,
    disableMenu? : any
}

interface State extends ArrayRoutes {
    allRoutes : any[]
}

class MainMenu extends Component<Props , State>{

    static MyContext = context;

    constructor(props : Props){
        super(props)
        this.state = {
            allRoutes : [...MyRoutes]
        }
    }

    render(){
        return (
            <IonMenu type="push" side="start" contentId="MyMenu" swipeGesture={true} style={{
                color : "white"
            }}>
                <IonHeader>
                    <IonToolbar style={this.props.toolbarColor ? {
                        "--background" : `var(--ion-color-${this.props.toolbarColor})`
                    } : undefined}>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent class={classes.MenuContent}>
                    <IonList>
                        <SubMenu data={this.state.allRoutes}/>
                    </IonList>
                </IonContent>
            </IonMenu>
        )
    }
}
export default MainMenu;