import React , { Component, CSSProperties } from 'react';
import { MyProps } from '../../Utils/Declaration/Utils';
import { IonHeader, IonContent, IonPage } from '@ionic/react';
import Header from '../../Components/Header/Header';
import Aux from '../Auxilliary/Auxilliary';
import Context from '../Context/Context';

interface Props extends MyProps {
    enableContent? : boolean,
    authenticated? : boolean,
    getTitle ? : string,
    style? : CSSProperties,
    goBack? : () => void,
    changeListener ?: (e : any) => void
}

interface State {}

class Content extends Component<Props , State>{

    static contextType = Context;

    constructor(props : Props){
        super(props);
    }

    render(){
        return (
            <Aux>
                {this.props.enableContent ? 
                    <Aux>
                        <Header back={this.props.back} currentPath={this.props.currentPath} enableToolbar={this.props.enableToolbar} {...this.props} goBack={this.props.back && !this.props.goBack ? ()=>{
                            return this.props.history.goBack();
                        } : this.props.goBack}
                            changeListener={this.props.changeListener ? this.props.changeListener : (e : any) => console.log(e.detail.value)}
                            getTitle={this.props.getTitle ? this.props.getTitle : undefined} />
                        <IonContent fullscreen={false} scrollEvents={true} style={[{
                            "--background" : "var(--ion-color-primary)"
                        } , this.props.style ? this.props.style : {}].reduce((init : any , next : any)=> Object.assign(init , next),{})}>
                            {this.props.children}
                        </IonContent>
                    </Aux>
                    :
                    this.props.children
                }
            </Aux>
        )
    }
}
export default Content;