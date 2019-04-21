import React , { Component } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonContent, IonImg, IonPage, IonButtons, IonButton, IonRippleEffect } from '@ionic/react';
import classes from './SignUp.css';

interface Props {}

interface State {}

class SignUp extends Component<Props , State>{
    constructor(props : Props){
        super(props)
    }
    render(){

        const BtnStyle : any = {
            height : "60px",
            flexGrow : 1           
        }
        return (
            <Aux>
                <IonPage>
                    <div className={classes.LogoArea}>
                        <IonImg src=""></IonImg>
                        <div className={classes.Title}>
                            <p>Question App</p>
                        </div>
                    </div>
                    <div className={classes.BottomBtnMain}>
                        <IonButtons>
                            <IonButton expand="full" style={BtnStyle}>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                            Sign Up
                            </IonButton>
                            <IonButton expand="full" style={BtnStyle}>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                                Sign In
                            </IonButton>
                        </IonButtons>
                    </div>
                </IonPage>
            </Aux>
        )
    }
}
export default SignUp;