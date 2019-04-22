import React from 'react';
import Aux from '../../../../HOC/Auxilliary/Auxilliary';
import InputElements from '../../../../Components/UI/Inputs/Inputs';
import {Inputs} from '../../../../Utils/Declaration/Utils';
import classes from './SignUp.css';

interface Props {
    data? : any[]
}


const SignUp : React.SFC<Props> = (props) => {

    return(
        <Aux>
            <div className={classes.SignUpArea}>
                <InputElements data={props.data}/>
            </div>
        </Aux>
    );
}
export default SignUp;