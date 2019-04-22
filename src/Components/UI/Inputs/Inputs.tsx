import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import {IonInput, IonItem, IonLabel} from '@ionic/react';


const InputElements = ({data} : any) => {
    return(
        <Aux>
            {data.map((value : any , i : number , arr : any[])=>{
                return (
                    <Aux key={i}>
                    {
                        value.enableLabel ? 
                        <IonItem key={i + value.type}>
                            <IonLabel position={value.position ? value.position : null}>{value.label}</IonLabel>
                        <IonInput
                            value={value.value ? value.value : ""}
                            clearInput={value.clearInput ? true : false}
                            type={value.type}
                            disabled={value.disabled ? true : false}
                            readonly={value.readonly ? true : false}
                            placeholder={value.placeholder}
                            onIonChange={value.onChange ? ((e : any) => value.onChange(e)) : undefined}
                            name={value.name}
                            style={value.style ? value.style : null}
                            required={value.required ? true : false}
                            min={value.min? value.min : undefined}
                            max={value.max ? value.max : undefined}
                            minlength={value.minlength ? value.minlength : undefined}
                            maxlength={value.maxLength ? value.maxLength : undefined} /> 
                        </IonItem>
                            : 
                        <IonInput
                            key={i + value.type}
                            value={value.value ? value.value : ""}
                            clearInput={value.clearInput ? true : false}
                            type={value.type}
                            disabled={value.disabled ? true : false}
                            readonly={value.readonly ? true : false}
                            placeholder={value.placeholder}
                            onIonChange={value.onChange ? ((e : any) => value.onChange(e)) : undefined}
                            name={value.name}
                            style={value.style ? value.style : null}
                            required={value.required ? true : false}
                            min={value.min? value.min : undefined}
                            max={value.max ? value.max : undefined}
                            minlength={value.minlength ? value.minlength : undefined}
                            maxlength={value.maxLength ? value.maxLength : undefined} />
                    }
                    </Aux>
                )
            })}
        </Aux>
    );
}
export default InputElements;