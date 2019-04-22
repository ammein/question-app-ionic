import React, { CSSProperties } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import InputElements from '../../UI/Inputs/Inputs';
import classes from './SignIn.css';

export interface Props {
    data? : any[],
    style? : CSSProperties,
    enableSignIn? : any
}

const SignIn : React.SFC<Props> = (props : any) => {
    return(
        <Aux>
            <div id="signIn" className={classes.SignInArea} style={props.style}>
                <InputElements data={props.data}/>
                <div>
                    <a href="#" onClick={props.enableSignIn} className={classes.SignBack}>Forgot Password ?</a>
                </div>
            </div>
        </Aux>
    );
}
export default SignIn;