import React , { Component } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import { IonImg } from '@ionic/react';
import IMAGE from '../../../Assets/SVG/logo.svg';

interface Props {}

interface State {}

class Home extends Component<Props , State>{
    constructor(props : Props){
        super(props)
    }

    render(){
        return (
            <Aux>
                <Content {...this.props} 
                enableContent={true}
                enableToolbar={true}>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ad aliquam ducimus beatae sit voluptatem dolorum illo eligendi quae magnam, iusto eveniet, quis provident labore! Nesciunt, quia nobis! Saepe, excepturi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, maxime nostrum consectetur ex rerum iusto ea dolor error vel, blanditiis porro nam dolorum. Odit corporis error minus alias adipisci aperiam! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dolores ipsum, nobis excepturi natus quibusdam fugit quod unde, cum ex fugiat mollitia explicabo amet culpa fuga molestiae animi beatae sapiente?</p>
                    <IonImg src={IMAGE}></IonImg>
                </Content>
            </Aux>
        )
    }
}
export default Home;