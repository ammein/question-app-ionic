import { firebaseEmailVerification, MyUser, MyTopics, UserTopics } from "../Declaration/Utils";
import config from '../Firebase/Config';

// Wanted to do redirect to the app. But need to do a lot of configurations

export interface MyFirebase {
    database() : {
        ref(link : string) : {
            once(value : "value" | undefined) : Promise<any>,
            on(value: "value" | undefined , callback : (snapshot : any)=>void): Promise<any>,
            set(value : any , callback? : (error : any) => void) : any
            update(value: any): any
        }
    },
    auth : {
        () : {
            onAuthStateChanged(user: any): void,
            createUserWithEmailAndPassword(email : string , password : string) : Promise<void>,
            signInWithEmailAndPassword(email : string , password : string) : Promise<void>,
            sendPasswordResetEmail(email : string) : Promise<void>,
            currentUser : MyUser extends any? MyUser : any
        }
        EmailAuthProvider: {
            credential(email: string | MyFirebase["auth"]["call"]["arguments"]["currentUser"], password: string): void
        }
    }
}

interface CustomAction{
    mode : "verifyEmail" | "resetPassword" | "recoverEmail",
    url : string | undefined
}

function actionURL(action : CustomAction){
    return {
        url: `https://${config.authDomain}/__/auth/action?mode=${action.mode}&oobCode=${'_' + Math.random().toString(36).substr(2, 9)}&apiKey=${config.apiKey}${action.url ? "&continueUrl=" + action.url : ""}&lang=en`,
        iOS : {
            bundleId : "io.ionic.starter"
        },
        android : {
            packageName : "io.ionic.starter",
            installApp : true,
            minimumVersion : "1.0.0"
        },
        handleCodeInApp : false
    } as firebaseEmailVerification
}

export default actionURL;