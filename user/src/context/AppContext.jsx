import React, { createContext, useMemo } from 'react';
import { doctors } from '../assets/assets';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '₹';
    const value = useMemo(() => ({
        doctors,
        currencySymbol
    }), [doctors, currencySymbol]);
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;