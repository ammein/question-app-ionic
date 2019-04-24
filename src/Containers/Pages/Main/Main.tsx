import React , { Component, CSSProperties, PureComponent } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonImg, IonPage, IonButtons, IonButton, IonRippleEffect, IonIcon } from '@ionic/react';
import classes from './Main.css';
import { Inputs, Auth, Toast } from '../../../Utils/Declaration/Utils';
import SignUp from '../../../Components/Main/SignUp/SignUp';
import SignIn from '../../../Components/Main/SignIn/SignIn';
import Content from '../../../HOC/Content/Content';
import ResetPassword from '../../../Components/Main/ResetPassword/ResetPassword';
import MyToast from '../../../Components/UI/Toast/Toast';
import EmailVerification from '../../../Components/Main/EmailVerification/EmailVerification';
import _ from 'lodash';

declare const firebase : any;

interface Props {
    
}

interface State extends Auth {
    enableSignIn?: boolean,
    enableSignUp?: boolean,
    enableResetPassword?: boolean,
    enableEmailVerification? : boolean,
    toast? : Toast
}

var styleInput : CSSProperties = {
    borderBottom : "2px solid white",
    background : "transparent",
    color : "white",
    fontFamily : "Open Sans , sans-serif",
    fontSize : "14px",
    marginBottom : "20px"
}

class Main extends PureComponent<Props , State>{
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
                    style : styleInput,
                    minLength : 6
                },
                {
                    type : "password",
                    name : "confirmPassword",
                    placeholder : "Confirm Password",
                    style : styleInput,
                    minLength : 6
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
            enableSignUp : undefined,
            toast : {
                showToast : false,
                dismissHandler : () => {},
                message : "",
                duration : 0
            }
        };
    }
    
    componentDidUpdate(){
        var user = firebase.auth().currentUser;
        if(user && user.emailVerified){
            return this.setState((prevState : any)=>{
                return {
                    enableEmailVerification : false
                }
            })
        }else if(user && !user.emailVerified){
            return this.setState((prevState: any) => {
                return {
                    enableEmailVerification: true
                }
            })
        }else{
            return this.setState((prevState: any) => {
                return {
                    enableEmailVerification: false
                }
            })
        }
    }

    SignUpSubmitHandler = (e : any) =>{
        e.preventDefault();
        var SignUp = e.currentTarget.parentElement.parentElement.parentElement;
        var password = SignUp.querySelector("#signUp").querySelector("input[name='password']");
        var confirmPassword = SignUp.querySelector("#signUp").querySelector("input[name='confirmPassword']");
        var email = SignUp.querySelector("#signUp").querySelector("input[name='email']");
        var react = this;
        if(password.value !== confirmPassword.value){
            const newState: any = this.state.signUp.filter((val: Inputs, i: number) => {
                return val.name === "confirmPassword"
            }).map((val: Inputs, i: number, arr: Inputs[]) => {
                val.error = true;
                val.errorMessage = "Password not match !";
                return val;
            });

            var mergeState = Object.assign(newState, this.state.signUp);
            return this.setState((prevState: any, props: any) => {
                return {
                    signUp: mergeState
                }
            })
        }else{
            return firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                .then(() => {
                    var user = firebase.auth().currentUser;
                    user.sendEmailVerification().then(function () {
                        // Email sent.
                        return react.setState({
                            enableEmailVerification: true
                        })
                    }).catch(function (error: any) {
                        return react.setState({
                            toast: {
                                showToast: true,
                                message: "Email verification cannot be send. Please try again",
                                duration: 2000,
                                header: "ERROR :",
                                dismissHandler: (() => {
                                    react.setState({
                                        toast: {
                                            showToast: false
                                        }
                                    })
                                })
                            }
                        })
                    });
                })
                .catch(function (error: any) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return react.setState({
                        toast: {
                            showToast: true,
                            message: errorMessage,
                            duration: 2000,
                            dismissHandler: (() => {
                                react.setState({
                                    toast: {
                                        showToast: false
                                    }
                                })
                            })
                        }
                    })
                });   
        }
    }

    SignInSubmitHandler = (e : any) =>{
        e.preventDefault();
        const react = this;
        var SignIn = e.currentTarget.parentElement.parentElement.parentElement;
        var password = SignIn.querySelector("#signIn").querySelector("input[name='password']");
        var email = SignIn.querySelector("#signIn").querySelector("input[name='email']");
        console.log("Running Sign In Submit Handler");
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(function (error : any) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return react.setState({
                toast: {
                    showToast: true,
                    message: errorMessage,
                    duration: 2000,
                    position : "top",
                    header : "ERROR :",
                    dismissHandler: (() => {
                        react.setState({
                            toast: {
                                showToast: false
                            }
                        })
                    })
                }
            })
        });

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
        }else{
            return this.setState({
                enableSignIn : false,
                enableSignUp : false,
                enableResetPassword : false
            })
        }
    }

    forgotPassword = (e : any) =>{
        e.preventDefault();
        var SignIn = e.currentTarget.parentElement.parentElement.parentElement;
        var email = SignIn.querySelector("#signIn").querySelector("input[name='email']");
        var react = this;
        if(email.value === ""){
            const newState : any = this.state.signIn.filter((val : Inputs , i : number)=>{
                return val.name === "email"
            }).map((val : Inputs , i : number , arr : Inputs[])=>{
                val.error = true;
                val.value = email.value;
                val.errorMessage = "You cannot leave empty email";
                return val;
            });

            var mergeState = Object.assign(newState, this.state.signIn);
            return this.setState((prevState : any , props : any)=>{
                return {
                    signIn : mergeState
                }
            })
        }else{
            const elseNewState: any = this.state.signIn.filter((val: Inputs, i: number) => {
                return val.name === "email"
            }).map((val: Inputs, i: number, arr: Inputs[]) => {
                val.error = false;
                val.value = email.value;
                return val;
            });

            var mergeState = Object.assign(elseNewState, this.state.signIn);

            firebase.auth().sendPasswordResetEmail(email.value).then(function () {
                return react.setState((prevState: any, props: any) => {
                    return {
                        signIn: mergeState,
                        enableResetPassword: true
                    }
                })
            }).catch(function (error : any) {
                return react.setState((prevState: any, props: any) => {
                    return {
                        signIn: mergeState,
                        enableResetPassword: false,
                        toast : {
                            showToast : true,
                            message : error.message,
                            dismissHandler : (()=>{
                                react.setState({
                                    toast : {
                                        showToast : false
                                    }
                                })
                            }),
                            duration : 2000,
                            position : "top",
                            header : "ERROR :"
                        }
                    }
                })
            });


        }
    }

    componentDidMount(){
        var path : string = window.location.hash.length > 1 ? window.location.hash.replace("#" , "") : window.location.pathname;
        var user = firebase.auth().currentUser;
        if (user && user.emailVerified) {
            return this.setState((prevState: any) => {
                return {
                    enableEmailVerification: false
                }
            })
        } else if (user && !user.emailVerified) {
            return this.setState((prevState: any) => {
                return {
                    enableEmailVerification: true
                }
            })
        } else {
            return this.setState((prevState: any) => {
                return {
                    enableEmailVerification: false
                }
            })
        }
    }

    render() : any{

        var BackButton : CSSProperties;

        BackButton = {
            display : "none",
            color : "white"
        }

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
            transition :"flex 1s ease-in"
        }

        var SignInStyle : CSSProperties = {
            backgroundColor: "#3C5B80"
        }

        var SignUpStyle : CSSProperties = {
            backgroundColor: "#78B7FF"
        }

        var animationStyle: CSSProperties = {
            animation: classes.button,
            animationDuration: "0.3s",
            animationIterationCount: 1,
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards"
        }

        if (this.state.enableSignUp && !this.state.enableResetPassword && !this.state.enableEmailVerification){
            Object.assign(SignInStyle , animationStyle);
            BackButton.display = "inline-block";
            SignUpBox.display = "block";
            SignUpBox.transform = "translateX(0px)";
            SignUpBox.opacity = 1;
            logoMergeArea.margin = "50px 0 50px 0";
        }

        if (this.state.enableSignIn && !this.state.enableResetPassword && !this.state.enableEmailVerification){
            Object.assign(SignUpStyle, animationStyle);
            BackButton.display = "inline-block";
            SignInBox.display = "block";
            SignInBox.transform = "translateX(0px)";
            SignInBox.opacity = 1
            logoMergeArea.margin = "50px 0px 50px";
        }

        if (this.state.enableResetPassword || this.state.enableEmailVerification){
            logoMergeArea.display = "none"
        }

        return (
            <Aux>
                <IonPage>
                    <Content {...this.props}>
                    <IonButton 
                        color="light" 
                        fill="clear" 
                        style={BackButton as any}
                        onClick={(e : any) => this.chooseLogin(e)}>
                        <IonIcon 
                            slot="icon-only" 
                            name="arrow-round-back"></IonIcon>
                    </IonButton>
                    <MyToast toast={this.state.toast}/>
                    <div className={classes.LogoArea} style={logoMergeArea}>
                        <IonImg src=""></IonImg>
                        <div className={classes.Title}>
                            <p>Question App</p>
                        </div>
                    </div>
                    <div className={classes.InputArea}>
                        <SignUp data={this.state.signUp} style={SignUpBox} enableSignUp={((e: any) => this.chooseLogin(e, "Sign In"))} />
                        <SignIn data={this.state.signIn} style={SignInBox} enableSignIn={((e: any) => this.chooseLogin(e, "Sign Up"))} forgotPassword={((e: any)=> this.forgotPassword(e))} />
                        {this.state.enableResetPassword ? <ResetPassword/> : null}
                        {this.state.enableEmailVerification ? <EmailVerification/> : null}
                    </div>
                    <div className={classes.BottomBtnMain}>
                    {
                        this.state.enableEmailVerification ? 
                        null
                        :
                        this.state.enableResetPassword ? 
                        <IonButton
                            expand="full"
                            style={[BtnStyle, SignInStyle].reduce((init: any, next: any) => Object.assign(init, next), {}) as any}
                            onClick={(e : any) => this.chooseLogin(e)}>
                            <IonRippleEffect type="unbounded"></IonRippleEffect>
                            Okay
                        </IonButton>
                        :
                        <IonButtons>
                            <IonButton
                                expand="full"
                                style={[BtnStyle, SignUpStyle].reduce((init: any, next: any) => Object.assign(init, next), {}) as any}
                                onClick={this.state.enableSignUp ? (e: any) => this.SignUpSubmitHandler(e) : (e: any) => this.chooseLogin(e)}>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                                Sign Up
                                </IonButton>
                            <IonButton
                                expand="full"
                                style={[BtnStyle, SignInStyle].reduce((init: any, next: any) => Object.assign(init, next), {}) as any}
                                onClick={this.state.enableSignIn ? (e: any) => this.SignInSubmitHandler(e) : (e: any) => this.chooseLogin(e)}>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                                Sign In
                            </IonButton>
                        </IonButtons>
                    }
                    </div>
                    </Content>
                </IonPage>
            </Aux>
        )
    }
}
export default Main;