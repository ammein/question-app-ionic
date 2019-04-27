import React , { Component , CSSProperties } from 'react';
import Content from '../../../HOC/Content/Content';
import InputElements from '../../../Components/UI/Inputs/Inputs';
import {Inputs, MyContext, MyUser, Toast} from '../../../Utils/Declaration/Utils';
import { IonButton, IonToast } from '@ionic/react';
import context from '../../../HOC/Context/Context';
import MyToast from '../../../Components/UI/Toast/Toast';

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

    componentDidUpdate(){
        if(this.context.user){
            var userProfile = this.state.profile;
            console.log("Context : " , this.context)
            var convertUser : MyUser = this.context.user;
            const updatedUserProfile = [
                ...userProfile
            ];
            Object.values(userProfile).map((val : Inputs , i : number , arr : Inputs[])=>{
                if(this.state.profile[i].name === Object.keys(convertUser)[i] && this.state.profile[i].value !== Object.values(convertUser)[i]){
                    updatedUserProfile[i].value = Object.values(convertUser)[i];
                    return this.setState((prevState : State)=>{
                        return {
                            profile: updatedUserProfile
                        }
                    })
                }
            })
        }
    }

    componentDidMount(){
        if (this.context.user) {
            var userProfile = this.state.profile;
            console.log("Context : ", this.context)
            var convertUser: MyUser = this.context.user;
            const updatedUserProfile = [
                ...userProfile
            ];
            Object.values(userProfile).map((val: Inputs, i: number, arr: Inputs[]) => {
                if (this.state.profile[i].name === Object.keys(convertUser)[i]) {
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
        // Return nodelist to array. Reference : https://stackoverflow.com/questions/32765157/filter-or-map-nodelists-in-es6
        var myValue = Array.prototype.slice.call(allInputs).map((input: HTMLInputElement, i: number, arr: HTMLInputElement[]) => {
            if(this.state.profile[i].value !== input.value){
                console.log("Input " + input.name + " is different value of ",this.state.profile[i].name + " with value " + this.state.profile[i].value)
                return user.updateProfile({
                    [input.name] : input.value
                }).then(()=>{
                    return react.setState({
                        toast : {
                            showToast : true ,
                            duration : 2000,
                            message : "You have successfully update the profile",
                            header : "SUCCESS !",
                            dismissHandler : (()=>{
                                return react.setState({
                                    toast : {
                                        showToast : false
                                    }
                                })
                            })
                        }
                    })
                }).catch((e : any)=>{
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
            }
            return input;
        })
        debugger;
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