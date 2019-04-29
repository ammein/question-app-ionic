import React , { Component, CSSProperties } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import { IonImg, IonButtons, IonButton } from '@ionic/react';
import IMAGE from '../../../Assets/SVG/logo.svg';
import MySlider from '../../../Components/UI/Slider/Slider';
import { Slider, MyProps } from '../../../Utils/Declaration/Utils';
import testImage from '../../../Assets/Images/Ubuntu.PNG';

interface Props extends MyProps {}

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
        };

        this.chooseList = this.chooseList.bind(this);
    }

    chooseList(e : MouseEvent | CustomEvent<any>){
        e.preventDefault();
        var name : string | null = (e.currentTarget! as Element).textContent;

        if(name!.toLowerCase() === "mathematics"){
            return this.props.history.push("/mathematics");
        }else if(name!.toLowerCase() === "english"){
            return this.props.history.push("/english");
        }else if(name!.toLowerCase() === "science"){
            return this.props.history.push("/science");
        }else{
            return;
        }
    }

    render(){

        var allHeight : any = {
            height : "200px"
        } as CSSProperties;

        var allMargin : any = {
            margin : "0 5px"
        } as CSSProperties;

        var EnglishStyle : any = {
            "--background" : "var(--ion-color-success)",
            "--color" : "var(--ion-color-light)"
        } as CSSProperties;

        var MathematicStyle : any = {
            "--background" : "var(--ion-color-warning)",
            "--color" : "var(--ion-color-light)"
        } as CSSProperties;

        var ScienceStyle : any = {
            "--background" : "var(--ion-color-danger)",
            "--color" : "var(--ion-color-light)"
        } as CSSProperties;

        return (
            <Aux>
                <Content {...this.props} 
                enableContent={true}
                enableToolbar={true}>
                    <MySlider data={this.state.slider} style={{
                        height : "200px"
                    }}/>
                    <IonButtons style={{
                        justifyContent : "center",
                        minHeight : "50%"
                    }}>
                        <IonButton
                        fill="solid"
                        style={[EnglishStyle , allHeight , allMargin].reduce((init : any , next : any)=> Object.assign(init , next) , {})}
                        onClick={this.chooseList}>
                            English
                        </IonButton>
                        <IonButton
                        fill="solid"
                        style={[MathematicStyle, allHeight , allMargin].reduce((init : any , next : any)=> Object.assign(init , next) , {})}
                        onClick={this.chooseList}>
                            Mathematics
                        </IonButton>
                        <IonButton
                        fill="solid"
                        style={[ScienceStyle,allHeight , allMargin].reduce((init : any , next : any)=> Object.assign(init , next) , {})}
                        onClick={this.chooseList}>
                            Science
                        </IonButton>
                    </IonButtons>
                </Content>
            </Aux>
        )
    }
}
export default Home;