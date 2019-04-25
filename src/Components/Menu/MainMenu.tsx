import React , { Component } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/react';
import Routes , {PageState, MyProps , ArrayRoutes} from '../../Utils/Declaration/Utils';
import SubMenu from './SubMenu/SubMenu';
import MyRoutes from '../../Utils/Routes';
import Aux from '../../HOC/Auxilliary/Auxilliary';
import context from '../../HOC/Context/Context';

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
            <Aux>
            <IonMenu type="push" side="start" contentId="main" swipeGesture={true} style={{
                color : "white"
            }}>
                <IonHeader>
                    <IonToolbar color={this.props.toolbarColor ? this.props.toolbarColor : "primary"}>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <SubMenu data={this.state.allRoutes}/>
                    </IonList>
                </IonContent>
            </IonMenu>
            </Aux>
        )
    }
}
export default MainMenu;