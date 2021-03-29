import React, { useContext, useState,useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const{register,error,clearErrors, isAuthenticated} = authContext
    const {setAlert} = alertContext;

    useEffect(() => {

        isAuthenticated && props.history.push('/');
        if (error) {
            
            error.msg === "User already exists" && setAlert(error.msg, "danger");  
            clearErrors();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error,isAuthenticated,props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
  
    const {confirm_password,email,name,password} = user;
      
    const onChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    const onSubmit = e=>{
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert("Please enter all fields","danger");
        } else if(password !== confirm_password){
            setAlert("Passwods do not match","danger")
        }else{
          register({
            user,
            email,
            name,
            password
        });
        
       
    }}
    return (
        <div className="form-container lg:w-1/2 md:w-1/2 sm:w-full mx-auto">
         <h1 className="font-bold text-lg my-6">Account <span className="text-primary ">Register</span></h1> 
         <form onSubmit={onSubmit}>
             <div className="form-group">
                 <label htmlFor="name">Name</label>
                 <input type="text" name="name" value={name} onChange={onChange}/>
             </div>
             <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input type="email" name="email" value={email} onChange={onChange} />
             </div>
             <div className="form-group">
                 <label htmlFor="password">Password</label>
                 <input type="password" name="password" value={password} onChange={onChange} minLength='6'/>
             </div>
             <div className="form-group">
                 <label htmlFor="name">Confirm Password</label>
                 <input type="password" name="confirm_password" value={confirm_password} onChange={onChange} minLength='6'/>
             </div>
             <input type="submit" value="Register" className="btn btn-primary btn-block rounded-none"/>
         </form>        
        </div>
    )
}

export default Register;
