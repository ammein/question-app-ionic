import React , { Component } from 'react';
import { MyProps } from '../../../../Utils/Declaration/Utils';
import Aux from '../../../../HOC/Auxilliary/Auxilliary';
import QuestionInstance from '../../../../HOC/Axios/Axios';

interface Props extends MyProps {}

interface State {}

class Description extends Component<Props , State>{
    constructor(props : Props){
        super(props)
    }

    componentDidMount(){
        console.log("Param Description" , this.props)
        QuestionInstance.get('/subject/' + this.props.match.params.id + "/" + this.props.match.params.topic + "/" + 'description.json')
            .then((data: any) => {
                console.log(data);
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    render(){
        return (
            <Aux>
                <p>Description !</p>
            </Aux>
        )
    }
}
export default Description;