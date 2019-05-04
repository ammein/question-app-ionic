import React , { Component , CSSProperties, ContextType } from 'react';
import Content from '../../../HOC/Content/Content';
import InputElements from '../../../Components/UI/Inputs/Inputs';
import {Inputs, Toast, MyProps , CordovaCamera} from '../../../Utils/Declaration/Utils';
import { IonButton, IonButtons, IonList, IonAvatar, IonImg, IonLabel } from '@ionic/react';
import MyToast from '../../../Components/UI/Toast/Toast';
import Loading from '../../../Components/Loading/Loading';
import Popover from '../../../Components/UI/Popover/Popover';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import { MyFirebase } from '../../../Utils/Firebase/AuthenticationSetting';
import Context from '../../../HOC/Context/Context';
import _ from 'lodash';
import defaultPhoto from '../../../Assets/Images/emptyuser.png';
import classes from './Profile.css'

declare const firebase : MyFirebase;

declare const Camera : CordovaCamera;

declare const cordova : any;

interface Props extends MyProps {}
    
interface State {
    profile : Inputs[],
    toast : Toast,
    saving : boolean,
    saveEmail : boolean,
    savePassword : boolean,
    newEmail ? : string,
    newPassword ? : string,
    photoURL : string,
    deleteAccount : boolean
}

var styleInput: CSSProperties = {
    borderBottom: "2px solid white",
    background: "transparent",
    color: "white",
    fontFamily: "Open Sans , sans-serif",
    fontSize: "14px",
    marginBottom: "20px"
}

class Profile extends Component<Props , State>{

    static contextType = Context;
    context!: ContextType<typeof Context>

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
            savePassword : false,
            photoURL : "",
            deleteAccount : false
        }
    }

    componentDidMount(){
        console.log("Running Component Did Mount");
        console.log("Location" , this.props.location)
        var react : this = this;
        var user = firebase.auth().currentUser;
        var userProfile = this.state.profile;
        var updatedUserProfile = [
            ...this.state.profile
        ];

        user.reload().then(()=>{
            if(user && user.emailVerified && user.photoURL){
                react.setState({
                    photoURL : user.photoURL
                })
            }
            react.state.profile.forEach((val : Inputs , i : number , arr : Inputs[])=>{
                if(user[val.name] && user[val.name] !== val.value){
                    updatedUserProfile[i].value = user[val.name];
                    return react.setState((prevState: State) => {
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
                    profile : updatedProfile,
                    saveEmail : true,
                    newEmail : val.value
                })
            }
            else if(val.value){
                console.log("Updated Value ", val.value);
                updatedProfile[i].value = val.value;
                if(val.name === "displayName"){
                    firebase.database().ref("/users/"+this.context.user!.uid + "/user/").update({
                        [val.name] : val.value                   
                    })
                }
                return react.setState({
                    profile : updatedProfile
                },function(){
                    return user.updateProfile({
                        [val.name] : val.value
                    }).then(()=>{
                        return react.setState({
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
            }
        });
    }

    updatePassword = (newPassword : string , password : string) => {
        var user = firebase.auth().currentUser;
        var react = this;
        react.setState({
            saving : true,
            savePassword: false
        });
        // Credential
        var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            return user.updatePassword(newPassword);
        }).then(()=>{
            return react.setState({
                saving: false,
                newPassword: undefined,
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

    updateEmail = (email : string ,password : string) =>{
        var user = firebase.auth().currentUser;
        var react = this;
        react.setState({
            saving : true,
            saveEmail : false
        });
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

    deleteAccountUser = (password : string) =>{
        var user = firebase.auth().currentUser;
        var react = this;
        // Credential
        react.setState({
            deleteAccount : false
        })
        var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
        return user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            firebase.database().ref("/users/" + user.uid).remove();
            return user.delete();
        }).then(() => {
            return react.setState({
                toast : {
                    showToast : true,
                    message : "You successfully delete your account",
                    header : "Account Deleted Successfully !",
                    duration : 6000,
                    position : "top",
                    dismissHandler : (()=>{
                        react.setState({
                            toast : {
                                showToast : false
                            }
                        })
                    })
                }
            },function(){
                return react.props.history.push({
                    pathname : "/"
                })
            })
        }).catch((e : any)=>{
            return react.setState({
                toast: {
                    showToast: true,
                    message: e.message,
                    header: "ERROR !",
                    duration: 6000,
                    position: "top",
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
                                    savePassword: false,
                                    deleteAccount : false
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

    setOptions = (srcType : CordovaCamera) =>{
        return {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            targetWidth : 50,
            targetHeight : 50,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
        }
    }

    captureImage = () =>{
        console.log("Running Camera Function");
        if(navigator.camera){
            console.log("Running Camera If Else")
            return navigator.camera.getPicture(this.cameraSuccess, this.cameraError, this.setOptions(Camera.PictureSourceType.CAMERA));
        }
        return;
    }

    cameraSuccess = (imageData : any) =>{
        var react : this = this;
        var image = "data:image/jpeg;base64,"+imageData;
        this.setState({
            photoURL : image
        } , function(){
            firebase.auth().currentUser.updateProfile({
                photoURL: image
            }).then(()=>{
                return firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/user/").update({
                    photoURL: image
                });
            }).then(()=>{
                react.setState({
                    toast: {
                        showToast: true,
                        position: "top",
                        header: "SUCCESS !",
                        message: "Nice Photo ! :)",
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
            }).catch((e : any)=>{
                react.setState({
                    toast: {
                        showToast: true,
                        position: "bottom",
                        header: "ERROR !",
                        message: "Oops ! Your photo does not upload successfully to server. You might wanna to try again later \n : " + e.message,
                        duration: 10000,
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
        })
    }

    cameraError = (message : any) =>{
        console.log("Capture camera fails : " , message)
        var react :this = this;
        react.setState({
            toast: {
                showToast: true,
                position: "top",
                header: "ERROR !",
                message: message,
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
    }

    render() : any{

        const buttonStyle : any = {
            "--background": "var(--ion-color-secondary)",
            margin: "0",
            padding : "0 15px"
        } as CSSProperties;

        const deleteStyle : any = {
            "--background": "var(--ion-color-danger)",
            margin: "20px 0 0 0",
            padding: "0 15px"
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
            <Aux>
            {Saving}
            <Content enableContent={true}>
                <Popover
                    open={this.state.saveEmail}
                    backdropDismiss={false}>
                    {this.masterPopover((e: any) => {
                        e.preventDefault();
                        var password: string;
                        password = e.currentTarget.parentElement.parentElement.querySelector("input[name='confirmPassword']").value;
                        return this.updateEmail(this.state.newEmail as string, password);
                    })}
                </Popover>
                <Popover
                    open={this.state.savePassword}
                    backdropDismiss={false}>
                    {this.masterPopover((e: any) => {
                        e.preventDefault();
                        var password: string;
                        password = e.currentTarget.parentElement.parentElement.querySelector("input[name='confirmPassword']").value;
                        return this.updatePassword(this.state.newPassword as string, password);
                    })}
                </Popover>
                <Popover
                    open={this.state.deleteAccount}
                    backdropDismiss={false}>
                    {this.masterPopover((e: any) => {
                        e.preventDefault();
                        var password: string;
                        password = e.currentTarget.parentElement.parentElement.querySelector("input[name='confirmPassword']").value;
                        return this.deleteAccountUser(password);
                    })}
                </Popover>
                <MyToast toast={this.state.toast}/>
                <div className={classes.userPhoto}>
                    <IonAvatar 
                        onClick={this.captureImage}>
                            <IonImg src={this.state.photoURL.length > 0 ? this.state.photoURL : defaultPhoto}></IonImg>
                    </IonAvatar>
                    <p>Tap Here To Upload Picture</p>
                </div>
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
                <IonButton
                    style={deleteStyle as any}
                    expand="full"
                    size="default"
                    type="button"
                    onClick={(() => this.setState({
                        deleteAccount : true
                    }))}>
                    Delete Account
                </IonButton>
            </Content>
            </Aux>
        )
    }
}
export default Profile;