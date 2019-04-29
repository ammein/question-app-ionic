import MyRoutes from "./Declaration/Utils";
import Main from "../Containers/Pages/Main/Main";
import Home from "../Containers/Pages/Home/Home";
import Profile from "../Containers/Pages/Profile/Profile";
import Topics from "../Containers/Pages/Topics/Topics";
import Description from "../Containers/Pages/Description/Description";

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
        path : "/:id",
        menu : false,
        title : "Choose Topics",
        component: Topics,
        childrenComponent : [
            {
                path: "/:id/description",
                menu: false,
                title: "Description",
                component : Description
            },
            {
                path: "/:id/notes",
                menu: false,
                title: "Notes"
            },
            {
                path: "/:id/questions",
                menu: false,
                title: "Questions"
            },
        ]
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
        }else if(id === value.component){
            return value.path;
        }else if(value.childrenComponent){
            return value.childrenComponent.filter((val : MyRoutes,i : number ,arr :MyRoutes[])=>{
                if (id === i) {
                    return val.path;
                } else if (id === value.path) {
                    return val.path;
                } else if (id === value.title) {
                    return val.path;
                } else if (id === value.component) {
                    return val.path;
                }
            })
        }
    })
    .reduce((init : MyRoutes , next : MyRoutes)=>{
        return Object.assign(init , next);
    },{})
}

export const getTitle = (id : any) =>{
    return Routes.filter((value: MyRoutes, i: number, arr: MyRoutes[]) => {
        if (id === i) {
            return value.path;
        } else if (id === value.path) {
            return value.path;
        } else if (id === value.title) {
            return value.path;
        } else if (id === value.component) {
            return value.path;
        } else if (value.childrenComponent) {
            return value.childrenComponent.filter((val: MyRoutes, i: number, arr: MyRoutes[]) => {
                if (id === i) {
                    return val.path;
                } else if (id === value.path) {
                    return val.path;
                } else if (id === value.title) {
                    return val.path;
                } else if (id === value.component) {
                    return val.path;
                }
            })
        }
    })
        .reduce((init: MyRoutes, next: MyRoutes) => {
            return Object.assign(init, next);
        }, {})
}

export default Routes;