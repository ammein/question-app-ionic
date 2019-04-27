import React, { CSSProperties } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import {IonInput, IonItem, IonLabel} from '@ionic/react';
import classes from './Inputs.css';
import { Inputs } from '../../../Utils/Declaration/Utils';

const errorStyle : CSSProperties = {
    marginBottom: "20px",
    color: "#ff3939",
    fontSize: "12px"
}

interface Props {
    data: Inputs[]
}


const InputElements : React.SFC<Props> = ({data}) => {

    return(
        <Aux>
            {data.map((value: Inputs, i: number, arr: Inputs[])=>{
                return (
                    <Aux key={i}>
                    {
                        value.enableLabel ? 
                        <IonItem key={i + value.type} lines={value.line ? value.line : "none"} style={value.itemStyle ? {
                                "--background": `var(--ion-color-${value.itemStyle})`
                            } : {
                                    "--background": `var(--ion-color-primary`
                                }}>
                            <IonLabel position={value.position ? value.position : undefined}>{value.label}</IonLabel>
                        <IonInput
                            value={value.value ? value.value : ""}
                            clearInput={value.clearInput ? true : false}
                            type={value.type}
                            disabled={value.disabled ? true : false}
                            readonly={value.readonly ? true : false}
                            placeholder={value.placeholder}
                            onIonChange={value.onChange ? ((e : any) => value!.onChange!(e)) : ()=> {}}
                            name={value.name}
                            style={value.style ? value.style : null}
                            required={value.required ? true : false}
                            min={value.min? value.min : undefined}
                            max={value.max ? value.max : undefined}
                            minlength={value.minLength ? value.minLength : undefined}
                            maxlength={value.maxLength ? value.maxLength : undefined} /> 
                            {value.error ? <p style={errorStyle}>{value.errorMessage}</p> : null}
                        </IonItem>
                            : 
                        <Aux key={i + value.type}>
                        <IonInput
                            key={i + value.type}
                            value={value.value ? value.value : ""}
                            clearInput={value.clearInput ? true : false}
                            type={value.type}
                            disabled={value.disabled ? true : false}
                            readonly={value.readonly ? true : false}
                            placeholder={value.placeholder}
                                        onIonChange={value.onChange ? ((e: any) => value.onChange!(e)) : () => { }}
                            name={value.name}
                            style={value.style ? value.style : null}
                            required={value.required ? true : false}
                            min={value.min? value.min : undefined}
                            max={value.max ? value.max : undefined}
                            minlength={value.minLength ? value.minLength : undefined}
                            maxlength={value.maxLength ? value.maxLength : undefined} />
                            {value.error ? <p style={errorStyle}>{value.errorMessage}</p> : null}
                        </Aux>
                    }
                    </Aux>
                )
            })}
        </Aux>
    );
}
export default InputElements;