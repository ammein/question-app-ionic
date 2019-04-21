import MyRoutes from "./Declaration/Utils";

const Routes : MyRoutes[] = [
    {
        path: "/signup",
        menu: false,
        title: "Sign Up"
    },
    {
        path : "/signin",
        menu : false,
        title : "Sign In"
    },
    {
        path : "/",
        menu : true,
        title : "Home"
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