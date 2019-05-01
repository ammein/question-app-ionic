import React , { Component } from 'react';
import { MyProps } from '../../../../Utils/Declaration/Utils';
import Aux from '../../../../HOC/Auxilliary/Auxilliary';
import QuestionInstance from '../../../../HOC/Axios/Axios';

interface Props extends MyProps {}

interface State {
    data : string
}

class Description extends Component<Props , State>{
    constructor(props : Props){
        super(props)
        this.state = {
            data : ""
        }
    }

    componentDidMount(){
        console.log("Param Description" , this.props)
        var react : this = this;
        QuestionInstance.get('/subject/' + this.props.match.params.id + "/" + this.props.match.params.topic + "/" + this.props.match.params.index + "/"+ 'description.json')
            .then(({data}: any) => {
                console.log(data);
                react.setState({
                    data
                })
            })
            .catch((e: any) => {
                console.log(e);
            })
    }

    render(){
        return (
            <Aux>
                <h1>Description</h1>
                {this.state.data}
            </Aux>
        )
    }
}
export default Description;