import React , { Component, CSSProperties, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonContent, IonImg, IonPage, IonButtons, IonButton, IonRippleEffect } from '@ionic/react';
import classes from './Main.css';
import { Inputs } from '../../../Utils/Declaration/Utils';
import SignUp from '../../../Components/Main/SignUp/SignUp';
import SignIn from '../../../Components/Main/SignIn/SignIn';

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
        var SignUp = e.currentTarget.parentElement.parentElement.parentElement;
        var password = SignUp.querySelector("#signUp").querySelector("input[name='password']");
        var confirmPassword = SignUp.querySelector("#signUp").querySelector("input[name='confirmPassword']");
        var email = SignUp.querySelector("#signUp").querySelector("input[name='email']");
        console.log("Running Sign Up Submit Handler")
    }

    SignInSubmitHandler = (e : any) =>{
        e.preventDefault();
        var SignIn = e.currentTarget.parentElement.parentElement.parentElement;
        var password = SignIn.querySelector("#signIn").querySelector("input[name='password']");
        var email = SignIn.querySelector("#signIn").querySelector("input[name='email']");
        console.log("Running Sign In Submit Handler");
    }

    chooseLogin = (e : any , custom? : string) =>{
        e.preventDefault()
        if (e.currentTarget.textContent === "Sign Up" || custom === "Sign Up"){
            return this.setState({
                enableSignUp : true,
                enableSignIn : false
            });
        } else if (e.currentTarget.textContent === "Sign In" || custom === "Sign In"){
            return this.setState({
                enableSignUp: false,
                enableSignIn : true
            })
        }
    }



    render() : any{

        var SignUpBox : CSSProperties ;

        SignUpBox = {
            transform: "translateX(-1000px)",
            transition: "transform 0.35s ease-in-out",
            opacity : 0,
            display : "none"
        }

        var logoMergeArea : CSSProperties = {
            margin: "200px 0px 160px"
        };

        var SignInBox : CSSProperties;

        SignInBox = {
            transform: "translateX(1000px)",
            transition : "transform 0.35s ease-out",
            opacity : 0,
            display : "none"
        }

        var BtnStyle : CSSProperties = {
            height: "60px",
            flexGrow: 1,
            margin : "0",
            color :"white",
            transition :"all 1s ease-in"
        }

        var SignInStyle : CSSProperties = {
            backgroundColor: "#3C5B80"
        }

        var SignUpStyle : CSSProperties = {
            backgroundColor: "#78B7FF"
        }

        var newStyle: CSSProperties = {
            animation: classes.button,
            animationDuration: "0.3s",
            animationIterationCount: 1,
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards"
        }

        if(this.state.enableSignUp){
            Object.assign(SignInStyle , newStyle);
            SignUpBox.transform = "translateX(0px)";
            SignUpBox.opacity = 1;
            SignUpBox.display = "block";
            logoMergeArea.margin = "120px 0 95px 0";
        }

        if(this.state.enableSignIn){
            Object.assign(SignUpStyle, newStyle);
            SignInBox.transform = "translateX(0px)";
            SignInBox.opacity = 1
            SignInBox.display = "block";
            logoMergeArea.margin = "120px 0px 160px";
        }

        return (
            <Aux>
                <IonPage>
                    <div className={classes.LogoArea} style={logoMergeArea}>
                        <IonImg src=""></IonImg>
                        <div className={classes.Title}>
                            <p>Question App</p>
                        </div>
                    </div>
                    <div className={classes.InputArea}>
                        <SignUp data={this.state.signUp} style={SignUpBox} enableSignUp={((e: any) => this.chooseLogin(e, "Sign In"))} />
                        <SignIn data={this.state.signIn} style={SignInBox} enableSignIn={((e: any) => this.chooseLogin(e, "Sign Up"))} />
                    </div>
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