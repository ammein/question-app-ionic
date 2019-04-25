import React , { ComponentClass } from "react";
import {ToastButton} from '@ionic/core';

export interface PageState {
    path? : string,
    component? : React.ComponentProps<any>
    menu? : boolean,
    title? : string,
    exact? : boolean
}

interface MyRoutes extends PageState{
    thumbnail? : ImageBitmap | any,
    icon? : any,
    auth? : boolean,
    signOut? : Function
}

export interface MyProps {
    back? : any,
    currentPath? : any,
    enableToolbar? : any,
    history? : any
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
    maxLength? : number,
    errorMessage? : string,
    error? : boolean
}

export interface MyUser{
    emailVerified : boolean,
    displayName? : string,
    uid : string,
    email : string
}

export interface Auth {
    signUp: Inputs[],
    signIn: Inputs[]
}

export type MyContext = {
    path? : string,
    recheckUser? : (()=> void),
    user? : MyUser
}

export interface Toast{
    showToast: boolean,
    dismissHandler?: (e: CustomEvent<any>) => void,
    message?: string,
    duration?: number,
    header? : string,
    position?: "top" | "bottom" | "middle" | undefined,
    buttons? : (string | ToastButton)[] | undefined
}

export interface firebaseEmailVerification {
    url : string | undefined,
    iOS? : {
        bundleId : string
    },
    android? : {
        packageName : string,
        installApp : boolean,
        minimumVersion : string
    },
    handleCodeInApp : boolean,
    dynamicLinkDomain? : string
}

export interface ConfigFirebase {
    apiKey : string,
    authDomain : string,
    databaseURL : string,
    projectId : string,
    storageBucket : string,
    messagingSenderId : string
}

export default MyRoutes;