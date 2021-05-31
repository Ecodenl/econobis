import React, { useEffect, useState } from 'react';

import Modal from '../../../../components/modal/Modal';
import DocumentsAPI from '../../../../api/document/DocumentsAPI';
import Select from 'react-select';

function EmailAttachmentsDocument(props) {
    const [documents, setDocuments] = useState([]);
    const [documentIds, setDocumentIds] = useState([]);

    useEffect(() => {
        DocumentsAPI.fetchDocumentsPeek().then(payload => {
            setDocuments(payload);
        });
    }, []);

    function handleDocumentIds(selectedOption) {
        setDocumentIds(selectedOption);
    }

    function addDocuments() {
        if (documentIds) {
            documentIds.split(',').forEach(documentId => props.addDocumentAsAttachment(documentId));
            props.toggleSelectDocument();
        }
    }

    return (
        <Modal
            buttonConfirmText="Toevoegen als bijlage"
            closeModal={props.toggleSelectDocument}
            confirmAction={addDocuments}
            title="Selecteer document(en)"
        >
            <div className="row">
                <div className="col-sm-12">
                    <Select
                        name={'documentIds'}
                        value={documentIds}
                        onChange={handleDocumentIds}
                        options={documents}
                        valueKey={'id'}
                        labelKey={'filename'}
                        placeholder={''}
                        noResultsText={'Geen resultaat gevonden'}
                        multi={true}
                        simpleValue
                        removeSelected
                    />
                </div>
            </div>
        </Modal>
    );
}

export default EmailAttachmentsDocument;
