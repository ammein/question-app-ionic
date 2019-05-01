import React , { Component } from 'react';
import Aux from '../../../../HOC/Auxilliary/Auxilliary';
import { MyProps } from '../../../../Utils/Declaration/Utils';
import QuestionInstance from '../../../../HOC/Axios/Axios';
import { IonCard, IonImg, IonContent } from '@ionic/react';

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
                    return (
                        <IonCard key={i}>
                            {val.imageURL.length > 0 ? val.imageURL.map((value : any , i : number)=>{
                                return (
                                    <IonImg src={value.imageURL}></IonImg>
                                )
                            }) : <IonImg src={value.imageURL}></IonImg>}
                            {val.src ? <iframe
                                width={window.innerWidth - 20}
                                height={window.innerHeight - 20}
                                src={val.src + "?controls=0"}>
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
                {render}
            </Aux>
        )
    }
}
export default Notes;