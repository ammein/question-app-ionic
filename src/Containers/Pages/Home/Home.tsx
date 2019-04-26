import React , { Component } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import { IonImg } from '@ionic/react';
import IMAGE from '../../../Assets/SVG/logo.svg';
import MySlider from '../../../Components/UI/Slider/Slider';
import { Slider } from '../../../Utils/Declaration/Utils';
import testImage from '../../../Assets/Images/Ubuntu.PNG';

interface Props {}

interface State {
    slider : Slider[]
}

class Home extends Component<Props , State>{
    constructor(props : Props){
        super(props);
        this.state = {
            slider : [
                {
                    img : IMAGE
                },
                {
                    img: testImage
                }
            ]
        }
    }

    render(){
        return (
            <Aux>
                <Content {...this.props} 
                enableContent={true}
                enableToolbar={true}>
                    <MySlider data={this.state.slider} style={{
                        height : "200px"
                    }}/>
                </Content>
            </Aux>
        )
    }
}
export default Home;