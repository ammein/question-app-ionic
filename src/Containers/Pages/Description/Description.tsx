import React , { Component } from 'react';
import Content from '../../../HOC/Content/Content';
import { MyProps } from '../../../Utils/Declaration/Utils';
import {getPath} from '../../../Utils/Routes';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import {getTitle} from '../../../Utils/Routes';

interface Props extends MyProps {}

interface State {}

class Description extends Component<Props , State>{
    constructor(props : Props){
        super(props)
    }

    componentDidMount(){
        console.log("Param Description" , this.props.match)
        console.log("State Location" , this.props.location)
        console.log("Description" , this.constructor)
        console.log("Get Path Description" , getPath(this.constructor))
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