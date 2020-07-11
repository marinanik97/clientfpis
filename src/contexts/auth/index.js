import React, { useState } from 'react';
import Context, { ContextDefinition } from './AuthContext';

const token = window.localStorage.getItem('auth_token');

const State = (props) => {
    const [getToken, setToken] = useState(!!token);

    const setTokenLS = (newToken) => {
        if (newToken) {
            window.localStorage.setItem('auth_token', newToken);
        } else {
            window.localStorage.removeItem('auth_token');
        }
        setToken(!!newToken);
    };

    return (
        <ContextDefinition.Provider
            value={{
                getToken,
                setToken: setTokenLS,
            }}
        >
            {props.children}
        </ContextDefinition.Provider>
    );
};

export {
    State,
    Context,
};
