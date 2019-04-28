import React , { Component , CSSProperties } from 'react';
import Content from '../../../HOC/Content/Content';
import InputElements from '../../../Components/UI/Inputs/Inputs';
import {Inputs, Toast} from '../../../Utils/Declaration/Utils';
import { IonButton, IonToast, IonPopover } from '@ionic/react';
import context from '../../../HOC/Context/Context';
import MyToast from '../../../Components/UI/Toast/Toast';
import Loading from '../../../Components/Loading/Loading';
import Popover from '../../../Components/UI/Popover/Popover';
import Aux from '../../../HOC/Auxilliary/Auxilliary';

interface Props {}
    
interface State {
    profile : Inputs[],
    toast : Toast,
    saving : boolean
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

    private newEmail : string | undefined;

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
            saving : false
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
                return;
            }
            else if (val.name === "email"){
                // console.log("Updated Profile : \n" , updatedProfile);
                console.log("Updated Value ", val.value);
                updatedProfile[i].value = val.value;
                react.setState({
                    saving : true,
                    profile : updatedProfile
                },function(){
                        react.newEmail = val.value;
                })
            }
            else if(val.value){
                console.log("Updated Value ", val.value);
                updatedProfile[i].value = val.value;
                // console.log("Updated Profile : \n" , updatedProfile);
                return react.setState((prevState : State , props : Props)=>{
                    return {
                        profile: updatedProfile,
                        saving : true
                    }
                }, function(){
                    console.log("State After : ", react.state.profile)
                    user.updateProfile({
                        [val.name]: val.value
                    }).then(() => {
                        return react.setState({
                            saving : false,
                            toast: {
                                showToast: true,
                                duration: 2000,
                                message: "You have successfully update the profile",
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
                    }).catch((e: any) => {
                        debugger;
                        return react.setState({
                            saving: false,
                            toast: {
                                showToast: true,
                                duration: 2000,
                                message: e.message,
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
                    })
                });
            }
        });
    }

    updateEmail = (email : string ,password : string) =>{
        var user = firebase.auth().currentUser;
        var react = this;
        // Credential
        var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            return react.setState((prevState: State, props: Props) => {
                return {
                    saving: true
                }
            }, function () {
                console.log("State After : ", react.state.profile)
                if (react.state.saving) {
                    user.updateEmail(email).then(() => {
                        return react.setState({
                            saving: false,
                            toast: {
                                showToast: true,
                                duration: 2000,
                                message: "You have successfully update email address",
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
                    }).catch((e: any) => {
                        debugger;
                        return react.setState({
                            saving: false,
                            toast: {
                                showToast: true,
                                duration: 2000,
                                message: e.message,
                                header: "ERROR !",
                                dismissHandler: (() => {
                                    return react.setState({
                                        toast: {
                                            showToast: false
                                        }
                                    })
                                })
                            }
                        })
                    })
                }
            });
        }).catch(function (error : any) {
            return react.setState({
                saving: true,
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
                    open={this.state.saving}
                    dismissHandler={(() => {
                        this.setState((prevState: State) => {
                            return {
                                saving: false
                            }
                        })
                    })}>
                    <form>
                        <InputElements data={[
                            {
                                name: "confirmPassword",
                                type: "password",
                                placeholder: "Re-enter your password to confirm",
                                required: true
                            }
                        ]} />
                        <IonButton
                            style={{
                                "--background": "var(--ion-color-secondary)",
                                margin: "0"
                            }}
                            type="submit"
                            onClick={((e: any) => {
                                e.preventDefault();
                                var password: string;
                                password = e.currentTarget.parentElement.querySelector("input[name='confirmPassword']").value;
                                if (this.newEmail) {
                                    this.updateEmail(this.newEmail, password);
                                    this.newEmail = undefined;
                                    return;
                                }
                            })}>
                            Confirm
                            </IonButton>
                    </form>
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