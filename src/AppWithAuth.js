import React, { useEffect } from "react";
import {State} from './contexts/auth'
import App from './App';
import { BrowserRouter } from 'react-router-dom';


export default function AppWithAuth(){
    return (
        <BrowserRouter>
            <State>
                <App/>
            </State>
        </BrowserRouter>
    );
}

