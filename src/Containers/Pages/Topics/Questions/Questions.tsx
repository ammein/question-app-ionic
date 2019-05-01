import React , { Component } from 'react';
import Aux from '../../../../HOC/Auxilliary/Auxilliary';
import { MyProps } from '../../../../Utils/Declaration/Utils';
import QuestionInstance from '../../../../HOC/Axios/Axios';

interface Props extends MyProps{}

interface State {}

class Questions extends Component<Props , State>{
    constructor(props : Props){
        super(props)
    }

    componentDidMount() {
        console.log("Param Description", this.props)
        QuestionInstance.get('/subject/' + this.props.match.params.id + "/" + this.props.match.params.topic + "/" + this.props.match.params.index + "/" + 'questions.json')
            .then((data: any) => {
                console.log(data);
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    render() {
        return (
            <Aux>
                <p>Question !</p>
            </Aux>
        )
    }
}
export default Questions;