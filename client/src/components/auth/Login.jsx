import React, { useContext, useState, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {setAlert} = alertContext;
    const {login,error,clearErrors,isAuthenticated} = authContext;
    
    useEffect(() => {

        isAuthenticated && props.history.push('/')

        if (error) {
            error.msg === "Invalid Credentials" && setAlert(error.msg, "danger");  
            clearErrors();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error,isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    
    const {email,password} = user;
      
    const onChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    const onSubmit = e=>{
        e.preventDefault();
        login({email,password});
        if (error) {
            error.msg === "Invalid Credentials" && alertContext.setAlert(error.msg,"danger"); 
        }  
    }
    return (
        <div className="form-container lg:w-1/2 md:w-1/2 sm:w-full mx-auto">
         <h1  className="font-bold text-lg my-6">Account <span className="text-primary">Login</span></h1> 
         <form onSubmit={onSubmit}>
             <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input type="text" name="email" value={email} onChange={onChange}/>
             </div>
             <div className="form-group">
                 <label htmlFor="password">Password</label>
                 <input type="password" name="password" value={password} onChange={onChange}/>
             </div>
             <input type="submit" value="Login" className="btn btn-primary btn-block"/>
         </form>        
        </div>
    )
}

export default Login;
