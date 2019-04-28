import React, { CSSProperties } from 'react';
import Aux from '../../HOC/Auxilliary/Auxilliary';
import Lottie from 'react-lottie';
import QuestionLottie from '../../Assets/Lottie/question.json';
import classes from './Loading.css';

interface Props {
    stateStop : boolean | undefined,
    dissapear : boolean | undefined
}

const loading = (props: Props) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: QuestionLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const dissapear : CSSProperties = {
        opacity : 0,
        display : "none",
        transition : "all 1s ease"
    }

    var stop : boolean = false;

    if(props.stateStop){
        setTimeout(() => {
            stop = true;
        }, 10000);
    }

    return(
        <Aux>
            <div className={classes.Loading} style={props.dissapear ? dissapear : undefined}>
                <Lottie options={defaultOptions}
                    height={100}
                    width={100}
                    isStopped={stop}/>
            </div>
        </Aux>
    );
}
export default loading;