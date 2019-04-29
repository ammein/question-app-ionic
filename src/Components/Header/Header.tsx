import React , {useEffect , useState, CSSProperties} from 'react';
import AllRoutes from '../../Utils/Routes';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/react';
import MyRoutes, { MyProps } from '../../Utils/Declaration/Utils';

interface MyState {
    title? : string
}

interface Props extends MyProps{
    goBack? : () => void,
    getTitle ?: string,
    style? : CSSProperties
}

const Header = (props : Props) => {

    const [state, setState] = useState<MyState>({
        title : ""
    })

    useEffect(() => {
        console.log("Running Use Effect");
      const title : string = (window.location.hash.length > 1) ? window.location.hash.replace("#" , "") : window.location.pathname;

      if(props.getTitle){
          return setState({
              title : props.getTitle
          })
      }else {
          return AllRoutes.forEach((val: MyRoutes, i: number, arr: MyRoutes[]) => {
              if (val.path === title) {
                  return setState((prevState: MyState) => {
                      return {
                          title: val.title
                      }
                  })
              }
          })
      }
    }, [])

    return(
        <IonHeader style={props.style ? props.style : {} as any}>
            <IonToolbar>
                <IonButtons slot="start">
                    {
                        props.back ? 
                        <IonBackButton 
                            goBack={props.goBack ? props.goBack : () => {}}
                            onClick={props.goBack ? props.goBack : undefined}
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