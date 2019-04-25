import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import classes from './ResetPassword.css';
import { IonImg } from '@ionic/react';
import forgot from '../../../Assets/SVG/forgotpassword.svg';

const resetPassword = (props : any) => {
    return(
        <Aux>
            <div className={classes.ResetPasswordArea}>
                <IonImg src={forgot} class={classes.SVGImage}></IonImg>
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