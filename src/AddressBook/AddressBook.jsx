import React from "react";

import ContactDetails from "./ContactDetails";
import SearchContacts from "./SearchContacts";
import { useSelector } from "react-redux";

const AddressBook  = ()=>{
  const phrase = useSelector(state => state.addressBook.search.phrase);
  const matchingContacts = useSelector(state => state.addressBook.search.matchingContacts);
  const hasFailedToSearch = useSelector(state => state.addressBook.search.searchFailure);
  
  const {fetchedContact, fetchFailure}  = useSelector(state => state.addressBook.contacts)

    return (
      <React.Fragment>
        <h1>Address Book</h1>
        <SearchContacts phrase={phrase} matchingContacts={matchingContacts} hasFailedToSearch={hasFailedToSearch} />
        <ContactDetails data={fetchedContact} hasFailedToFetch={fetchFailure}/>
      </React.Fragment>
    );
  }

export default AddressBook;
