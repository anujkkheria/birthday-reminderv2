export interface Iuser {
    id:string;
    name: string;
    email:string;
    token: string;
  }

 
  export type UserActions={type:"set_user", payload:Iuser}|{type:"logout"}
 
  export interface IUserReducer{
    (state:Iuser,reducer:UserActions):Iuser
  }