import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import ContactContext from '../../context/keeper/contactContext';


const ContactItem = ({ contact }) => {
    
    const { _id,name, type, email,phone } = contact;
    const contactContext = useContext(ContactContext);
    const {deleteContact,setCurrent,clearCurrent} = contactContext;

    const onDelete = () =>{
      
       deleteContact(_id);
       clearCurrent();
    }

    return (
      <div className='card bg-gray-100 border-0 shadow-sm hover:shadow-md'>
        <h3 className='text-gray-600 font-bold text-left'>
          {name}
          {''}{' '}
          <span
            style={{ float: 'right' }}
            className={
              'font-normal badge ' +
              (type === 'professional' ? 'badge-success' : 'badge-primary')
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </h3>
        <ul className='list'>
          {email && (
            <li>
              <i className='fas fa-envelope-open mx-1'></i>
              {email}
            </li>
          )}
          {phone && (
            <li>
              <i className='fas fa-phone mx-1'></i>
              {phone}
            </li>
          )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={()=> setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
      </div>
    );
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;
