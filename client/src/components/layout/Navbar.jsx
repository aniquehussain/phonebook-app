import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/keeper/contactContext';

const Navbar = ({title,icon}) => {

    const authContext = useContext(AuthContext)
    const {user, isAuthenticated, logout} = authContext;

    const contactContext = useContext(ContactContext)
    const {clearContacts} = contactContext;


    const onLogout = () =>{
        logout();
        clearContacts();
        
    }

    const authLinks = (
     <Fragment>
         <li className="lg:mx-6 sm:mx-0">Hello {user && user.name.split(" ")[0]}</li>
         <li><a href="#!" onClick={onLogout}>
             <i className="fas fa-sign-out-alt text-gray-500 hover:text-gray-900"/>{' '}
             <span className="hide-sm text-gray-500 hover:text-gray-900">Logout</span>
         </a></li>
     </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="text-gray-500 hover:text-gray-900">
                <Link to="/register" ><span className="text-gray-500 hover:text-gray-900">Register</span></Link>
            </li>
            <li>
                <Link to="/login" ><span className="text-gray-500 hover:text-gray-900">Login</span></Link>
            </li>
        </Fragment>
       );

    return (
        <div className="navbar bg-gray-200 lg:h-16 sm:h-20 shadow-sm">
        <h1 className="text-xl">
            <i className={icon} /> {title}
        </h1>
        <ul className="sm:my-1 lg:my-0">
            {isAuthenticated ? authLinks : guestLinks}
           
        </ul>
        </div>
    )
}

Navbar.prototypes = {
    title: PropTypes.object.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Phonebook',
    icon: 'fas fa-address-book'
}

export default Navbar
