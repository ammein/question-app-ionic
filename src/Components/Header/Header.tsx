import React , {useEffect , useState} from 'react';
import MyRoutes from '../../Utils/Routes';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonBackButton, IonButton, IonIcon } from '@ionic/react';

const Header = (props : any) => {

    const [state, setState] = useState({
        title : ""
    } as any)

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
            </IonToolbar>
        </IonHeader>
    );
}
export default Header;