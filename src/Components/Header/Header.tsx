import React , {useEffect , useState, CSSProperties} from 'react';
import AllRoutes from '../../Utils/Routes';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonBackButton, IonButton, IonIcon, IonTitle, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import MyRoutes, { MyProps, ChildrenRoutes } from '../../Utils/Declaration/Utils';

interface MyState {
    title? : string,
    segment ?: {
        [propName : number] : ChildrenRoutes[]
    }
}

interface Props extends MyProps{
    goBack? : () => void,
    style? : CSSProperties
}

const Header = (props : Props) => {

    const [state, setState] = useState<MyState>({
        title : ""
    })

    const renderTitle = () =>{
        const title: string = (window.location.hash.length > 1) ? window.location.hash.replace("#", "") : window.location.pathname;
        var checkNested = AllRoutes.filter((val, i, arr) => val.childrenComponent).length > 0;
        if (checkNested) {
            var convertRoutes = AllRoutes.reduce((init: MyRoutes[], next: MyRoutes) => next.childrenComponent ? init.concat(next.childrenComponent).concat(next) : init.concat(next), [])
            return convertRoutes.map((val: MyRoutes, i: number, arr: MyRoutes[]) => {
                if (val.childrenComponent) {
                    let arraySegment = ([] as MyRoutes[]).concat(val.childrenComponent)
                        .map((value: MyRoutes, i: number, arr: MyRoutes[]) => {
                            return Object.assign({
                                parent: val.path
                            }, value);
                        });
                    setState({
                        segment: {
                            [val.path!.replace(/:|\//g, "") as string]: arraySegment
                        }
                    })
                }
                return val;
            }).forEach((val: MyRoutes, i: number, arr: MyRoutes[]) => {
                if (val.path === title) {
                    return setState((prevState: MyState) => {
                        return {
                            title: val.title,
                            segment: undefined
                        }
                    })
                } else if (props.location && val.path === props.location.pathname.replace(props.match.url, props.match.path)) {
                    return setState((prevState: any) => {
                        if (val.enableSegment) {
                            return {
                                title: val.title,
                                segment: {
                                    [props.match.path.replace(/:|\//g, "")]: prevState.segment[props.match.path.replace(/:|\//g, "")]
                                }
                            }
                        }
                        return {
                            title: val.title,
                            segment: undefined
                        }
                    })
                }
            })
        } else {
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
    }

    useEffect(() => {
        console.log("Running Use Effect");
        renderTitle();

        return () => {
            console.log("Running After Effect");
            renderTitle();
        }

    }, [])

    var Segments: JSX.Element[] | null = null;

    if (state.segment && state.segment![props.match.path.replace(/:|\//g, "")]){
        Segments = state.segment![props.match.path.replace(/:|\//g, "")].map((val: MyRoutes, i: number, arr: MyRoutes[]) => {
            return (
                <IonSegmentButton key={i} value={val.title}>
                    {
                        val.icon ?
                            <IonIcon name={val.icon}></IonIcon>
                            :
                            <IonLabel>{val.title}</IonLabel>
                    }
                </IonSegmentButton>
            )
        })
    }

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
            {props.enableToolbar ? 
            <IonToolbar>
                <IonSegment onIonChange={(e: any) => console.log('Segment selected', e.detail.value)}>
                {Segments}
                </IonSegment>
            </IonToolbar>
                :
                null
            }
        </IonHeader>
    );
}
export default Header;