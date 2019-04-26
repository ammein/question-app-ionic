import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonMenuToggle, IonItem, IonRippleEffect, IonThumbnail, IonImg, IonIcon, IonLabel } from '@ionic/react';
import {Link} from 'react-router-dom';
import classes from './SubMenu.css';
import MyRoutes from '../../../Utils/Declaration/Utils';

interface MyProps{
    data : MyRoutes[]
}

const SubMenu = (props: MyProps) => {
    return(
        <Aux>
            {props.data!.map((value: MyRoutes, i: number, arr: MyRoutes[])=>{
                return (
                    <Aux key={i}>
                        {value.menu && !value.signOut ? 
                            <IonMenuToggle key={i} autoHide={value.autoHide ? true : false}>
                                {value.link ?
                                    <Link to={value.path as any}>
                                        <IonItem class={["ion-activatable", classes.MenuItem].join(' ')} lines="none" style={value.style as any}>
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
                                    </Link>
                                    :
                                    <IonItem key={i} class={["ion-activatable", classes.MenuItem].join(' ')} lines="none" onClick={value.getLink ? ((e: any) => value!.pushLink!(e, value.getLink)) : undefined} style={value.style as any}>
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
                            : null    
                        }
                        {
                            value.signOut ?
                            <IonMenuToggle key={i} autoHide={value.autoHide ? true : false}>
                                    <IonItem key={i} onClick={value.signOut} class="ion-activatable" lines="none" style={value.style as any}>
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
                            </IonMenuToggle>
                            :
                            null
                        }
                    </Aux>
                )
            })}
        </Aux>
    );
}
export default SubMenu;