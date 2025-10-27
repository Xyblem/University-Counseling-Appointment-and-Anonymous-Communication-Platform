import React from "react";
import {PsychKnowledgeAuditForm} from "./admin_audit/PsychKnowledgeAuditForm";
import {PsychKnowledgeReportAuditForm} from "./admin_audit/PsychKnowledgeReportAuditForm";
import {Outlet, useOutletContext} from "react-router";
import {PsychKnowledgeRoot} from "./PsychKnowledgeRootPage";


export namespace PsychKnowledgeAdminAudit{
    //子路由
    export const Children=[
        {path:"audit",element:<PsychKnowledgeAuditForm/>},
        {path:"report_audit",element:<PsychKnowledgeReportAuditForm/>},
    ];
}


export const PsychKnowledgeAdminAuditForm:React.FC = () => {
    const context=useOutletContext<PsychKnowledgeRoot.OutletContext>();
    return (<div><Outlet context={context}/> </div>)
}