import MyRoutes from "./Declaration/Utils";
import Main from "../Containers/Pages/Main/Main";
import Home from "../Containers/Pages/Home/Home";
import Profile from "../Containers/Pages/Profile/Profile";

declare const firebase : any;

const Routes : MyRoutes[] = [
    {
        path : "/",
        menu : true,
        title : "Home",
        exact : true,
        component : Home,
        link : true,
        style : {
            height : "105px",
            display : "flex"
        }
    },
    {
        path : "/profile",
        menu : true,
        title : "Profile",
        component : Profile,
        link : true
    },
    {
        path : "/topics",
        menu : false,
        title : "Topics"
    },
    {
        path : "/description",
        menu : false,
        title : "Description"
    },
    {
        path : "/notes",
        menu : false,
        title : "Notes"
    },
    {
        path : "/questions",
        menu : false,
        title : "Questions"
    },
    {
        title : "Sign Out",
        menu : true,
        signOut : (()=>{
            firebase.auth().signOut().then(function(){
                console.log("User has successfully sign out !");
            }).catch((e : any)=>{
                console.log(e);
            })
        }),
        style : {
            color: "var(--ion-color-secondary)"
        }
    }
];



export const getPath = (id : any) =>{
    return Routes.filter((value : MyRoutes , i : number, arr : MyRoutes[])=>{
        if(id === i){
            return value.path;
        }else if (id === value.path){
            return value.path;
        }else if (id === value.title){
            return value.path;
        }else{
            return arr[i];
        }
    })
}

export const getTitle = (id : any) =>{
    return Routes.filter((value: MyRoutes, i: number, arr: MyRoutes[]) => {
        if (id === i) {
            return value.title;
        } else if (id === value.path) {
            return value.title;
        } else if (id === value.title) {
            return value.title;
        } else {
            return arr[i];
        }
    })
}

export default Routes;