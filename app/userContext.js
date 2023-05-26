import React from 'react';
export const UserContext = React.createContext();
export function useUserContext() {
    return React.useContext(UserContext);
}