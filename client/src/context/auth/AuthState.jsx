import React, {useReducer} from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  CLEAR_ERRORS,
  USER_LOADED,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../types';
import Axios from "axios";
import setAuthToken from "../../utils/setAuthtoken";



const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user:null
  };

  const [state,dispatch] = useReducer(AuthReducer, initialState);

  //Load User
  const loadUser = async()=>{
    
    localStorage.token && setAuthToken(localStorage.token);
  try {
  const res = await Axios.get('api/auth/');

  dispatch({type: USER_LOADED, payload: res.data})
  } catch (err) {
  dispatch({type: AUTH_ERROR, payload: err.response.msg});
  }


  }
  //Register User
  const register = async(formdata)=>{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await Axios.post("/api/users", formdata, config);

      dispatch({type: REGISTER_SUCCESS, payload: res.data})
      loadUser();

    } catch (err) {
      dispatch({type: REGISTER_FAIL, payload: err.response.msg})
    }
  
  
  }
  //Login user
  const login = async(formdata)=>{

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await Axios.post("/api/auth",formdata,config);
      dispatch({type: LOGIN_SUCCESS, payload: res.data})
      loadUser();
    } catch (err) {
      dispatch({type: LOGIN_FAIL, payload: err.response.msg})
    }
  }
  //Logout 
  const logout = () =>dispatch({type: LOGOUT});
  
  //Clear Errors
  const clearErrors = ()=> dispatch({type: CLEAR_ERRORS});
  

  const context = {
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    user: state.user,
    register,
    login,
    loadUser,
    logout,
    clearErrors
  }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );

};

export default AuthState;

