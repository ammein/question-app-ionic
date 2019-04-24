import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import classes from './ResetPassword.css';
import { IonImg } from '@ionic/react';

const resetPassword = (props : any) => {
    return(
        <Aux>
            <div className={classes.ResetPasswordArea}>
                <IonImg src=""></IonImg>
                <div className={classes.TextArea}>
                    <p className={classes.ResetPasswordText}>
                        Reset Password Sent To Your Email
                    </p>
                </div>
            </div>
        </Aux>
    );
}
export default resetPassword;