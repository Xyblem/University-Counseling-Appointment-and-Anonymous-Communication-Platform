import React from 'react';
import {useNavigate } from 'react-router-dom';
import {CheckLogin, CheckLoginProps} from './CheckLogin';

interface RouterCheckLoginProps extends Omit<CheckLoginProps, 'to'> {
    to: string;
}

export const RouterCheckLogin: React.FC<RouterCheckLoginProps> = ({ to, ...props }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(to);
    };

    return (
        <CheckLogin
            {...props}
            to={to}
            onLoginFail={handleRedirect}
        />
    );
};
