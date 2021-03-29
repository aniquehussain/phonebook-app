import React, { useState ,useContext} from 'react';
import { useEffect } from 'react';
import ContactContext from '../../context/keeper/contactContext';

const ContactForm = () => {

    
    const contactContext = useContext(ContactContext);

    const {addContact,current,clearCurrent,updateContact} = contactContext;
    
    useEffect(() => {
        
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name: '',
                email:'',
                phone: '',
                type: 'personal'
            })
        }

    }, [contactContext,current]);

    const [contact, setContact] = useState({
        name: '',
        email:'',
        phone: '',
        type: 'personal'
    });


   

    const { name,email,phone,type } = contact;

    const onChange = (e) =>{
      setContact({...contact, [e.target.name]:e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(!current){
            addContact(contact);
        }else{
            updateContact(contact);
            clearCurrent();
        }
     
        setContact({
            name: '',
            email:'',
            phone: '',
            type: 'personal'
        })

    }

    const onClear = () => {
       clearCurrent();
    }

    return (
       <form onSubmit={onSubmit} className="shadow-md p-8  hover:shadow-lg">
       <h2 className="text-gray-500 text-lg font-semibold">{current ? "Edit Contact" : "Add Contact"}</h2>

       <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>

       <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>

       <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange}/>
       <h5 className="font-bold text-gray-500">Contact Type</h5>

       <input type="radio" name="type" value="personal" defaultChecked={type === "personal"}/> Personal {' '}

       <input type="radio" name="type" onChange={onChange} value="professional" checked={type === "professional"}/> Professional
        <div>
           
            <input type="submit" value={current ? "Update Contact" : "Add Contact"} className="btn btn-primary btn-block"/>
        </div>
        {current &&  <div>
            <button className="btn btn-block btn-secondary"  onClick={onClear} >Clear</button>
        </div>}
        
       </form>
    )
}

export default ContactForm
