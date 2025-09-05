import React, { useContext, useEffect, useState } from 'react';
import fileDownload from 'js-file-download';
import QuotationRequestAPI from '../../api/quotation-request/QuotationRequestAPI';
import GroupAPI from '../../api/group/GroupAPI';
import { PortalUserContext } from '../../context/PortalUserContext';

function AddContactToGroup({ match, history }) {
    const [initialDocument, setInitialDocument] = useState({});
    const { currentSelectedContact } = useContext(PortalUserContext);

    useEffect(
        function() {
            if (currentSelectedContact.id) {
                GroupAPI.addContactToGroup(match.params.id, currentSelectedContact.id).then(payload => {
                    history.push('/dashboard');
                });
            }
        },
        [currentSelectedContact.id]
    );

    return true;
}

export default AddContactToGroup;
