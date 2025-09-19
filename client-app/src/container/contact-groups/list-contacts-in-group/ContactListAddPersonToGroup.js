import React, { useEffect, useState } from 'react';

import ContactsAPI from '../../../api/contact/ContactsAPI';
import Modal from '../../../components/modal/Modal';
import AsyncSelectSet from '../../../components/form/AsyncSelectSet';

function ContactListAddPersonToGroup(props) {
    const [selectedContact, setSelectedContact] = useState({});
    const [searchTermContact, setSearchTermContact] = useState('');
    const [isLoadingContact, setLoadingContact] = useState(false);

    let { inspectionPersonTypeId, groupName, addPersonToGroup, sendEmailNewContactLink, closeModalAddToGroup } = props;

    const getContactOptions = async () => {
        if (searchTermContact.length <= 1) return;

        setLoadingContact(true);

        try {
            const results = await ContactsAPI.fetchContactSearch(searchTermContact, inspectionPersonTypeId);
            setLoadingContact(false);
            return results.data.data;
        } catch (error) {
            setLoadingContact(false);
            // console.log(error);
        }
    };

    function handleInputSearchChange(value) {
        setSearchTermContact(value);
    }

    function handleInputChangeContactId(selectedOption) {
        if (selectedOption) {
            setSelectedContact(selectedOption);
        }
    }

    return (
        <Modal
            buttonConfirmText="Toevoegen"
            closeModal={closeModalAddToGroup}
            confirmAction={() => addPersonToGroup(selectedContact.id)}
            title={`Contact toevoegen aan groep: ${groupName}`}
        >
            {sendEmailNewContactLink ? (
                <div className="alert alert-danger" role="alert">
                    Na toevoegen zal er automatisch een email verzonden worden naar dit contact.
                </div>
            ) : null}
            {inspectionPersonTypeId == 'coach' ? (
                <div className="alert alert-danger" role="alert">
                    Na toevoegen wordt dit contact automatisch "Is coach".
                </div>
            ) : null}
            {inspectionPersonTypeId == 'projectmanager' ? (
                <div className="alert alert-danger" role="alert">
                    Na toevoegen wordt dit contact automatisch "Is projectleider".
                </div>
            ) : null}
            {inspectionPersonTypeId == 'externalparty' ? (
                <div className="alert alert-danger" role="alert">
                    Na toevoegen wordt dit contact automatisch "Is externe partij".
                </div>
            ) : null}
            <form className="form-horizontal">
                <div className="row">
                    <AsyncSelectSet
                        label={'Voeg bestaand contact toe'}
                        divSize={'col-sm-12'}
                        valueSize={'col-sm-8'}
                        name={'personId'}
                        id={'personId'}
                        loadOptions={getContactOptions}
                        optionName={'fullName'}
                        value={selectedContact}
                        onChangeAction={handleInputChangeContactId}
                        required={'required'}
                        // error={errors.personId}
                        isLoading={isLoadingContact}
                        handleInputChange={handleInputSearchChange}
                        multi={false}
                    />
                </div>
            </form>
        </Modal>
    );
}

export default ContactListAddPersonToGroup;
