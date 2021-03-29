import React,{useRef,useEffect,useContext} from 'react';
import ContactContext from '../../context/keeper/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts,clearFilter,filtered} = contactContext;


    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
        
    }, [])

    const onChange = (e)=>{
        if (text.current.value !== '') {
            filterContacts(e.target.value);
            console.log(text.current.value);
        }else{
            clearFilter();
        }
    }

    return (
        <div>
        <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
        </div>
    )
}

export default ContactFilter;
