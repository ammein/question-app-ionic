import React , { Component } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/react';
import Routes , {PageState, MyProps , ArrayRoutes} from '../../Utils/Declaration/Utils';
import SubMenu from './SubMenu/SubMenu';
import MyRoutes from '../../Utils/Routes';

interface Props extends MyProps {
    toolbarColor ? : string
}

interface State extends ArrayRoutes {
    allRoutes : any[]
}

class MainMenu extends Component<Props , State>{
    constructor(props : Props){
        super(props)
        this.state = {
            allRoutes : [...MyRoutes]
        }
    }
    render(){
        return (
            <IonMenu type="overlay" side="start" contentId="main" swiperGesture={false}>
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
        )
    }
}
export default MainMenu;