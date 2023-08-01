import React, { useEffect, useState } from 'react';

import Modal from '../../../components/modal/Modal';
import AsyncSelectSet from '../../../components/form/AsyncSelectSet';
import SharedAreaAPI from '../../../api/shared-area/SharedAreaAPI';

function ContactListAddAreaToExtraFilter(props) {
    const [selectedContactArea, setSelectedContactArea] = useState({});
    const [searchTermContactArea, setSearchTermContactArea] = useState('');
    const [isLoadingContactArea, setLoadingContactArea] = useState(false);

    let { addAreaToFilter, closeModalAddAreaToFilter } = props;

    const getContactAreaOptions = async () => {
        if (searchTermContactArea.length <= 1) return;

        setLoadingContactArea(true);

        try {
            const results = await SharedAreaAPI.fetchContactAreaSearch(searchTermContactArea);
            setLoadingContactArea(false);
            return results.data.data;
        } catch (error) {
            setLoadingContactArea(false);
            // console.log(error);
        }
    };

    function handleInputSearchChange(value) {
        setSearchTermContactArea(value);
    }

    function handleInputChangeContactAreaCode(selectedOption) {
        if (selectedOption) {
            setSelectedContactArea(selectedOption);
        }
    }

    return (
        <Modal
            modalClassName={'modal-search-in-modal'}
            buttonConfirmText="Toevoegen"
            closeModal={closeModalAddAreaToFilter}
            confirmAction={() => addAreaToFilter(selectedContactArea)}
            title={`Buurt toevoegen aan filter`}
        >
            <form className="form-horizontal">
                <div className="row">
                    <AsyncSelectSet
                        label={'Voeg buurt aan filter toe'}
                        divSize={'col-sm-12'}
                        size={'col-sm-8'}
                        name={'id'}
                        id={'id'}
                        loadOptions={getContactAreaOptions}
                        optionName={'areaName'}
                        value={selectedContactArea}
                        onChangeAction={handleInputChangeContactAreaCode}
                        required={'required'}
                        // error={errors.areaCode}
                        isLoading={isLoadingContactArea}
                        handleInputChange={handleInputSearchChange}
                        multi={false}
                    />
                </div>
            </form>
        </Modal>
    );
}

export default ContactListAddAreaToExtraFilter;
