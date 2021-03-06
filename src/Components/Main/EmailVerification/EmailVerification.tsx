import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import classes from './EmailVerification.css';
import {IonImg} from '@ionic/react';
import SVG from '../../../Assets/SVG/verify.svg';

const emailVerification = (props : any) => {
    return(
        <Aux>
            <div className={classes.VerificationArea}>
                <IonImg src={SVG}></IonImg>
                <div className={classes.TextArea}>
                    <p className={classes.VerificationAreaText}>
                        Verify Your Email Address to Continue
                    </p>
                </div>
            </div>
        </Aux>
    );
}
export default emailVerification;