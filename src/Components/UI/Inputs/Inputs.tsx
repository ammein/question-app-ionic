import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import {IonInput, IonItem, IonLabel} from '@ionic/react';


const inputElements = (props : any) => {
    return(
        <Aux>
            {props.data.map((value : any , i : number , arr : any[])=>{
                return (
                    <Aux>
                    {
                        value.enableLabel ? 
                        <IonItem key={i + value.type}>
                            <IonLabel position={value.position ? value.position : null}>{value.label}</IonLabel>
                        <IonInput
                            value={value.value ? value.value : ""}
                            clearInput={value.clearInput ? true : false}
                            type={value.type}
                            disabled={value.disabled ? true : false}
                            readonly={value.readonly ? true : false} /> 
                        </IonItem>
                            : 
                        <IonInput
                            key={i + value.type}
                            value={value.value ? value.value : ""}
                            clearInput={value.clearInput ? true : false}
                            type={value.type}
                            disabled={value.disabled ? true : false}
                            readonly={value.readonly ? true : false} />
                    }
                    </Aux>
                )
            })}
        </Aux>
    );
}
export default inputElements;