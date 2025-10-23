//React框架
import React, {useEffect, useState} from "react";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
//自定义组件
import {Button} from "../../components/ui/widget/Button";
//实体
import {User, usernameValidationRules} from "../../entity/User";
//控制器
import {UserController} from "../../controller/UserController";
import {Divider} from "../../components/decoration/Divider";
import {useSearchParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {InputField} from "../../components/ui/widget/InputField";


//主页
export const CommunityForm: React.FC = () => {

    //状态
    const [mode,setMode] = useState<'browse'|'post'>('browse');
    //路由
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        const keyword = searchParams.get('mode');
        if(keyword==='browse'){
            setMode(keyword);
        }else if(keyword==='post'){
            setMode(keyword);
        }else{
            navigate("?mode=browse");
            window.location.reload();
        }
    }, []);



    const browseForm= (<div className="home-community-box">

    </div>);

    const postForm= (<div className="home-community-box layout-flex-column">
        <InputField
            type="text"
            label="标题"
            placeholder="请输入标题"
            // validationRules={titleValidationRules}
            // onChange={handleInputChange("title")}
            required
        />
        <InputField
            type="text"
            label="内容"
            placeholder="请输入倾述内容"
            // validationRules={titleValidationRules}
            // onChange={handleInputChange("title")}
            required
        />
    </div>);


    return (<div className="layout-flex-column">
        <div className="home-community-header">
            <h2 style={{flexGrow: 1}}>{mode==='browse'&&"社区浏览"}{mode==='post'&&"发布倾述"}</h2>
            <span style={{flexGrow: 0.1}}></span>
            <Button type="default" style={{flexGrow: 2}} onClick={()=>{
                if(mode==='browse'){
                    navigate("?mode=post");
                }else if(mode==='post'){
                    navigate("?mode=browse");
                }
                window.location.reload();
            }}>{mode==='browse'&&"发布倾述"}{mode==='post'&&"社区浏览"}</Button>
            <span style={{flexGrow: 20}}></span>
        </div>
        {mode==='browse'&&browseForm}{mode==='post'&&postForm}
    </div>)
}