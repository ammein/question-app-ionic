import React, { CSSProperties } from 'react';
import { IonPopover } from '@ionic/react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import classes from './Popover.css';

interface PopOverProps{
    open : boolean,
    dismissHandler? : ((e ?: any) => void),
    children : any
}

const popover = (props: PopOverProps) => {
    return(
        <IonPopover
        isOpen={props.open}
        showBackdrop={props.open}
        cssClass={classes.Popover}
        onDidDismiss={props.dismissHandler ? props.dismissHandler : () => {}}>
            <Aux>
                {props.children}
            </Aux>
        </IonPopover>
    );
}
export default popover;