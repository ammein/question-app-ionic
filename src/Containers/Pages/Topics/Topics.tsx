import React , { Component } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import { MyProps } from '../../../Utils/Declaration/Utils';
import { getPath } from '../../../Utils/Routes';
import QuestionInstance from '../../../HOC/Axios/Axios';
import { IonButton } from '@ionic/react';

interface Props extends MyProps {}

interface State {
    nested : boolean,
    topic ?: string
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

    topicHandler = (e : CustomEvent<any>,id : string) => {
        e.preventDefault();
        this.setState({
            nested: true,
            topic : id
        })
        this.props.history.push({
            pathname : `/${this.props.match.params.id}/${id}/description`,
            state : {
                topic : true
            }
        });
    }

    changeSegment = (e : any) => {
        console.log("Topic Value : ",e.detail.value)
        var id : string = e.detail.value.toLowerCase();
        this.props.history.push({
            pathname: `/${this.props.match.params.id}/${this.state.topic}/${id}`,
            state: {
                topic: true
            }
        });
    }

    toCapitalize = (word : string) =>{
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    render(){
        return (
            <Aux>
                {!this.state.nested ? 
                <Aux>
                    <Content 
                        enableContent={true} 
                        enableToolbar={true} 
                        {...this.props} 
                        currentPath={getPath(this.constructor)} 
                        back={true} 
                        goBack={() => {
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
                            onClick={(e : any) => this.topicHandler(e , "topic")}>
                            Go To Description
                    </IonButton>
                    </Content>
                </Aux>
                    :
                    <Content 
                        enableContent={true} 
                        enableToolbar={true} 
                        getTitle={this.props.match.params.id.length > 0 ? this.toCapitalize(this.props.match.params.id) + " Is Fun !" : "Learn Is Fun !"} 
                        {...this.props} 
                        currentPath={getPath(this.constructor)} 
                        back={true} 
                        changeListener={(e: any) => this.changeSegment(e)} 
                        goBack={() => {
                                var react = this;
                                this.setState({
                                    nested: false
                                }, function () {
                                    return react.props.history.push({
                                        pathname: `/`
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