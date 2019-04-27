import React , { Component , CSSProperties } from 'react';
import Content from '../../../HOC/Content/Content';
import InputElements from '../../../Components/UI/Inputs/Inputs';
import {Inputs, MyContext, MyUser, Toast} from '../../../Utils/Declaration/Utils';
import { IonButton, IonToast } from '@ionic/react';
import context from '../../../HOC/Context/Context';
import MyToast from '../../../Components/UI/Toast/Toast';
import {isEqual} from 'lodash'

interface Props {}
    
interface State {
    profile : Inputs[],
    toast : Toast
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

    static contextType = context;
    context! : React.ContextType<typeof context>

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
            }
        }
    }

    shouldComponentUpdate(nextProps : Props, nextState : State, nextContext : MyContext){
        // console.log("Props : ",nextProps);
        // console.log("State : ", nextState);
        // console.log("Next Context : ", nextContext);
        if(
            nextState.profile ||
            nextState.toast.dismissHandler !== this.state.toast.dismissHandler ||
            nextState.toast.showToast !== this.state.toast.showToast ||
            nextState.toast.header !== this.state.toast.header ||
            nextState.toast.message !== this.state.toast.message ||
            nextState.toast.position !== this.state.toast.position ||
            nextState.toast.duration !== this.state.toast.duration ||
            nextContext.user!.displayName !== this.context.user!.displayName ||
            nextContext.user!.email !== this.context.user!.email ||
            nextContext.user!.emailVerified !== this.context.user!.emailVerified ||
            nextContext.user!.uid !== this.context.user!.uid
            )
            {
            nextState.profile.forEach((val: Inputs, i: number, arr: Inputs[]) => {
                if (
                    val.value !== this.state.profile[i].value
                ) {
                    // console.log("Running True" , arr[i]);
                    return true
                } else {
                    // console.log("Running False" , arr[i]);
                    return false
                }
            })
                return true;
            }
            else{
                return false;
            }
    }

    componentDidUpdate(prevProps : Props , prevState : State){
        console.log("Running Component Did Update")
        var react = this;
        if(this.context.user){
            Object.keys(this.context.user).map((userKey: string, i: number, users: string[])=>{
                Object.values(this.state.profile).map((profile: Inputs, i: number, profiles : Inputs[])=>{
                    if(userKey === profile.name && this.context.user![userKey] !== this.state.profile[i].value){
                        react.setState((prevState : State)=>{
                            console.log("State profile", this.state.profile[i].value);
                            console.log("PrevState profile", prevState.profile[i].value);
                            const updatedProfile = [...prevState.profile];
                            updatedProfile[i].value = this.context.user![userKey];
                            return {
                                profile: updatedProfile
                            }
                        })
                    }
                })
            })
        }
    }

    componentDidMount(){
        console.log("Running Component Did Mount");
        if (this.context.user) {
            var userProfile = this.state.profile;
            var convertUser: MyUser = this.context.user;
            var updatedUserProfile = [
                ...this.state.profile
            ];
            Object.values(userProfile).map((val: Inputs, i: number, arr: Inputs[]) => {
                if (this.state.profile[i].name === convertUser[val.name]) {
                    updatedUserProfile[i].value = Object.values(convertUser)[i];
                    return this.setState((prevState: State) => {
                        return {
                            profile: updatedUserProfile
                        }
                    })
                }
            })
        }
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
                this.context.user![val.name] = val.value;
                updatedProfile[i].value = val.value;
                return react.setState((prevState: State, props: Props) => {
                    return {
                        profile: updatedProfile
                    }
                }, function () {
                    console.log("State After : ", react.state.profile)
                    user.updateEmail(val.value).then(() => {
                        return react.setState({
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
                });
            }
            else if(val.value){
                console.log("Updated Value ", val.value);
                this.context.user![val.name] = val.value;
                updatedProfile[i].value = val.value;
                // console.log("Updated Profile : \n" , updatedProfile);
                return react.setState((prevState : State , props : Props)=>{
                    return {
                        profile: updatedProfile
                    }
                }, function(){
                    console.log("State After : ", react.state.profile)
                    user.updateProfile({
                        [val.name]: val.value
                    }).then(() => {
                        return react.setState({
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

    render(){

        const buttonStyle : any = {
            "--background": "var(--ion-color-secondary)",
            margin: "0",
            padding : "0 15px"
        } as CSSProperties;

        return (
            <Content enableContent={true} enableToolbar={true}>
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