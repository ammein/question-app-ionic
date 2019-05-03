import MyRoutes from "./Declaration/Utils";
import Home from "../Containers/Pages/Home/Home";
import Profile from "../Containers/Pages/Profile/Profile";
import Topics from "../Containers/Pages/Topics/Topics";
import Description from "../Containers/Pages/Topics/Description/Description";
import Questions from "../Containers/Pages/Topics/Questions/Questions";
import Notes from "../Containers/Pages/Topics/Notes/Notes";
import Rankings from "../Containers/Pages/Rankings/Rankings";

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
        path : "/rankings",
        menu : true,
        title : "Rankings",
        link : true,
        component : Rankings
    },
    {
        path : "/profile",
        menu : true,
        title : "Profile",
        component : Profile,
        link : true
    },
    {
        path : "/learn/:id",
        menu : false,
        title : "Choose Topics",
        component: Topics,
        childrenComponent : [
            {
                path: "/learn/:id/:topic/:index/description",
                menu: false,
                title: "Description",
                component : Description,
                enableSegment : true,
                segment: true,
            },
            {
                path: "/learn/:id/:topic/:index/notes",
                menu: false,
                title: "Notes",
                component : Notes,
                enableSegment: true,
                segment: true,
            },
            {
                path: "/learn/:id/:topic/:index/questions",
                menu: false,
                title: "Questions",
                component : Questions,
                enableSegment: true,
                segment: true,
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