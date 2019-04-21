import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonMenuToggle, IonItem, IonRippleEffect, IonThumbnail, IonImg, IonIcon, IonLabel } from '@ionic/react';
import {Link} from 'react-router-dom';

const SubMenu = (props : any) => {
    return(
        <Aux>
            {props.data.map((value : any , i : number , arr : any[])=>{
                return (
                    <IonMenuToggle key={i} autoHide={value.autoHide ? true : false}>
                    {value.link ? 
                        <Link to={value.path}>
                            <IonItem>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                                {value.thumbnail ? 
                                    <IonThumbnail slot="start">
                                        <IonImg src={value.thumbnail}/>
                                    </IonThumbnail>
                                    :
                                    null
                                }
                                {
                                    value.icon ?
                                    <IonIcon name={value.icon} slot="start"></IonIcon>
                                    :
                                    null
                                }
                                <IonLabel>
                                    {value.title}
                                </IonLabel>
                            </IonItem> 
                        </Link>  
                        :
                        <IonItem onClick={props.getLink ? ((e : any)=> props.pushLink(e , props.getLink)) : undefined}>
                            <IonRippleEffect type="unbounded"></IonRippleEffect>
                            {value.thumbnail ?
                                <IonThumbnail slot="start">
                                    <IonImg src={value.thumbnail} />
                                </IonThumbnail>
                                :
                                null
                            }
                            {
                                value.icon ?
                                    <IonIcon name={value.icon} slot="start"></IonIcon>
                                    :
                                    null
                            }
                            <IonLabel>
                                {value.title}
                            </IonLabel>
                        </IonItem> 
                    }
                    </IonMenuToggle>
                )
            })}
        </Aux>
    );
}
export default SubMenu;