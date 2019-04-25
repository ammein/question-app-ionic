import { firebaseEmailVerification } from "../Declaration/Utils";
import config from '../Firebase/Config';

// Wanted to do redirect to the app. But need to do a lot of configurations

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