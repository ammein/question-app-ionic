import React , { Component, ContextType } from 'react';
import Aux from '../../../../HOC/Auxilliary/Auxilliary';
import { MyProps , Questions, MyTopics } from '../../../../Utils/Declaration/Utils';
import QuestionInstance from '../../../../HOC/Axios/Axios';
import { IonCard, IonCardTitle, IonRadioGroup, IonList, IonLabel, IonRadio } from '@ionic/react';
import { MyFirebase } from '../../../../Utils/Firebase/AuthenticationSetting';
import context from '../../../../HOC/Context/Context';

declare const firebase : MyFirebase;

const database = firebase.database();

interface Props extends MyProps{}

interface State {
    data ?: any[]
}

class QuestionsContent extends Component<Props , State>{

    static contextType = context;
    context!: ContextType<typeof context>

    constructor(props : Props){
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount() {
        console.log("Param Description", this.props)
        var react : this = this;
        QuestionInstance.get('/subject/' + this.props.match.params.id + "/" + this.props.match.params.topic + "/" + this.props.match.params.index + "/" + 'questions.json')
            .then(({data}: any) => {
                react.setState({
                    data : data
                })
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    radioSelected = (e : any , topic : string) =>{
        var react : this = this;
        const updatedQuestions : MyTopics[] = [
            ...this.props.location.state.dataTopic
        ];

        updatedQuestions[react.props.match.params.index].questions.map((val : Questions , i : number , arr : Questions[])=>{
            if (val.question === topic){
                val.userAnswer = e.detail.value;
            }
        })

        database.ref("/users/" + this.context.user!.uid + "/subject/" + react.props.match.params.id).update({
            data: updatedQuestions
        })
    }

    render() {
        return (
            <Aux>
                <p>Answer all the questions :</p>
                <div style={{
                    margin: "0 0 120px 0"
                }}>
                {   
                    this.state.data ? 
                    this.state.data!.map((val: Questions, index: number, arr: Questions[])=>{
                        return (
                            <IonCard key={index + val.question}>
                                <IonCardTitle>{val.question}</IonCardTitle>
                                <IonRadioGroup>
                                    {val.answers.map((value: string, i: number, arr: string[]) => {
                                        return (
                                            <IonList key={value}>
                                                <IonLabel>{value}</IonLabel>
                                                <IonRadio 
                                                    slot="start" 
                                                    value={value} 
                                                    checked={this.props.location.state.topicActive.questions[index].userAnswer && this.props.location.state.topicActive.questions[index].userAnswer === value ? true : false}
                                                    onIonSelect={(e: any) => this.radioSelected(e , val.question)}></IonRadio>
                                            </IonList>
                                        )
                                    })}
                                </IonRadioGroup>
                            </IonCard>
                        )  
                    })
                 : null}
                </div>
            </Aux>
        )
    }
}
export default QuestionsContent;