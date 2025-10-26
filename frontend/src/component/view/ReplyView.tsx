import {ReplyDTO} from "../../entity/ReplyDTO";
import React from "react";

export interface ReplyViewProps {
    replyDTO:ReplyDTO
}

export const ReplyView: React.FC<ReplyViewProps> = ({replyDTO}) => {
    return (<div className="reply-card">
        <div className="reply-content">
            <p>{replyDTO.content}</p>
        </div>
        <div className="reply-meta">
            <div className="reply-author">
                <div className="reply-avatar">{replyDTO.displayName[0]}</div>
                <span className="author-name">{replyDTO.displayName}</span>
            </div>
            <div className="reply-time">
                <span className="time-icon"><i className="far fa-clock"></i></span>
                <span>{'' + replyDTO.replyTime}</span>
            </div>
        </div>
    </div>)
}