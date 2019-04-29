import React , { Component } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import Context from '../../../HOC/Context/Context';
import { MyProps } from '../../../Utils/Declaration/Utils';
import { getPath, getTitle } from '../../../Utils/Routes';
import QuestionInstance from '../../../HOC/Axios/Axios';
import {Router, Route} from 'react-router-dom';

import {hashHistory} from '../../../Components/Layout/Layout';
import { IonButton } from '@ionic/react';

interface Props extends MyProps {}

interface State {
    nested : boolean
}

class Topics extends Component<Props , State>{

    state : State= {
        nested : false
    }

    constructor(props : Props){
        super(props);
    }

    componentDidMount(){
        console.log("Props Params" , this.props)
        QuestionInstance.get('/subject/'+this.props.match.params.id+'.json')
            .then((data : any)=>{
                console.log(data);
            })
            .catch((e : any)=>{
                console.log(e);
            })
    }

    render(){
        return (
            <Aux>
                {!this.state.nested ? 
                <Aux>
                        <Content enableContent={true} enableToolbar={true} {...this.props} currentPath={getPath(this.constructor)} back={true} goBack={() => {
                            var react = this;
                            this.setState({
                                nested: false
                            }, function () {
                                return react.props.history.goBack();
                            })
                        }}>
                            <p>{this.props.match.params.id}</p>
                        <p>Hey !</p>
                        <IonButton
                            onClick={((e: any) => {
                                e.preventDefault();
                                this.setState({
                                    nested: true
                                })
                                this.props.history.push({
                                    pathname: `/${this.props.match.params.id}/description`,
                                    state: {
                                        fromTopics: true
                                    }
                                })
                            })}>
                            Go To Description
                    </IonButton>
                        </Content>
                </Aux>
                    :
                    <Content enableContent={true} enableToolbar={true} {...this.props} currentPath={getPath(this.constructor)} back={true} goBack={() => {
                            var react = this;
                            this.setState({
                                nested: false
                            }, function () {
                                return react.props.history.push({
                                    pathname : "/"
                                })
                            })
                        }}>
                    {this.props.children}
                    </Content>
                }
            </Aux>
        )
    }
}
export default Topics;