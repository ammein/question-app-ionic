import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import InputElements from '../../UI/Inputs/Inputs';
import classes from './SignUp.css';

interface Props {
    data? : any[]
}

const SignUp : React.SFC<Props> = (props) => {

    return(
        <Aux>
            <div id="signUp" className={classes.SignUpArea}>
                <InputElements data={props.data}/>
            </div>
        </Aux>
    );
}
export default SignUp;