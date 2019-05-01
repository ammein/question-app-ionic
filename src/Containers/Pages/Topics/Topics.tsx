import React , { Component, CSSProperties, ContextType } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import { MyProps, MyTopics, MyContext, UserTopics ,Questions } from '../../../Utils/Declaration/Utils';
import { getPath } from '../../../Utils/Routes';
import QuestionInstance from '../../../HOC/Axios/Axios';
import { IonButton, IonCard, IonCardHeader, IonCardContent , IonProgressBar, IonButtons } from '@ionic/react';
import {CSSTransition, TransitionGroup, Transition} from 'react-transition-group';
import classes from './Topics.css';
import { MyFirebase } from '../../../Utils/Firebase/AuthenticationSetting';
import context from '../../../HOC/Context/Context';

declare const firebase : MyFirebase ;

const database = firebase.database();

interface Props extends MyProps {}

interface State {
    nested : boolean,
    dataTopic?: MyTopics[],
    buy ? : boolean,
    topic ?: string,
    changeTransition : boolean,
    index ?: number
}

class Topics extends Component<Props , State>{

    state : State= {
        nested : false,
        changeTransition : true
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
                    dataTopic : [...data]
                })
                return database.ref("/users/" + this.context.user!.uid).once("value");
            })
            .then((data)=>{
                if(data.val()){
                    const UserTopics: UserTopics = {
                        data: data.val()[react.props.match.params.id].data,
                        buy: data.val()[react.props.match.params.id].buy
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
                    this.setUser(this.context.user!.uid)
                }
            })
            .catch((e : any)=>{
                console.log(e);
            })
    }

    setUser = (userId : string) =>{
        database.ref("/users/" + userId).set({
            user : this.context.user!.email,
            [this.props.match.params.id] : {
                data : this.state.dataTopic,
                buy : false
            }
        });
    }

    topicHandler = (e : CustomEvent<any>,id : string , index : number) => {
        e.preventDefault();
        this.setState({
            nested: true,
            topic : id,
            index : index
        })
        this.props.history.push({
            pathname : `/${this.props.match.params.id}/${id}/${index}/description`,
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
                        pathname: `/${react.props.match.params.id}/${react.state.topic}/${react.state.index}/${id}`,
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

    toCapitalize = (word : string) =>{
        return word.charAt(0).toUpperCase() + word.slice(1);
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
                                                    <p style={textProgressStyle}>{this.calculateCompletion(val, i) === 100 ? "Awesome Score : " + this.calculateCompletion(val, i) + "%": "Score : " + this.calculateCompletion(val, i)+ "%"}</p>
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
                                                <IonButton
                                                    expand="full"
                                                    fill="solid"
                                                    style={[buttonStyle, BuyNowStyle].reduce((init: any, next: any) => Object.assign(init, next), {})}
                                                    onClick={(e: any) => {
                                                        this.topicHandler(e, "topics", i)
                                                    }}>
                                                    Buy Now
                                                </IonButton>
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
                                        pathname: `/${react.props.match.params.id}`
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
export default Topics;