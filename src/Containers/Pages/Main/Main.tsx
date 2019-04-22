import React , { Component, CSSProperties, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonContent, IonImg, IonPage, IonButtons, IonButton, IonRippleEffect } from '@ionic/react';
import classes from './Main.css';
import { Inputs } from '../../../Utils/Declaration/Utils';
import SignUp from '../../../Components/Main/SignUp/SignUp';

interface Props {
    
}

interface State {
    signUp : Inputs[],
    signIn : Inputs[],
    enableSignIn? : boolean,
    enableSignUp? : boolean
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
            ],
            signIn : [
                {
                    type : "email",
                    placeholder : "Email",
                    name : "email",
                    style : styleInput
                },
                {
                    type : "password",
                    placeholder : "Password",
                    name : "password",
                    style : styleInput
                }
            ],
            enableSignIn : undefined,
            enableSignUp : undefined
        };
    }

    SignUpSubmitHandler = (e : any) =>{
        e.preventDefault();
        console.log("Running Sign Up Submit Handler")
    }

    SignInSubmitHandler = (e : any) =>{
        e.preventDefault();
        console.log("Running Sign In Submit Handler");
    }

    chooseLogin = (e : any) =>{
        e.preventDefault()
        if (e.currentTarget.textContent === "Sign Up"){
            return this.setState({
                enableSignUp : true,
                enableSignIn : false
            });
        } else if (e.currentTarget.textContent === "Sign In"){
            return this.setState({
                enableSignUp: false,
                enableSignIn : true
            })
        }
    }

    render() : any{

        const BtnStyle : CSSProperties = {
            height: "60px",
            flexGrow: 1,
            margin : "0",
            color :"white",
            transition :"all 1s ease-in"
        }

        const SignInStyle : CSSProperties = {
            backgroundColor: "#3C5B80"
        }

        const SignUpStyle : CSSProperties = {
            backgroundColor: "#78B7FF"
        }

        const newStyle: CSSProperties = {
            animation: classes.button,
            animationDuration: "0.3s",
            animationIterationCount: 1,
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards"
        }

        if(this.state.enableSignUp){
            Object.assign(SignInStyle , newStyle);
        }

        if(this.state.enableSignIn){
            Object.assign(SignUpStyle, newStyle);
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
                            <IonButton 
                            expand="full" 
                            style={[BtnStyle , SignUpStyle].reduce((init : any , next : any) => Object.assign(init , next) , {}) as any}
                                onClick={this.state.enableSignUp ? (e : any) => this.SignUpSubmitHandler(e) :(e: any) => this.chooseLogin(e)}>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                            Sign Up
                            </IonButton>
                            <IonButton 
                            expand="full" 
                            style={[BtnStyle, SignInStyle].reduce((init: any, next: any) => Object.assign(init, next), {}) as any}
                                onClick={this.state.enableSignIn ? (e : any)=> this.SignInSubmitHandler(e): (e: any) => this.chooseLogin(e)}>
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