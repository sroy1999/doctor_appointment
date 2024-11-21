import React, { createContext, useMemo } from 'react';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const value = useMemo(() => {
    
  })
  return (
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider;