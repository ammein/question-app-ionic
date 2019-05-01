import React , { Component } from 'react';
import Aux from '../../../../HOC/Auxilliary/Auxilliary';
import { MyProps } from '../../../../Utils/Declaration/Utils';
import QuestionInstance from '../../../../HOC/Axios/Axios';
import { IonCard, IonImg, IonContent, IonButton } from '@ionic/react';

interface Props extends MyProps {}

interface State {
    data ? : any[] | any
}

class Notes extends Component<Props , State>{
    constructor(props : Props){
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount() {
        console.log("Param Description", this.props)
        var react : this = this;
        QuestionInstance.get('/subject/' + this.props.match.params.id + "/" + this.props.match.params.topic + "/" + this.props.match.params.index + "/" + 'notes.json')
            .then(({data}: any) => {
                console.log(data);
                if(typeof data === "object"){
                    return react.setState({
                        data : [data]
                    })
                }else{
                    return react.setState({
                        ...data
                    })
                }
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    render() {

        var render : JSX.Element;

        if(this.state.data!.length > 0){
            render = (
                this.state.data!.map((val: any, i: number, arr: any[]) => {
                    var width : number = window.innerWidth - 20;
                    var height : number = width * (width / 500)
                    return (
                        <IonCard key={i}>
                            { val.length > 0 ? val.map((value : any , i : number)=>{
                                return (
                                    <IonImg key={value + i} src={value.imageURL}></IonImg>
                                )
                            }) : null}
                            {val.src && window.plugins ? <IonCard>
                                <IonButton onClick={(e : any)=>{
                                    window.plugins.streamingMedia.playVideo(val.src);
                                }}>
                                    Play Video
                                </IonButton>
                            </IonCard> : val.src && !window.plugins ? <iframe
                                width={window.innerWidth - 20}
                                height={height}
                                // Issue found for iframe and solution on : https://stackoverflow.com/questions/50028938/refused-to-display-a-frame-because-it-set-x-frame-options-to-sameorigin
                                src={val.src + "?controls=0#origin"}>
                            </iframe> : null}
                            {
                                typeof val === "string" ? <IonContent>val</IonContent> : null
                            }
                        </IonCard>
                    )
                })
            );
        }else{
            render = (<p>Loading...</p>)
        }

        return (
            <Aux>
                <div style={{
                    margin: "0 0 120px 0"
                }}>
                {render}
                </div>
            </Aux>
        )
    }
}
export default Notes;