import React , { Component, CSSProperties, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonContent, IonImg, IonPage, IonButtons, IonButton, IonRippleEffect } from '@ionic/react';
import classes from './Main.css';
import { Inputs } from '../../../Utils/Declaration/Utils';
import SignUp from './SignUp/SignUp';

interface Props {
    
}

interface State {
    signUp : Inputs[]
}

const styleInput : CSSProperties = {
    borderBottom : "2px solid white",
    background : "transparent",
    color : "white",
    fontFamily : "Open Sans , sans-serif",
    fontSize : "14px",
    marginBottom : "20px"
}

class Main extends Component<Props , State>{
    constructor(props : Props){
        super(props);
        this.state = {
            signUp: [
                {
                    type: "email",
                    placeholder: "Email",
                    name: "email",
                    style : styleInput
                },
                {
                    type: "password",
                    placeholder: "Password",
                    name: "password",
                    style : styleInput
                },
                {
                    type : "password",
                    name : "confirmPassword",
                    placeholder : "Confirm Password",
                    style : styleInput
                }
            ]
        };
    }
    render() : any{

        const BtnStyle : CSSProperties = {
            height: "60px",
            flexGrow: 1,
            margin : "0",
            color :"white"
        }

        const SignInStyle : CSSProperties = {
            backgroundColor: "#3C5B80"
        }

        const SignUpStyle : CSSProperties = {
            backgroundColor: "#78B7FF"
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
                    <SignUp data={this.state.signUp}/>
                    <div className={classes.BottomBtnMain}>
                        <IonButtons>
                            <IonButton expand="full" style={[BtnStyle , SignUpStyle].reduce((init : any , next : any) => Object.assign(init , next) , {}) as any}>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                            Sign Up
                            </IonButton>
                            <IonButton expand="full" style={[BtnStyle, SignInStyle].reduce((init: any, next: any) => Object.assign(init, next), {}) as any}>
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
export default Main;