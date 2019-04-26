import React, { CSSProperties } from 'react';
import { IonSlides, IonSlide, IonImg } from '@ionic/react';
import { Slider } from '../../../Utils/Declaration/Utils';

const slideOpts = {
    initialSlide: 1,
    speed: 400
};

interface SliderControl{
    slideOptions?: {},
    style ?: CSSProperties,
    data : Slider[]
}

const slider : React.SFC<SliderControl> = (props) => {
    return(
        <IonSlides pager={true} options={props.slideOptions ? props.slideOptions : slideOpts} style={props.style as any}>
            {props.data.map((val: Slider, i: number, arr: Slider[])=>{
                return(
                    <IonSlide key={i}>
                        <IonImg src={val.img}></IonImg>
                    </IonSlide>
                )
            })}
        </IonSlides>
    );
}
export default slider;