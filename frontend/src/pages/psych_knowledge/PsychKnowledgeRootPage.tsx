import React, {useState} from "react";
import {UserController} from "../../controller/UserController";
import {useLocation, useNavigate} from "react-router-dom";
import {FetchUserComponent} from "../../component/FetchUserComponent";
import {Outlet} from "react-router";
import {CheckLoginComponent} from "../../component/CheckLoginComponent";
import {User} from "../../entity/User";
import {PsychKnowledgeTeacherPostForm} from "./PsychKnowledgeTeacherPostForm";
import {PsychKnowledgeBrowseForm} from "./PsychKnowledgeBrowseForm";
import {PsychKnowledgeAdminAudit, PsychKnowledgeAdminAuditForm} from "./PsychKnowledgeAdminAuditForm";
import {MyPsychKnowledge, MyPsychKnowledgeForm} from "./MyPsychKnowledgeForm";

export namespace PsychKnowledgeRoot {
    export interface OutletContext{
        isLoggedIn:boolean;
        user:User|null;
    }

    //子路由
    export const Children=[
        {path:"post",element:<PsychKnowledgeTeacherPostForm/>},
        {path:"browse",element:<PsychKnowledgeBrowseForm/>},
        {path:"admin",element:<PsychKnowledgeAdminAuditForm/>,children:PsychKnowledgeAdminAudit.Children},
        {path:"mine",element:<MyPsychKnowledgeForm/>,children:MyPsychKnowledge.Children},
    ];
}

export const PsychKnowledgeRootPage:React.FC = () => {
    //控制器
    const userController = new UserController();

    //路由
    const navigate = useNavigate();
    const urlLocation = useLocation();
    const [outletContext,setOutletContext] = useState<PsychKnowledgeRoot.OutletContext>({isLoggedIn:false,user:null});


    return (<div><CheckLoginComponent
        resultCallback={(result )=>{
            outletContext.isLoggedIn=result===true;
        }}
    >
        <FetchUserComponent resultCallback={(result)=>{
            outletContext.user = result?result:null;
        }}>
            <Outlet context={outletContext}/>
        </FetchUserComponent>
    </CheckLoginComponent></div>)
}