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
                GroupAPI.addContactToGroup(match.params.id, currentSelectedContact.id)
                    .then(payload => {
                        history.push('/dashboard');
                    });
            }
        },
        [currentSelectedContact.id]
    );

    function downloadFile(e) {
        e.preventDefault();

        QuotationRequestAPI.quotationRequestDownloadDocument(match.params.quotationRequestId, match.params.id)
            .then(payload => {
                fileDownload(payload.data, initialDocument.filename);
            })
            .catch(() => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
            });
    }

    return true;
}

export default AddContactToGroup;
