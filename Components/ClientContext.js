import React, { useState } from 'react';

const ClientContext = React.createContext([{},()=>{}])

const ClientProvider=(props)=>{
    const initalClient = {
        name:"",
        email :"",
        password:"",
        phone:"",
        handleChangeText: (property, value) => {
            setClient({...client,[property]: value});
          }
    }
    const[client,setClient] = useState(initalClient)

    return(
        <ClientContext.Provider value={[client,setClient]}>
            {props.children}
        </ClientContext.Provider>
    )
}

export {ClientContext,ClientProvider}