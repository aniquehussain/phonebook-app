import React, {useContext, Fragment, useEffect} from 'react';
import ContactContext from '../../context/keeper/contactContext';
import ContactItem from './ContactItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from "../layout/Spinner";

const Contacts = () => {

  const contactContext = useContext(ContactContext);
  const {contacts, filtered,getContacts,loading,deleteContact} = contactContext;

  useEffect(() => {
    
    getContacts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
    {contacts !== null && !loading ? (<TransitionGroup className="">
        {filtered !== null
          ? filtered.map(contact => {

            return <CSSTransition key={contact._id} timeout={500} classNames="item"><ContactItem contact={contact}/>
            </CSSTransition>
          })
          : contacts.map((contact) => {
            return <CSSTransition key={contact._id} timeout={500} classNames="item"><ContactItem contact={contact}/></CSSTransition>
          })}
      </TransitionGroup>): <Spinner/>}
    </Fragment>
  )
}

export default Contacts;
