import { createContext, useContext } from 'react';

export const ContextDefinition = createContext({
    getToken: false,
    setToken: () => {}
});

export default () => useContext(ContextDefinition);
