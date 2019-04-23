import React , { Component } from 'react';
import { MyProps } from '../../Utils/Declaration/Utils';
import { IonHeader, IonContent } from '@ionic/react';
import Header from '../../Components/Header/Header';
import Aux from '../Auxilliary/Auxilliary';
import Context from '../Context/Context';

interface Props extends MyProps {
    enableContent? : boolean,
    authenticated? : boolean
}

interface State {}

class Content extends Component<Props , State>{

    static MyContext = Context;

    constructor(props : Props){
        super(props)
    }

    render(){
        return (
            <Aux>
                <Context.Provider value={{
                    path : "test"
                }}>
                {this.props.enableContent ? 
                    <Aux>
                        <Header back={this.props.back} currentPath={this.props.currentPath} enableToolbar={this.props.enableToolbar} />
                        <IonContent scrollEvents={true} fullscreen={true}>
                                {this.props.children}
                        </IonContent>
                    </Aux>
                    :
                    this.props.children
                }
                </Context.Provider>
            </Aux>
        )
    }
}
export default Content;