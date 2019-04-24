import React from 'react';
import {IonToast} from '@ionic/react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import {Toast} from '../../../Utils/Declaration/Utils';

interface Props{
    toast? : Toast
}

const toast : React.SFC<Props> = (props) => {
    return(
        <Aux>
            {props.toast ? 
                <IonToast
                    isOpen={props.toast.showToast}
                    onDidDismiss={props.toast.dismissHandler ? props.toast.dismissHandler : () => { }}
                    message={props.toast.message}
                    duration={props.toast.duration}
                    position={props.toast.position}
                    header={props.toast.header}
                    buttons={props.toast.buttons ? props.toast.buttons : undefined}>
                </IonToast>
                :
                null
        }
        </Aux>
    );
}
export default toast;