import React , { Component } from 'react';
import { MyProps } from '../../Utils/Declaration/Utils';
import { IonHeader, IonContent } from '@ionic/react';
import Header from '../../Components/Header/Header';
import Aux from '../Auxilliary/Auxilliary';

interface Props extends MyProps {

}

interface State {}

class Content extends Component<Props , State>{
    constructor(props : Props){
        super(props)
    }
    render(){
        return (
            <Aux>
                <Header back={this.props.back} currentPath={this.props.currentPath} enableToolbar={this.props.enableToolbar}/>
                <IonContent scrollEvents={true} fullscreen={true}>
                    {this.props.children}
                </IonContent>
            </Aux>
        )
    }
}
export default Content;