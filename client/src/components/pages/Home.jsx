import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/keeper/contactContext';
import ContactFilter from '../contacts/ContactFilter';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts'

const Home = () => {

  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext)


  useEffect(() => {
    
    authContext.loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm/>
      </div>
      <div>
        <ContactFilter/>
        <Contacts/>
      </div>
    </div>
  );
}

export default Home;
