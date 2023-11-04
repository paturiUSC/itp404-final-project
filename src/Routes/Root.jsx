import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Root(){
    return (<div className="container-fluid">
        <Navigation />
        <Outlet />
    </div>);
}