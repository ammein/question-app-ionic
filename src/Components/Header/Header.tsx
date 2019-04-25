import React , {useEffect , useState} from 'react';
import MyRoutes from '../../Utils/Routes';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/react';

interface MyState {
    title? : string
}

const Header = (props : any) => {

    const [state, setState] = useState<MyState>({
        title : ""
    })

    useEffect(() => {
      const title : string = (window.location.hash.length > 1) ? window.location.hash.replace("#" , "") : window.location.pathname;
        for (var property in MyRoutes){
            if(MyRoutes.hasOwnProperty(property)){
                if(MyRoutes[property].path === title){
                    return setState({
                        title : MyRoutes[property].title
                    })
                }
            }
        }
    }, [])

    return(
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    {
                        props.back ? 
                        <IonBackButton 
                            goBack={(()=> {})}
                            defaultHref={props.currentPath}>

                        </IonBackButton>
                        :
                        <IonMenuButton>
                            <IonButton>
                                <IonIcon name="menu" slot="start"></IonIcon>
                            </IonButton>
                        </IonMenuButton>
                    }
                </IonButtons>
                <IonTitle>{state.title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}
export default Header;