export interface PageState {
    path? : string,
    component? : React.Component,
    menu? : boolean,
    title? : string
}

interface MyRoutes extends PageState{
    thumbnail? : ImageBitmap | any,
    icon? : any
}

export interface MyProps {
    
}

export interface ArrayRoutes {
    [allRoutes : number] : MyRoutes
}

export default MyRoutes;