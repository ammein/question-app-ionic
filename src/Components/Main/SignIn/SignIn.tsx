import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import InputElements from '../../UI/Inputs/Inputs';
import classes from './SignIn.css';

export interface Props {
    data : any[]
}

const SignIn : React.SFC<Props> = (props : any) => {
    return(
        <Aux>
            <div className={classes.SignInArea}>
                <InputElements data={props.data}/>
            </div>
        </Aux>
    );
}
export default SignIn;