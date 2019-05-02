import React , { Component, ContextType } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import Context from '../../../HOC/Context/Context';
import {MyContext , MyProps, MyTopics} from '../../../Utils/Declaration/Utils';
import { MyFirebase } from '../../../Utils/Firebase/AuthenticationSetting';

declare const firebase : MyFirebase;

const database = firebase.database();

interface Props extends MyProps{}

interface State {
    english : MyTopics[]
}

class Rankings extends Component<Props , State>{

    static contextType = Context;
    context! : ContextType<typeof Context>

    constructor(props : Props){
        super(props)
    }

    componentDidMount(){
        // database.ref("/users/" + this.context.user!.uid + )
    }

    render(){
        return (
            <Aux>
                <Content
                    enableContent={true}>


                </Content>
            </Aux>
        )
    }
}
export default Rankings;