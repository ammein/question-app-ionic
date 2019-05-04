import React , { Component, ContextType, CSSProperties } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import Context from '../../../HOC/Context/Context';
import {MyContext , MyProps, MyTopics, MyUser, UserTopics} from '../../../Utils/Declaration/Utils';
import { MyFirebase } from '../../../Utils/Firebase/AuthenticationSetting';
import { IonList, IonLabel, IonItem, IonListHeader, IonAvatar, IonImg, IonProgressBar } from '@ionic/react';
import classes from './Rankings.css';
import defaultPhoto from '../../../Assets/Images/emptyuser.png';
import _ from 'lodash';

declare const firebase : MyFirebase;

const database = firebase.database();

type returnCompletion = {
    overallCompletion : number,
    percentageCompletion : number,
    totalCompletion : number
}

interface OverallCompletion extends UserTopics{
    overallCompletion : returnCompletion["overallCompletion"],
    percentageCompletion : returnCompletion["percentageCompletion"],
    totalCompletion : returnCompletion["totalCompletion"]
}

interface CollectData{
    subject: {
        [name: string]: OverallCompletion
    } | undefined
    user: MyUser | undefined
}

interface ObjectCollectData {
    [index : string] : CollectData
}

interface Props extends MyProps{}

interface State {
    allUsers : CollectData[]
}

class Rankings extends Component<Props , State>{

    static contextType = Context;
    context! : ContextType<typeof Context>

    constructor(props : Props){
        super(props);
        this.state = {
            allUsers : []
        }
        this.iterateDeepNestedObject = this.iterateDeepNestedObject.bind(this);
    }

    iterateDeepNestedObject(obj : { [name : string] : any } , findValue : string ) : any{
        if (obj.findValue === findValue) { return obj; }
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                var foundLabel = this.iterateDeepNestedObject(obj[i], findValue);
                if (foundLabel) { return foundLabel; }
            }
        }
        return null;
    }

    componentDidMount(){
        var react : this = this;
        database.ref("/users").on("value", function (snapshot: {
            val(): ObjectCollectData
        }){
            console.log("Ranking Value : ",snapshot.val())
            if(snapshot.val()){
                // Convert to array of objects
                var properties : CollectData[] = Object.getOwnPropertyNames(snapshot.val())
                    .map((val : string , i : number , arrays : string[])=>{
                        return {
                            [val] : snapshot.val()[val]
                        };
                    }).reduce((init : CollectData[] , next : { [index : string] : CollectData })=>{
                        return init.concat(next[Object.getOwnPropertyNames(next) as any]);
                    },[])
                    .map((val : CollectData , i : number , arrays : CollectData[])=>{
                        if(val.subject){
                            var completion: MyTopics[] | returnCompletion = Object.getOwnPropertyNames(val.subject).reduce((init: any[], next: string, i: number): MyTopics[] => {
                                return init.concat(val.subject![next].data);
                            }, [])
                            // Calculate Completion Data
                            completion = completion.reduce((init: returnCompletion, next: MyTopics, i: number, array: MyTopics[]) => {
                                var total: number = 0;
                                total += array.length * 100;
                                return {
                                    overallCompletion: init.overallCompletion += (next.completion ? next.completion : 0),
                                    percentageCompletion: (init.overallCompletion += (next.completion ? next.completion : 0)) / total * 100,
                                    totalCompletion: total
                                }
                            }, {
                                    overallCompletion: 0,
                                    percentageCompletion: 0,
                                    totalCompletion: 0
                                })

                            for(var property in val.subject){
                                if(val.subject.hasOwnProperty(property)){
                                    val.subject[property].overallCompletion = completion.overallCompletion;
                                    val.subject[property].percentageCompletion = completion.percentageCompletion;
                                    val.subject[property].totalCompletion = completion.totalCompletion;
                                }
                            }
                            return val;
                        }
                        return val;
                    })

                react.setState((prevState: State) => {
                    return {
                        allUsers : properties
                    }
                }, function () {
                    console.log("State Now : ", react.state);
                })
            }
        })
    }

    toCapitalize = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    render(){

        const progressColorName: string = "--progress-background";

        var progressColor: any = {
            padding: "5px",
            borderRadius: "10px"
        } as CSSProperties;

        var miniProgressColor: any = {
            padding: "2px",
            borderRadius: "10px",
            "--progress-background" : "var(--ion-color-secondary-shade)"
        } as CSSProperties;

        return (
            <Aux>
                <Content
                    enableContent={true}
                    enableToolbar={false}
                    back={false}>
                    <IonList class={classes.list}>
                        <IonListHeader class={classes.header}>
                            Available User <span style={{fontSize : "10px"}}>Total User(s) : {this.state.allUsers.length}</span>
                        </IonListHeader>
                    {
                        this.state.allUsers && this.state.allUsers.length > 0? 
                        // Todo : Sort and do calculation for overall Completion
                        this.state.allUsers
                        .map((value: CollectData, i: number, array: CollectData[])=>{
                            return (
                                <IonItem key={i} class={classes.userList}>
                                    <IonAvatar class={classes.userPhoto}>
                                        {value.user && value.user!.photoURL!.length > 0 ?
                                            <IonImg src={value.user!.photoURL}></IonImg> : <IonImg src={defaultPhoto}></IonImg>}
                                    </IonAvatar>
                                    <IonLabel>
                                        <h4>
                                            {value.user && value.user!.displayName ? value.user!.displayName : value.user!.email}
                                        </h4>
                                        {
                                            value.subject ?
                                            <div>
                                                <p>
                                                    Overall Score : 
                                                    {
                                                        Object.getOwnPropertyNames(value.subject).map((val : string , i : number , arrays : string[])=>{
                                                            return (
                                                                value.subject![val].overallCompletion + "/" + value.subject![val].totalCompletion
                                                            )
                                                        }).reduce((init : string , next : string) => next , "")
                                                    }
                                                </p>
                                                {
                                                        Object.getOwnPropertyNames(value.subject).map((val: string, i: number, arrays: string[]) => {

                                                            var percentage = value.subject![val].percentageCompletion;

                                                            if (percentage === 100) {
                                                                progressColor[progressColorName] = "var(--ion-color-success-shade)";
                                                            } else if (percentage > 80 && percentage < 100) {
                                                                progressColor[progressColorName] = "var(--ion-color-success)";
                                                            } else if (percentage > 40 && percentage < 80) {
                                                                progressColor[progressColorName] = "var(--ion-color-warning)";
                                                            } else {
                                                                progressColor[progressColorName] = "var(--ion-color-danger)";
                                                            }
                                                            return (
                                                                <IonProgressBar key={i + value.user!.email} value={value.subject![val].percentageCompletion/ 100} style={progressColor}></IonProgressBar>
                                                            )
                                                        }).reduce((init : JSX.Element , next : JSX.Element) => next)
                                                }
                                            </div>
                                            :
                                            <p style={{ fontSize: "10px" }}>{value.user && value.user!.displayName ? value.user!.displayName : value.user!.email} did not learn anything yet</p>
                                        }
                                        {
                                            value.subject ?
                                            <details className={classes.more}>                        
                                            <summary style={{fontSize : "14px"}}>Tap For More Details</summary>
                                            {
                                                Object.getOwnPropertyNames(value.subject).reduce((init : any[], next : string, i : number) => init.concat(value.subject![next].data), [])
                                                .map((detail : MyTopics , index : number , arrayTopics : MyTopics[])=>{
                                                    return (
                                                        <Aux key={i + detail.name}>
                                                            <div className={classes.details}>
                                                                <p className={classes.paragraphDetails}>Title : {detail.name}</p>
                                                                <p className={classes.paragraphDetails}>Score : {detail.completion}/100</p>
                                                                <IonProgressBar value={detail.completion! / 100} style={miniProgressColor}></IonProgressBar>
                                                            </div>
                                                        </Aux>
                                                    )
                                                })
                                            }
                                            </details>
                                            :
                                            null
                                        }
                                    </IonLabel>
                                </IonItem>
                            )
                        })
                        :
                        null
                    }
                    </IonList>
                </Content>
            </Aux>
        )
    }
}
export default Rankings;