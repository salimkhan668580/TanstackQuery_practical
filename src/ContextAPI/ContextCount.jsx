import React, { createContext, useState } from 'react'


export const myContext=createContext();
function ContextCountProvider({children}) {
    const [count,setCount]=useState(0);

    return (
        <myContext.Provider value={{count,setCount}}>
            {children}
        </myContext.Provider>
    )
 
}

export default ContextCountProvider