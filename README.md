# Installation Setup
> Extract Tutorial from [https://github.com/ionic-team/ionic-react-conference-app](https://github.com/ionic-team/ionic-react-conference-app)
```bash
# Install the Create React App CLI.

npm install -g create-react-app

# Install the Cordova CLI.

npm install -g cordova

# Create the project.

create-react-app tutorial --typsescript

# Install Ionic and dependencies
npm install --save typescript @types/node @types/react @types/react-dom @types/jest @ionic/core @ionic/react

# or

yarn add typescript @types/node @types/react @types/react-dom @types/jest @ionic/core @ionic/react

# Because we will be editing the Webpack configuration, go to your Create React App project directory and run:

yarn run eject
```

Go to your `config/paths.js` file and change :

`appBuild: resolveApp('build')` to `appBuild: resolveApp('www')`

> Because your files will be served from `file://` (https://github.com/facebookincubator/create-react-app/issues/1094)

Add this line to your `package.json` :

```json
"homepage": "."
```

Next modify your `index.js` so it looks like:
```js
const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
```

or in `index.tsx` Typescript format :
```tsx
const startApp = () =>{
    ReactDOM.render(<App></App>, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register();
}

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}

declare global{
    interface Window {
        cordova : any
    }
}
```

---

# Production Guide (Build Android or iOS app builder for Android Studio or XCode)

These are the commands for generating android file
```bash
# Install ionic CLI. Refer : https://ionicframework.com/docs/cli
npm install -g ionic

# Enable ionic intergrations
ionic init "My React App" --type=custom
ionic integrations enable capacitor

# Add android or ios
ionic capacitor add <android|ios>

# Copy build folder to android build
ionic capacitor copy

# Generate resources and config.xml on root project
ionic integrations enable cordova --add

# Run on Android Studio or XCode
ionic capacitor open <android|ios>

# Install any plugin
ionic cordova plugin add name-of-plugin

# Update to app
npx cap update
```

If you have Android Studio installed on different drive such as D: drive. You may insert this on `capactior.config.json`. This will execute when you running `ionic capacitor open <android|ios>` :
```json
{
    "windowsAndroidStudioPath" : "D:\\Android\\Android Studio\\bin\\studio64.exe"
}
```

## If you unable to eject device from Emulator Android Studio
Run :
```bash
adb kill-server
```

> Make sure add to `Path` on System Variable to your `/Android/Sdk/platform-tools`. Local file located on `C:\Users\<Username>\AppData\Local\Android\Sdk\platform-tools`

### React Router
For react router typescript , you need these `hashRouter` to make it run normally on `file://` . But first install history npm dependencies :

```bash
# Ofcourse , install the dependencies first
npm i -S history
npm i -S react-router-dom
```
On Your Code :

```tsx
import { Router } from 'react-router-dom';
var hashHistory = require("history").createHashHistory;

// Use hashHistory for phonegap app enable
const createHashHistory = hashHistory();

<Router history={createHashHistory}>
 {/* Other Route here */}
</Router>
```

---

## Node JS Deploy Server
> Deploy any of your `server.js` to Heroku.

Add this line into your `server.js` to enable all CORS origin :
```js
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
```

## Point Your Cordova Services to Heroku (Angular/Cordova Framework)
Modify www/js/services.js and specify the URL where your Node.js server is running :
```js
angular.module('directory.services', ['ngResource'])
    .factory('Employees', function ($resource) {
        return $resource('http://ionic-directory.herokuapp.com/employees/:employeeId/:data');
    });
```
---

# Typescript tips

Encounter :
```bash
Object is possibly null
```

Solution : 
> Simply add `!.method()` or `object.data!.data`
```tsx
// this.state.cart may be undefined
this.state!.cart

// obj.data.hey may be undefined
obj.data!.hey

// obj.data.map(()=> ) may be undefined
obj.data!.map(() =>)
```

Flexible set state based on input :
```tsx
// For dynamically update state based on target value
this.setState({ [id]: e.currentTarget.value } as Pick<State, keyof State>);
```

`JSON.parse()`, `JSON.stringify()` or any method available shows an alert of `does not exist in type of {key : string}` :
```tsx
const user: any = await Storage.get({key : "user"} as any);
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
