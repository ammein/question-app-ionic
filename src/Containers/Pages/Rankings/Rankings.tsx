import React , { Component, ContextType } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import Context from '../../../HOC/Context/Context';
import {MyContext , MyProps, MyTopics, MyUser} from '../../../Utils/Declaration/Utils';
import { MyFirebase } from '../../../Utils/Firebase/AuthenticationSetting';
import { IonList, IonLabel, IonItem, IonListHeader, IonAvatar, IonImg } from '@ionic/react';
import classes from './Rankings.css';
import defaultPhoto from '../../../Assets/Images/emptyuser.png';
import _ from 'lodash';

declare const firebase : MyFirebase;

const database = firebase.database();

interface CollectData{
    subject: {
        [name: string]: MyTopics[]
    } | undefined
    user: MyUser | undefined
}

interface ArrayCollectData {
    [index : string] : CollectData
}

interface Props extends MyProps{}

interface State {
    allUsers : ArrayCollectData[]
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
            val(): ArrayCollectData
        }){
            console.log("Ranking Value : ",snapshot.val())
            if(snapshot.val()){
                // Iterate on every object
                react.setState((prevState: State) => {
                    return {
                        allUsers : prevState.allUsers.concat(snapshot.val())
                    }
                }, function () {
                    console.log("State Now : ", react.state);
                })
            }
        })
    }

    render(){
        return (
            <Aux>
                <Content
                    enableContent={true}
                    enableToolbar={false}
                    back={false}>
                    <IonList class={classes.list}>
                        <IonListHeader>
                            Available User Rankings
                        </IonListHeader>
                    {
                        this.state.allUsers && this.state.allUsers.length > 0? 
                        // Todo : Sort and do calculation for overall Completion
                        _.sortBy(this.state.allUsers , ["completion"])
                        .map((value : ArrayCollectData , i : number , array : ArrayCollectData[])=>{
                            return Object.keys(value).map((val: MyUser["uid"], index: number, arr: MyUser["uid"][]) : any=>{
                                return (
                                    <IonItem key={i + val} class={classes.userList}>
                                        <IonAvatar class={classes.userPhoto}>
                                            {value[val].user && value[val].user!.photoURL!.length > 0 ?
                                                <IonImg src={value[val].user!.photoURL}></IonImg> : <IonImg src={defaultPhoto}></IonImg>}
                                        </IonAvatar>
                                        <IonLabel>
                                            {value[val].user && value[val].user!.displayName ? value[val].user!.displayName : value[val].user!.email}
                                        </IonLabel>
                                    </IonItem>
                                )
                            })
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