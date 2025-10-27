import React from "react";
import {MyPsychKnowledgeAdminForm} from "./mine/MyPsychKnowledgeAdminForm";
import {MyPsychKnowledgeTeacherForm} from "./mine/MyPsychKnowledgeTeacherForm";
import {Outlet, useOutletContext} from "react-router";
import {PsychKnowledgeRoot} from "./PsychKnowledgeRootPage";

export namespace MyPsychKnowledge{
    //子路由
    export const Children=[
        {path:"admin",element:<MyPsychKnowledgeAdminForm/>},
        {path:"teacher",element:<MyPsychKnowledgeTeacherForm/>},
    ];
}


export const MyPsychKnowledgeForm:React.FC = () => {
    const context=useOutletContext<PsychKnowledgeRoot.OutletContext>();
    return (<div><Outlet context={context}/> </div>)
}