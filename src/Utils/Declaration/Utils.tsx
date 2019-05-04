import React , { ComponentClass, CSSProperties } from "react";

export interface PageState {
    path? : string,
    component? : React.ComponentProps<any>
    menu? : boolean,
    title? : string,
    exact? : boolean,
    link? : boolean
}

interface MyRoutes extends PageState{
    thumbnail? : any,
    style? : CSSProperties,
    icon? : any,
    getLink? : string,
    pushLink? : (e : any , value : any) => void,
    auth? : boolean,
    autoHide? : true,
    signOut? : (event : MouseEvent) => void,
    enableSegment? : true,
    childrenComponent ? : ChildrenRoutes[],
    segment? :boolean
}

export interface ChildrenRoutes extends MyRoutes{
    parent? : string
}

export interface MyProps {
    back? : any,
    currentPath? : any,
    enableToolbar? : any,
    history? : any,
    match? : any,
    location? : any
}

export interface ArrayRoutes {
    [allRoutes : number] : MyRoutes
}

export interface Inputs {
    enableLabel? : boolean,
    type: "number" | "time" | "email" | "time" | "password" | "date" | "search" | "tel" | "url" | "text",
    position? : "fixed" | "stacked" | "floating",
    label? : string,
    value? : any,
    clearInput? : boolean,
    disabled? : boolean,
    readonly? : boolean,
    placeholder? : string,
    onChange? : ((e : CustomEvent<any>) => void),
    name : string,
    style? : any,
    required? :boolean,
    min? : string,
    max? : string,
    minLength? : number,
    maxLength? : number,
    errorMessage? : string,
    error? : boolean,
    line? : "full" | "inset" | "none",
    itemStyle? : string
}

export interface Questions{    
    question: string,
    answers : string[],
    correctAnswer : string,
    userAnswer ? : string
}

export interface MyTopics {
    name : string,
    description : string ,
    notes : string,
    questions: Questions[],
    completion?: number
}

export interface UserTopics{
    data : MyTopics[]
    buy ?: boolean,
    [index : string] : any // To extend or create any object via property name
}


export interface MyUser extends IndexMyUser{
    emailVerified : boolean,
    displayName? : string,
    uid : string,
    email : string,
    photoURL ? : string
}

interface IndexMyUser{
    [key: string] : any
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
    buttons? : any[],
    color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark" 
}

export interface CordovaCamera{
    PictureSourceType: {
        CAMERA: any,
        PHOTOLIBRARY: any,
        SAVEDPHOTOALBUM: any
    },
    DestinationType: {
        FILE_URI: any,
        DATA_URL : any,
        NATIVE_URI : any
    },
    EncodingType: {
        JPEG: any,
        PNG: any
    },
    MediaType: {
        PICTURE: any
    }
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

export interface Slider{
    img : string | undefined
}

export default MyRoutes;