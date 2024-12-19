import React,{ useReducer,createContext } from "react";
import { IUserReducer,Iuser } from "./UserState";
import reducer from './Reducer/UserReducer'

const user:Iuser = {
    id:"",
    name:"",
    email:"",
    token:""
}

const useUserContext = (iniuser:Iuser) => {
    const [state,dispatch]= useReducer<IUserReducer>(reducer,iniuser)
    const setUser=(userInfo:Iuser)=>{
        dispatch({type:"set_user",payload:userInfo})
    }
    const logout =() =>{
        dispatch({type:"logout"})
    }
    return{state,setUser,logout}
}

type UseUserContext = ReturnType<typeof useUserContext>

const userItems:UseUserContext={
    state: user,
    setUser:(userInfo)=>{ },
    logout:()=>{}
}

const userContext = createContext<UseUserContext>(userItems)

type ChildrenType ={
    children?:any
}

const UserProvider = ({children}:ChildrenType):React.ReactElement=>{
    return<userContext.Provider value={useUserContext(user)}>
        {children}
    </userContext.Provider>
}

export {userContext,UserProvider,useUserContext}