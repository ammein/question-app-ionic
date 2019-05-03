import React , { Component, CSSProperties, ContextType } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import { MyProps, MyTopics, MyContext, UserTopics ,Questions, Toast } from '../../../Utils/Declaration/Utils';
import { getPath } from '../../../Utils/Routes';
import QuestionInstance from '../../../HOC/Axios/Axios';
import { IonButton, IonCard, IonCardHeader, IonCardContent , IonProgressBar, IonButtons } from '@ionic/react';
import {CSSTransition, TransitionGroup, Transition} from 'react-transition-group';
import classes from './Topics.css';
import { MyFirebase } from '../../../Utils/Firebase/AuthenticationSetting';
import context from '../../../HOC/Context/Context';
import Popover from '../../../Components/UI/Popover/Popover';
import InputElements from '../../../Components/UI/Inputs/Inputs';
import MyToast from '../../../Components/UI/Toast/Toast';
import _ from 'lodash';

declare const firebase : MyFirebase ;

const database = firebase.database();

interface Props extends MyProps {}

interface State {
    nested : boolean,
    dataTopic?: MyTopics[],
    buy ? : boolean,
    topic ?: string,
    changeTransition : boolean,
    index ?: number,
    popover : boolean,
    toast : Toast
}

class Topics extends Component<Props , State>{

    state : State= {
        nested : false,
        changeTransition : true,
        popover : false,
        toast : {
            showToast : false
        }
    }

    static contextType = context;
    context!: ContextType<typeof context>

    constructor(props : Props){
        super(props);
    }

    componentDidMount(){
        console.log("Props Params" , this.props)
        var react : this = this;
        var user = firebase.auth().currentUser;
        QuestionInstance.get('/subject/'+this.props.match.params.id+"/topics" + '.json')
            .then(({data} : any)=>{
                console.log(data);
                react.setState({
                    dataTopic: [...data]
                })
                return database.ref("/users/" + this.context.user!.uid + "/subject").once("value");
            })
            .then((data)=>{
                if(data.val()){
                    const UserTopics: UserTopics = {
                        data: data.val()[react.props.match.params.id].data,
                        buy: data.val()[react.props.match.params.id].buy ? data.val()[react.props.match.params.id].buy : false
                    };
                    react.state.dataTopic!.forEach((val : MyTopics , i : number , arr : MyTopics[])=>{
                        if(val.name === UserTopics.data[i].name){
                            val = UserTopics.data[i];
                        }
                    })
                    react.setState({
                        dataTopic : UserTopics.data,
                        buy : UserTopics.buy
                    })
                }else{
                    this.setUser(user.uid)
                }
            })
            .catch((e : any)=>{
                console.log(e);
            });
    }

    setUser = (userId : string) =>{

        var react : this = this;
        react.setState((prevState : State) =>{

            if(prevState.dataTopic){
                prevState.dataTopic.map((val: MyTopics, i: number, arr: MyTopics[]) => {
                    if (val.completion === undefined) {
                        val.completion = 0;
                    }
                    return val;
                });
            }

            return {
                dataTopic: prevState.dataTopic
            }

        })

        database.ref("/users/" + userId).set({
            user : _.pick(this.context.user , ["displayName" , "email" , "photoURL"]),
            subject : {
                [this.props.match.params.id]: {
                    data: this.state.dataTopic,
                    buy: false
                }
            }
        });
    }

    resetData = () => {
        var react : this = this;
        return database.ref("/users/" + this.context.user!.uid + "/subject").once("value").then((data : any)=>{
            if (data.val()) {
                const UserTopics: UserTopics = {
                    data: data.val()[react.props.match.params.id].data,
                    buy: data.val()[react.props.match.params.id].buy ? data.val()[react.props.match.params.id].buy : false
                };
                react.state.dataTopic!.forEach((val: MyTopics, i: number, arr: MyTopics[]) => {
                    if (val.name === UserTopics.data[i].name) {
                        val = UserTopics.data[i];
                    }
                })
                react.setState({
                    dataTopic: UserTopics.data,
                    buy: UserTopics.buy
                })
            } else {
                this.setUser(this.context.user!.uid)
            }
        })
    }

    topicHandler = (e : CustomEvent<any>,id : string , index : number) => {
        e.preventDefault();
        this.setState({
            nested: true,
            topic : id,
            index : index
        })
        this.props.history.push({
            pathname : `/learn/${this.props.match.params.id}/${id}/${index}/description`,
            state : {
                ...this.state,
                topicActive :this.state.dataTopic![index]
            }
        });
    }

    changeSegment = (e : any) => {
        console.log("Topic Value : ",e.detail.value)
        var react = this;
        var id : string = e.detail.value.toLowerCase();
        this.setState((prevState : State)=>{
            return {
                changeTransition : !prevState.changeTransition
            }
        },function(){
            setTimeout(() => {
                return react.setState((prevState: State) => {
                    return {
                        changeTransition: !prevState.changeTransition
                    }
                },function(){
                    react.props.history.push({
                        pathname: `/learn/${react.props.match.params.id}/${react.state.topic}/${react.state.index}/${id}`,
                        state: {
                            ...react.state,
                            topicActive: react.state.dataTopic![react.state.index as number]
                        }
                    });
                })
            }, 500);
        })
    }

    calculateCompletion = (allTopics : MyTopics , index : number) : number =>{
        var completion : number = 0;

        allTopics.questions.forEach((value : Questions , i : number , arr : Questions[])=>{
            if (value.userAnswer === this.state.dataTopic![index].questions[i].correctAnswer){
                completion++;
            }
        })

        return completion / allTopics.questions.length * 100;
    }

    componentDidUpdate(){
        // Update Completion Data (Only if state.buy is available & HTML id="completion" available on DOM)
        if (this.state.dataTopic && this.state.buy && document.querySelector("#completion")){
            const updatedTopics: MyTopics[] = [
                ...this.state.dataTopic
            ];
            var paragraph = document.querySelectorAll("#completion");

            updatedTopics.map((val : MyTopics , i : number , arr : MyTopics[])=>{
                if(val.name === paragraph[i].getAttribute("data-topic")){
                    database.ref("/users/" + this.context.user!.uid + "/subject/" + this.props.match.params.id + "/data/" + i).update({
                        completion : parseInt(paragraph[i].getAttribute("data-value") as string)
                    })
                }
            })
        }
    }

    toCapitalize = (word : string) =>{
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    buyHandler = () =>{
        var react : this = this;
        return this.setState({
            buy : true,
            popover : false
        },function(){
            database.ref("/users/" + react.context.user!.uid + "/subject/" + react.props.match.params.id).update({
                buy : react.state.buy
            })
        })
    }

    resetHandler = (name : string) =>{
        const ResetTopic : MyTopics[] = [
            ...this.state.dataTopic
        ];

        var react : this = this;

        ResetTopic!.map((val : MyTopics , i : number , arr : MyTopics[])=>{
            if(val.questions && val.name === name){
                // Delete Completion Data
                delete val.completion;
                val.questions.map((value : Questions , index : number , array : Questions[])=>{
                    if(value.userAnswer){
                        // Delete User Answer
                        delete value.userAnswer
                    }
                })
            }
        })

        database.ref("/users/" + this.context.user!.uid + "/subject/" + react.props.match.params.id).set({
            data : ResetTopic,
            buy : true
        },function(error : any){
            if(error){
                console.log(error);
            }else{
                react.resetData();
            }
        });
    }

    confirmPassword = (password : string) =>{
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
        var react : this = this;
        return user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            return react.buyHandler();
        }).catch((e : any)=>{
            return react.setState({
                popover: false,
                toast : {
                    showToast : true,
                    duration : 2000,
                    position : "bottom",
                    message : e.message,
                    header : "ERROR :",
                    dismissHandler : ()=>{
                        react.setState({
                            toast : {
                                showToast : false
                            }
                        })
                    }
                }
            })
        })
    }

    masterPopover = (func: (e: any) => void) =>{
        var style: any = {
            textAlign: "center",
            padding: "5px",
            lineHeight: "20px"
        } as CSSProperties;
        return (
            <form>
                <p style={style}>Enter Your Password to confirm your <span style={{
                    textDecoration: "underline"
                }}>Purchase</span></p>
                <InputElements data={[
                    {
                        name: "confirmPassword",
                        type: "password",
                        placeholder: "Confirm Password",
                        required: true,
                        enableLabel: true,
                        label: "Re-enter Password",
                        position: "floating"
                    }
                ]} />
                <IonButtons>
                    <IonButton
                        style={{
                            "--background": "var(--ion-color-medium)",
                            margin: "0",
                            flex: "1",
                            color: "var(--ion-color-primary)",
                            height: "50px"
                        }}
                        expand="full"
                        size="large"
                        type="button"
                        onClick={(e: any) => {
                            e.preventDefault();
                            return this.setState((prevState: State) => {
                                return {
                                    popover : !prevState.popover
                                }
                            })
                        }}>
                        Cancel
                    </IonButton>
                    <IonButton
                        style={{
                            "--background": "var(--ion-color-secondary)",
                            margin: "0",
                            flex: "1",
                            height: "50px"
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

    render(){

        const progressArea : any = {
            marginBottom : "10px"
        } as CSSProperties;

        const cardStyle : any = {
            "--background": "var(--ion-color-secondary)",
            "--color" : "var(--ion-color-light)"
        } as CSSProperties;

        const textProgressStyle : any = {
            fontSize : "15px",
            color : "var(--ion-color-light)"
        } as CSSProperties;

        const progressColorName: string = "--progress-background"

        const duration : number = 350;

        var defaultStyle : any = {
            transition: `all ${duration}ms ease-in-out`,
            opacity : 0,
            left: 0
        } as CSSProperties;

        const buttonStyle : any = {
            margin: "0",
            flex: "1",
            "--color" : "var(--ion-color-light)",
            height : "50px"
        } as CSSProperties;

        var StudyNowStyle : any = {
            "--background" : "var(--ion-color-tertiary-shade)"
        } as CSSProperties;

        var BuyNowStyle : any = {
            "--background" : "var(--ion-color-medium-shade)"
        } as CSSProperties;

        var CardArea : any = {
            margin: "0 0 100px 0"
        } as CSSProperties;

        var transitionStyles : any = {
            entering: { 
                left: "-100%" ,
                opacity : 0
            }as CSSProperties,
            entered: { 
                left: 0 ,
                opacity : 1
            }as CSSProperties,
            exiting: { 
                left: "-100%" ,
                opacity : 1
            }as CSSProperties,
            exited: { 
                left: "-100%",
                opacity : 0
            }as CSSProperties,
        };

        return (
            <Aux>
                <Popover 
                    open={this.state.popover}
                    backdropDismiss={false}>
                    {this.masterPopover((e : any)=>{
                        e.preventDefault();
                        var password: string = e.currentTarget.parentElement.parentElement.querySelector("input[name='confirmPassword']").value;
                        return this.confirmPassword(password);
                    })}
                </Popover>
                <MyToast
                    toast={this.state.toast}/>
                {!this.state.nested ? 
                <Aux>
                    <Content 
                        enableContent={true}
                        {...this.props} 
                        currentPath={getPath(this.constructor)} 
                        getTitle={this.toCapitalize(this.props.match.params.id)} 
                        back={true} 
                        goBack={() => {
                            var react = this;
                            this.setState({
                                nested: false
                            }, function () {
                                return react.props.history.push({
                                    pathname: `/`
                                })
                            })
                        }}>
                            <div style={CardArea}>
                            {
                                this.state.dataTopic ? this.state.dataTopic.map((val: MyTopics, i: number, arr: MyTopics[])=>{

                                    var progressColor: any = {
                                        padding: "5px",
                                        borderRadius: "10px"
                                    } as CSSProperties;

                                    // Generate different color based on grades

                                    var calculate : number = this.calculateCompletion(val ,i);

                                    if (calculate === 100){
                                        progressColor[progressColorName] = "var(--ion-color-success-shade)";
                                    } else if (calculate > 80 && calculate < 100){
                                        progressColor[progressColorName] = "var(--ion-color-success)";
                                    }else if(calculate > 40 && calculate < 80){
                                        progressColor[progressColorName] = "var(--ion-color-warning)";
                                    }else{
                                        progressColor[progressColorName] = "var(--ion-color-danger)";
                                    }


                                    return (
                                        <IonCard key={i + val.name} style={cardStyle}>
                                            <div style={{
                                                padding: "15px 25px 0 25px"
                                            }}>
                                            
                                                <h3 
                                                style={{
                                                    fontWeight : "bold"
                                                }}>{val.name}</h3>

                                                <div style={progressArea}>
                                                    <p id="completion" data-topic={val.name} data-value={this.calculateCompletion(val,i)} style={textProgressStyle}>{this.calculateCompletion(val, i) === 100 ? "Awesome Score : " + this.calculateCompletion(val, i) + "%": "Score : " + this.calculateCompletion(val, i)+ "%"}</p>
                                                    <IonProgressBar 
                                                    value={this.calculateCompletion(val, i) === 0 ? 0.01 : this.calculateCompletion(val, i)/100}
                                                    style={progressColor}></IonProgressBar>
                                                </div>

                                                <details style={{
                                                    margin : "20px 0"
                                                }}>
                                                    <summary>Tap Here for Description</summary>
                                                    <IonCardContent>
                                                        {val.description}
                                                    </IonCardContent>
                                                </details>
                                        </div>
                                            <IonButtons>
                                                <IonButton
                                                    expand="full"
                                                    fill="solid"
                                                    style={[buttonStyle , StudyNowStyle].reduce((init : any , next : any)=> Object.assign(init , next) , {})}
                                                    onClick={(e: any) => {
                                                        this.topicHandler(e, "topics", i)
                                                    }}>
                                                    Start Study
                                                </IonButton>
                                                {
                                                    this.state.buy ? 
                                                    <IonButton
                                                            expand="full"
                                                            fill="solid"
                                                            style={[buttonStyle, BuyNowStyle].reduce((init: any, next: any) => Object.assign(init, next), {})}
                                                            onClick={(e: any) => this.resetHandler(val.name)}>
                                                            Reset Progress
                                                    </IonButton>
                                                    :
                                                    <IonButton
                                                        expand="full"
                                                        fill="solid"
                                                        style={[buttonStyle, BuyNowStyle].reduce((init: any, next: any) => Object.assign(init, next), {})}
                                                        onClick={(e : any) => {
                                                            this.setState({
                                                                popover : true
                                                            })
                                                        }}>
                                                        Buy Now
                                                    </IonButton>
                                                }
                                            </IonButtons>
                                        </IonCard>
                                    )
                                })
                                :
                                null
                            }
                            </div>
                    </Content>
                </Aux>
                    :
                    <Content 
                        enableContent={true} 
                        enableToolbar={true} 
                        getTitle={this.props.match.params.id ? this.toCapitalize(this.props.match.params.id) + " Is Fun !" : "Learn Is Fun !"} 
                        {...this.props} 
                        currentPath={getPath(this.constructor)} 
                        back={true} 
                        changeListener={(e: any) => this.changeSegment(e)} 
                        goBack={() => {
                                var react = this;
                                this.setState({
                                    nested: false
                                }, function () {
                                    return react.props.history.push({
                                        pathname: `/learn/${react.props.match.params.id}`
                                    })
                                })
                            }}>
                        <Transition
                            timeout={0}
                            in={this.state.changeTransition}>
                            {state =>{ 
                                console.log(state)
                                return (
                                <div
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state]
                                    }}
                                    className={classes.content}>
                                    {this.props.children}
                                </div>
                                )
                            }}
                        </Transition>
                    </Content>
                }
            </Aux>
        )
    }
}
export default React.memo(Topics);