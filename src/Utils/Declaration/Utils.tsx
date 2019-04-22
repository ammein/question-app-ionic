import React , { ComponentClass } from "react";

export interface PageState {
    path? : string,
    component? : React.ComponentProps<any>
    menu? : boolean,
    title? : string,
    exact? : boolean
}

interface MyRoutes extends PageState{
    thumbnail? : ImageBitmap | any,
    icon? : any
}

export interface MyProps {
    back? : any,
    currentPath? : any,
    enableToolbar? : any
}

export interface ArrayRoutes {
    [allRoutes : number] : MyRoutes
}

export interface Inputs {
    enableLabel? : boolean,
    type: string,
    position? : string,
    label? : string,
    value? : any,
    clearInput? : boolean,
    disabled? : boolean,
    readonly? : boolean,
    placeholder? : string,
    onChange? : void,
    name : string,
    style? : any,
    required? :boolean,
    min? : string,
    max? : string,
    minLength? : number,
    maxLength? : number
}

export default MyRoutes;