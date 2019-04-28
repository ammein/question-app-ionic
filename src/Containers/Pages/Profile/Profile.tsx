import React , { Component , CSSProperties } from 'react';
import Content from '../../../HOC/Content/Content';
import InputElements from '../../../Components/UI/Inputs/Inputs';
import {Inputs, Toast} from '../../../Utils/Declaration/Utils';
import { IonButton, IonButtons } from '@ionic/react';
import MyToast from '../../../Components/UI/Toast/Toast';
import Loading from '../../../Components/Loading/Loading';
import Popover from '../../../Components/UI/Popover/Popover';
import Aux from '../../../HOC/Auxilliary/Auxilliary';

interface Props {}
    
interface State {
    profile : Inputs[],
    toast : Toast,
    saving : boolean,
    saveEmail : boolean,
    savePassword : boolean,
    newEmail ? : string,
    newPassword ? : string
}

var styleInput: CSSProperties = {
    borderBottom: "2px solid white",
    background: "transparent",
    color: "white",
    fontFamily: "Open Sans , sans-serif",
    fontSize: "14px",
    marginBottom: "20px"
}

declare const firebase : any;

class Profile extends Component<Props , State>{

    constructor(props : Props){
        super(props)
        this.state = {
            profile : [
                {
                    name : "displayName",
                    placeholder : "Your Display Name",
                    enableLabel : true,
                    label : "Display Name",
                    type : "text",
                    position : "floating",
                    style : styleInput
                },
                {
                    name : "email",
                    placeholder : "Your Email Address",
                    enableLabel : true,
                    label : "Email",
                    type : "email",
                    position : "floating",
                    style : styleInput
                },
                {
                    name : "password",
                    placeholder : "Your Update Password",
                    label : "Password",
                    enableLabel : true,
                    type : "password",
                    style : styleInput,
                    position : "floating"
                }
            ],
            toast : {
                showToast : false
            },
            saving : false,
            saveEmail : false,
            savePassword : false
        }
    }

    componentDidMount(){
        console.log("Running Component Did Mount");
        var user = firebase.auth().currentUser;
        var userProfile = this.state.profile;
        var updatedUserProfile = [
            ...this.state.profile
        ];

        user.reload().then(()=>{
            this.state.profile.forEach((val : Inputs , i : number , arr : Inputs[])=>{
                if(user[val.name] && user[val.name] !== val.value){
                    updatedUserProfile[i].value = user[val.name];
                    return this.setState((prevState: State) => {
                        return {
                            profile: updatedUserProfile
                        }
                    })
                }
            })
        })
    }

    submitHandler = (e : CustomEvent<any>) =>{
        e.preventDefault();
        var allInputs : HTMLInputElement[] = (e.currentTarget as Element).querySelectorAll("input") as any;
        var user = firebase.auth().currentUser;
        var react = this;
        const updatedProfile : Inputs[] = [
            ...this.state.profile
        ]
        // Return nodelist to array. Reference : https://stackoverflow.com/questions/32765157/filter-or-map-nodelists-in-es6
        var myValue = Array.prototype.slice.call(allInputs).map((input : Inputs, i : number, arr : Inputs[]) => {
            if (this.state.profile[i].value !== input.value) {
                return {
                    name: input.name,
                    value: input.value
                }
            }
            return {};
        })

        return myValue.forEach((val : any , i : number)=>{
            if(val.name === "password" && val.value){
                if(val.value.length > 5){
                    if(updatedProfile[i].error){
                        updatedProfile[i].error = false;
                    }
                    return react.setState({
                        saving: true,
                        profile: updatedProfile,
                        savePassword: true,
                        newPassword: val.value
                    })
                }else{
                    updatedProfile[i].error = true;
                    updatedProfile[i].errorMessage = "Your Password must be greater than 6 characters"
                    return react.setState({
                        profile : updatedProfile
                    })
                }
            }
            else if (val.name === "email"){
                // console.log("Updated Profile : \n" , updatedProfile);
                console.log("Updated Value ", val.value);
                updatedProfile[i].value = val.value;
                return react.setState({
                    saving : true,
                    profile : updatedProfile,
                    saveEmail : true,
                    newEmail : val.value
                })
            }
            else if(val.value){
                console.log("Updated Value ", val.value);
                updatedProfile[i].value = val.value;
                return react.setState({
                    saving : true,
                    profile : updatedProfile
                },function(){
                    return user.updateProfile({
                        [val.name] : val.value
                    }).then(()=>{
                        return react.setState({
                            saving : false,
                            toast : {
                                showToast : true,
                                message : `Successfully update your profile info`,
                                header : "SUCCESS !",
                                duration : 2000,
                                position : "top",
                                dismissHandler : (()=>{
                                    return react.setState({
                                        toast : {
                                            showToast : false
                                        }
                                    })
                                })
                            }
                        })
                    })
                })
                // console.log("Updated Profile : \n" , updatedProfile);
                
            }
        });
    }

    updatePassword = (newPassword ?: string , password ?: string) => {
        var user = firebase.auth().currentUser;
        var react = this;
        // Credential
        var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            return user.updatePassword(newPassword);
        }).then(()=>{
            return react.setState({
                saving: false,
                newPassword: undefined,
                savePassword: false,
                toast: {
                    showToast: true,
                    duration: 2000,
                    message: "You have successfully update password",
                    header: "SUCCESS !",
                    dismissHandler: (() => {
                        return react.setState({
                            toast: {
                                showToast: false
                            }
                        })
                    })
                }
            })
        }).catch(function (error: any) {
            return react.setState({
                saving: false,
                newPassword: undefined,
                savePassword: false,
                toast: {
                    showToast: true,
                    duration: 2000,
                    message: error.message,
                    header: "ERROR :",
                    dismissHandler: (() => {
                        return react.setState({
                            toast: {
                                showToast: false
                            }
                        })
                    })
                }
            })
        });
    }

    updateEmail = (email ?: string ,password ?: string) =>{
        var user = firebase.auth().currentUser;
        var react = this;
        // Credential
        var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
        return user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            return user.updateEmail(email);
        }).then(()=>{
            return user.sendEmailVerification();
        }).then(function () {
            return react.setState({
                saving: false,
                newEmail: undefined,
                saveEmail: false,
                toast: {
                    showToast: true,
                    duration: 2000,
                    message: "Please verify your new email address \n Email : " + email,
                    header: "ATTENTION !",
                    dismissHandler: (() => {
                        return react.setState({
                            toast: {
                                showToast: false
                            }
                        })
                    })
                }
            })
        }).catch(function (error : any) {
            react.state.profile.map((val : Inputs , i : number , arr : Inputs[])=>{
                const updatedProfile = [
                    ...react.state.profile
                ]
                if(val.name === "email"){
                   updatedProfile[i].value = firebase.auth().currentUser.email; 
                }
                return react.setState((prevState : State)=>{
                    return {
                        profile: updatedProfile
                    }
                })
            })
            return react.setState({
                saving: false,
                newEmail: undefined,
                saveEmail: false,
                toast: {
                    showToast: true,
                    duration: 2000,
                    message: error.message,
                    header: "ERROR :",
                    dismissHandler: (() => {
                        return react.setState({
                            toast: {
                                showToast: false
                            }
                        })
                    })
                }
            })
        });
    }

    masterPopover = (func : (e : any)=> void) =>{
        var style : any = {
            textAlign : "center",
            padding : "5px",
            lineHeight : "20px"
        } as CSSProperties;
        return (
            <form>
                {this.state.saveEmail ? 
                <p style={style}>Enter Your Password to confirm your <span style={{
                    textDecoration : "underline"
                }}>new email</span> changes</p>
                :
                this.state.savePassword ?
                <p style={style}>Enter Your Password to confirm your <span style={{
                    textDecoration : "underline"
                }}>new password</span> changes</p>
                :
                null
                }
                <InputElements data={[
                    {
                        name: "confirmPassword",
                        type: "password",
                        placeholder: "Confirm Password",
                        required: true,
                        enableLabel : true,
                        label : "Re-enter Password",
                        position :"floating"
                    }
                ]} />
                <IonButtons>
                    <IonButton
                        style={{
                            "--background": "var(--ion-color-medium)",
                            margin: "0",
                            flex: "1",
                            color : "var(--ion-color-primary)",
                            height : "50px"
                        }}
                        expand="full"
                        size="large"
                        type="button"
                        onClick={(e: any) => {
                            e.preventDefault();
                            return this.setState((prevState: State) => {
                                return {
                                    saving: false,
                                    saveEmail: false,
                                    savePassword: false
                                }
                            })
                        }}>
                        Cancel
                    </IonButton>
                    <IonButton
                        style={{
                            "--background": "var(--ion-color-secondary)",
                            margin: "0",
                            flex : "1",
                            height : "50px"
                        }}
                        expand="full"
                        size="large"
                        type="button"
                        onClick={(e: any) => func(e)}>
                            Confirm
                    </IonButton>
                </IonButtons>
            </form>
        )
    }

    render() : any{

        const buttonStyle : any = {
            "--background": "var(--ion-color-secondary)",
            margin: "0",
            padding : "0 15px"
        } as CSSProperties;

        var Saving : JSX.Element;

        if(this.state.saving){
            Saving = (
                <Aux>
                    <Loading dissapear={false} stateStop={false}/>
                </Aux>
            )
        }else{
            Saving = (
                <Aux>
                <Loading dissapear={true} stateStop={true}/>
                </Aux>
            )
        }

        return (
            <Content enableContent={true} enableToolbar={true}>
                {Saving}
                <Popover
                    open={this.state.saveEmail}
                    backdropDismiss={false}>
                    {this.masterPopover((e: any) => {
                        e.preventDefault();
                        var password: string;
                        password = e.currentTarget.parentElement.parentElement.querySelector("input[name='confirmPassword']").value;
                        return this.updateEmail(this.state.newEmail, password);
                    })}
                </Popover>
                <Popover
                    open={this.state.savePassword}
                    backdropDismiss={false}>
                    {this.masterPopover((e: any) => {
                        e.preventDefault();
                        var password: string;
                        password = e.currentTarget.parentElement.parentElement.querySelector("input[name='confirmPassword']").value;
                        return this.updatePassword(this.state.newPassword, password);
                    })}
                </Popover>
                <MyToast toast={this.state.toast}/>
                <form method="post" onSubmit={((e : any)=> this.submitHandler(e))}>
                    <InputElements data={this.state.profile}/>
                    <IonButton 
                    style={buttonStyle as any}
                    expand="full"
                    size="default"
                    type="submit">
                        Update
                    </IonButton>
                </form>
            </Content>
        )
    }
}
export default Profile;