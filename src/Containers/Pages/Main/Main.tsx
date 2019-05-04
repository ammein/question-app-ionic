import React , { CSSProperties, PureComponent } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { IonImg, IonPage, IonButtons, IonButton, IonRippleEffect, IonIcon } from '@ionic/react';
import classes from './Main.css';
import { Inputs, Auth, Toast, MyUser, MyContext } from '../../../Utils/Declaration/Utils';
import SignUp from '../../../Components/Main/SignUp/SignUp';
import SignIn from '../../../Components/Main/SignIn/SignIn';
import Content from '../../../HOC/Content/Content';
import ResetPassword from '../../../Components/Main/ResetPassword/ResetPassword';
import MyToast from '../../../Components/UI/Toast/Toast';
import EmailVerification from '../../../Components/Main/EmailVerification/EmailVerification';
import Logo from '../../../Assets/SVG/logo.svg';
import _ from 'lodash';
import Context from '../../../HOC/Context/Context';
import { MyFirebase } from '../../../Utils/Firebase/AuthenticationSetting';

declare const firebase : MyFirebase;

interface Props {

}

interface State extends Auth {
    enableSignIn?: boolean,
    enableSignUp?: boolean,
    enableResetPassword?: boolean,
    enableEmailVerification? : boolean,
    toast? : Toast,
    user? : MyUser
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

    private checkUser : any;

    static contextType : any = Context;

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

    SignUpSubmitHandler = (e : any) =>{
        e.preventDefault();
        var SignUp : Element = e.currentTarget.parentElement.parentElement.parentElement;
        var password = SignUp!.querySelector("#signUp")!.querySelector("input[name='password']") as HTMLInputElement;
        var confirmPassword = SignUp!.querySelector("#signUp")!.querySelector("input[name='confirmPassword']") as HTMLInputElement;
        var email = SignUp!.querySelector("#signUp")!.querySelector("input[name='email']") as HTMLInputElement;
        var react = this;
        if(password.value !== confirmPassword.value){

            // Get Specific confirmPassword value
            const newState: any = this.state.signUp
            .filter((val: Inputs, i: number) => {
                return val.name === "confirmPassword"
            }).map((val: Inputs, i: number, arr: Inputs[]) => {
                val.error = true;
                val.errorMessage = "Password not match !";
                return val;
            });

            // Merge exisiting value to state
            const allValue : any = this.state.signUp
            .map((val : Inputs , i : number , arr : Inputs[])=>{
                val.value = SignUp.querySelectorAll<HTMLInputElement>("#signUp input")[i].value;
                return val;
            });

            // Merge
            Object.assign(newState , allValue);

            // Set State
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
                    return user.sendEmailVerification();
                }).then(function () {
                    // Email sent.
                    return react.setState({
                        enableEmailVerification: true
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
                            position : "top",
                            duration: 5000,
                            header : `ERROR ${errorCode} :`,
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
                    position : "top",
                    header : `ERROR ${errorCode} :`,
                    duration : 5000,
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
        var SignIn : HTMLElement = e.currentTarget.parentElement.parentElement.parentElement;
        var email = SignIn!.querySelector("#signIn")!.querySelector("input[name='email']") as HTMLInputElement;
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
                            header: `ERROR :`
                        }
                    }
                })
            });
        }
    }

    resendEmailVerification = (e : any) =>{
        e.preventDefault();
        var user = firebase.auth().currentUser;
        var react = this;

        return user.sendEmailVerification().then(()=>{
            return react.setState({
                toast : {
                    showToast : true,
                    message : "Email Verification sent to your email address : " + user.email,
                    header : "SUCCESS !",
                    position : "top",
                    duration : 3000,
                    dismissHandler : (()=>{
                        react.setState({
                            toast : {
                                showToast : false
                            }
                        })
                    })
                }
            })
        }).catch(()=>{
            return react.setState({
                toast: {
                    showToast: true,
                    message: e.message + "\nYour Signed Up Email is" + user.email,
                    header: "ERROR :",
                    position: "top",
                    duration: 3000,
                    dismissHandler: (() => {
                        react.setState({
                            toast: {
                                showToast: false
                            }
                        })
                    })
                }
            })
        })
    }

    continueVerified = (e : any , recheckUser : any) =>{
        e.preventDefault();
        var user = firebase.auth().currentUser;
        var react = this;
        user.reload().then(()=>{
            if (user && user.emailVerified) {
                console.log("Running Email Verified : \n", user);
                this.setState({
                    enableEmailVerification: false
                });
                this.context.recheckUser();
                return;
            } else if (user && !user.emailVerified) {
                console.log("Running Email Not Verified : \n", user);
                return this.setState({
                    enableEmailVerification: true,
                    toast: {
                        showToast: true,
                        message: "Are you sure you have verified your email address ? \n Email : " + user.email,
                        header: "ERROR :",
                        dismissHandler: (() => {
                            react.setState((prevState: State) => {
                                return {
                                    toast: {
                                        showToast: false
                                    }
                                }
                            })
                        }),
                        duration: 2000,
                        position: "top"
                    }
                })
            }
        })
    }

    componentWillUnmount(){
        clearTimeout(this.checkUser);
    }

    componentDidMount(){
        var path : string = window.location.hash.length > 1 ? window.location.hash.replace("#" , "") : window.location.pathname;
        var react : this = this;
        this.checkUser = setInterval(() => {
            var user = firebase.auth().currentUser;
            if (user && user.emailVerified) {
                this.setState((prevState: State) => {
                    // Used only for login purpose
                    return {
                        user : {
                            uid : user.uid,
                            email : user.email,
                            displayName : user.displayName,
                            emailVerified : user.emailVerified,
                            photoURL : user.photoURL
                        },
                        enableEmailVerification: false
                    }
                },function(){
                    // Update based on user
                    firebase.database().ref("/users/" + react.state.user!.uid).update({
                        user: _.pick(react.state.user , ["displayName" , "email" , "photoURL"])
                    })
                })
                this.context.recheckUser();
                return;
            } else if (user && !user.emailVerified) {
                return this.setState((prevState: State) => {
                    return {
                        enableEmailVerification: true
                    }
                })
            } else {
                return this.setState((prevState: State) => {
                    return {
                        enableEmailVerification: false
                    }
                })
            }
        }, 1000);
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

        var logoMergeArea : CSSProperties = {};

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
            logoMergeArea.margin = "40px 0 40px 0";
            logoMergeArea.justifyContent = "flex-start";
            logoMergeArea.minHeight = "auto";
        }

        if (this.state.enableSignIn && !this.state.enableResetPassword && !this.state.enableEmailVerification){
            Object.assign(SignUpStyle, animationStyle);
            BackButton.display = "inline-block";
            SignInBox.display = "block";
            SignInBox.transform = "translateX(0px)";
            SignInBox.opacity = 1
            logoMergeArea.margin = "40px 0px 40px 0";
            logoMergeArea.justifyContent = "flex-start";
            logoMergeArea.minHeight = "auto";
        }

        if (this.state.enableResetPassword || this.state.enableEmailVerification){
            logoMergeArea.display = "none"
        }

        return (
            <Aux>
                <IonPage>
                    <div>
                <Context.Provider value={{
                    user : this.state.user
                }}>
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
                        <IonImg src={Logo} style={{
                            width : "50px"
                        }}></IonImg>
                        <div className={classes.Title}>
                            <p>Question App</p>
                        </div>
                    </div>
                        <div style={this.state.enableSignIn || this.state.enableSignUp ? { margin: "0 0 80px 0"} : {margin : "0"}}>
                        <SignUp data={this.state.signUp} style={SignUpBox} enableSignUp={((e: any) => this.chooseLogin(e, "Sign In"))} />
                        <SignIn data={this.state.signIn} style={SignInBox} enableSignIn={((e: any) => this.chooseLogin(e, "Sign Up"))} forgotPassword={((e: any)=> this.forgotPassword(e))} />
                        {this.state.enableResetPassword ? <ResetPassword/> : null}
                        {this.state.enableEmailVerification ? <EmailVerification/> : null}
                    </div>
                    <div className={classes.BottomBtnMain}>
                    {
                        this.state.enableEmailVerification ? 
                        <Context.Consumer>
                            {(context : MyContext) => {
                                return (
                                    <Aux>
                                        <IonButtons>
                                            <IonButton
                                                color="secondary"
                                                style={[BtnStyle, SignInStyle].reduce((init: any, next: any) => Object.assign(init, next), {}) as any}
                                                onClick={(e: any) => {
                                                    return this.continueVerified(e , context.recheckUser);
                                                }}>
                                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                                                Continue
                                            </IonButton>
                                            <IonButton
                                                color="secondary"
                                                style={[BtnStyle, SignUpStyle].reduce((init: any, next: any) => Object.assign(init, next), {}) as any}
                                                onClick={(e: any) => {
                                                    return this.resendEmailVerification(e);
                                                }}>
                                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                                                Resend
                                            </IonButton>
                                        </IonButtons>
                                    </Aux>
                                )
                            }}
                        </Context.Consumer>
                        :
                        this.state.enableResetPassword ? 
                        <IonButton
                            expand="full"
                            color="secondary"
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
                    </Context.Provider>
                    </div>
                </IonPage>
            </Aux>
        )
    }
}
export default Main;