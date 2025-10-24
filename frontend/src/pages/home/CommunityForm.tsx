//React框架
import React, {useEffect, useRef, useState} from "react";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Outlet, useOutletContext, useSearchParams} from "react-router";
import {Homepage} from "./HomepageForm";
import {Button} from "../../common/view/controller/Button";
import {BrowseForm} from "./community/BrowseForm";
import {PostForm} from "./community/PostForm";

export const Community_Children=[
    {path:"browse/",element:<BrowseForm/>},
    {path:"post/",element:<PostForm/>},
];

//主页
export const CommunityForm: React.FC = () => {
    const context=useOutletContext<Homepage.OutletContext>();
    const urlLocation = useLocation();
    const navigate = useNavigate();
    //钩子
    useEffect(() => {
        if(urlLocation.pathname==='/home/community'||urlLocation.pathname==='/home/community/'){
            navigate("/home/community/browse");
        }
    }, []);


    return (<div className="layout-flex-column">
            <div>
                <div className="horizontal-menu">
                    <NavLink to="browse">社区倾述</NavLink>
                    <NavLink to="post">发布倾述</NavLink>
                </div>
                <Outlet context={context}/>
            </div>
    </div>)
}