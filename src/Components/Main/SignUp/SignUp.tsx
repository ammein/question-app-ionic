import React, { CSSProperties } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import InputElements from '../../UI/Inputs/Inputs';
import classes from './SignUp.css';

interface Props {
    data? : any[],
    style? : CSSProperties,
    enableSignUp? : any
}

const SignUp : React.SFC<Props> = (props) => {

    return(
        <Aux>
            <div id="signUp" className={classes.SignUpArea} style={props.style}>
                <InputElements data={props.data}/>
                <div>
                    <a href="#" onClick={props.enableSignUp} className={classes.SignBack}>Got an account ? Sign In !</a>
                </div>
            </div>
        </Aux>
    );
}
export default SignUp;