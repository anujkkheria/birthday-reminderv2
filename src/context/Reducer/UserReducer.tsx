import { IUserReducer } from "../UserState"
import { Iuser } from "../UserState"
const UserReducer:IUserReducer = (state:Iuser,action)=>{
    switch(action.type){
        case "set_user":
            return{...action.payload}
    case "logout":return{
        ...state,id:"",name:"",email:"",token:""
    }
    default: return state 
}
}

export default UserReducer