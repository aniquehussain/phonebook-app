import {REGISTER_FAIL,REGISTER_SUCCESS,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,CLEAR_ERRORS,USER_LOADED} from "../types";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state,action)=>{
     switch (action.type) {
         case REGISTER_SUCCESS:
         case LOGIN_SUCCESS:
             localStorage.setItem('token', action.payload.token)
             return {
                 ...state,
                 ...action.payload,
                 isAuthenticated: true,
                 loading: false
             }
         case REGISTER_FAIL:
         case LOGIN_FAIL:
         case AUTH_ERROR:  
         case LOGOUT:  
             localStorage.removeItem('token')
             return {
                 ...state,
                 user: null,
                 isAuthenticated: false,
                 token: null,
                 loading: false,
                 error: action.payload
             }   
         
         case CLEAR_ERRORS:
             return {
                 ...state,
                 error: null
             } 
         case USER_LOADED:
             return {
                 ...state,
                 isAuthenticated:true,
                 user: action.payload
             } 
     
         default:
             return state
     }
}