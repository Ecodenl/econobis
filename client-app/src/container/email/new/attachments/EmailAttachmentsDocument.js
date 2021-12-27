import React, { useEffect, useState } from 'react';

import Modal from '../../../../components/modal/Modal';
import DocumentsAPI from '../../../../api/document/DocumentsAPI';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';

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
            documentIds.forEach(item => props.addDocumentAsAttachment(item.id));
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
                    <InputMultiSelect
                        label={'Document(en)'}
                        name={'documentIds'}
                        value={documentIds}
                        onChangeAction={handleDocumentIds}
                        options={documents}
                        optionId={'id'}
                        optionName={'filename'}
                        placeholder={''}
                        size={'col-sm-9'}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default EmailAttachmentsDocument;
