import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import DocumentTemplateAPI from '../../../../api/document-template/DocumentTemplateAPI';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputReactSelectLong from '../../../../components/form/InputReactSelectLong';

export default function FinancialOverviewCreateInterimModal({ financialOverviewContactId, onClose }) {
    const [showModal, setShowModal] = useState(true);

    const [financialOverviewContact, setFinancialOverviewContact] = useState([]);
    const [documentTemplateFinancialOverviewId, setDocumentTemplateFinancialOverviewId] = useState(null);
    const [emailTemplateFinancialOverviewId, setEmailTemplateFinancialOverviewId] = useState(null);
    const [documentTemplates, setDocumentTemplates] = useState([]);
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [peekLoadingDocumentTemplates, setPeekLoadingDocumentTemplates] = useState(true);
    const [peekLoadingEmailTemplates, setPeekLoadingEmailTemplates] = useState(true);

    useEffect(() => {
        if (financialOverviewContactId) {
            callFetchFinancialOverviewContactDetails();
            callFetchDocumentTemplatesPeekGeneral();
            callFetchEmailTemplatesPeek();
        }
    }, [financialOverviewContactId]);

    function callFetchFinancialOverviewContactDetails() {
        FinancialOverviewContactAPI.fetchFinancialOverviewContactForInterim(financialOverviewContactId)
            .then(payload => {
                setFinancialOverviewContact(payload?.data?.data ?? []);
                setDocumentTemplateFinancialOverviewId(
                    payload?.data?.data?.financialOverview?.documentTemplateFinancialOverviewId ?? null
                );
                setEmailTemplateFinancialOverviewId(
                    payload?.data?.data?.financialOverview?.emailTemplateFinancialOverviewId ?? null
                );
            })
            .catch(error => {
                console.log(error);
                setFinancialOverviewContact([]);
                setDocumentTemplateFinancialOverviewId(null);
                setEmailTemplateFinancialOverviewId(null);
            });
    }
    function callFetchDocumentTemplatesPeekGeneral() {
        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral()
            .then(payload => {
                let documentTemplates = [];
                payload.forEach(function(documentTemplate) {
                    if (documentTemplate.group == 'financial-overview') {
                        documentTemplates.push({ id: documentTemplate.id, name: documentTemplate.name });
                    }
                });
                setDocumentTemplates(documentTemplates);
                setPeekLoadingDocumentTemplates(false);
            })
            .catch(error => {
                console.log(error);
                setPeekLoadingDocumentTemplates(false);
            });
    }
    function callFetchEmailTemplatesPeek() {
        EmailTemplateAPI.fetchEmailTemplatesPeek()
            .then(payload => {
                setEmailTemplates(payload);
                setPeekLoadingEmailTemplates(false);
            })
            .catch(error => {
                console.log(error);
                setPeekLoadingEmailTemplates(false);
            });
    }

    // function previewSendEmail() {
    //     setEmailFinancialOverviewContactsText('Preview e-mail waardestaten');
    //     setOnlyEmailFinancialOverviewContacts(true);
    //
    //     if (financialOverviewContactIds.length > 0) {
    //         previewFinancialOverview(financialOverviewContactIds);
    //         navigate(`/waardestaat/${financialOverview.id}/aanmaken/email`);
    //     } else {
    //         toggleShowCheckboxList();
    //     }
    // }
    //
    // function previewSendPost() {
    //     setPostFinancialOverviewContactsText('Preview post waardestaten');
    //     setOnlyPostFinancialOverviewContacts(true);
    //
    //     if (financialOverviewContactIds.length > 0) {
    //         previewFinancialOverview(financialOverviewContactIds);
    //         navigate(`/waardestaat/${financialOverview.id}/aanmaken/post`);
    //     } else {
    //         toggleShowCheckboxList();
    //     }
    // }
    function preview() {
        console.log('Hier preview?');
    }

    return (
        <>
            {showModal && (
                <Modal
                    modalClassName="modal-lg"
                    buttonConfirmText="Preview tussentijdse waardestaat"
                    closeModal={() => {
                        setShowModal(false);
                        onClose && onClose();
                    }}
                    confirmAction={preview}
                    title="Tussentijdse waardestaat"
                >
                    <div>
                        <div className="row">
                            <div className={'col-sm-12'}>
                                <h4>Tussentijdse waardestaat voor {financialOverviewContact?.contact?.fullNameFnf}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <InputReactSelectLong
                                label={'Document template'}
                                name={'documentTemplateFinancialOverviewId'}
                                options={documentTemplates}
                                value={documentTemplateFinancialOverviewId}
                                onChangeAction={setDocumentTemplateFinancialOverviewId}
                                required={'required'}
                                isLoading={peekLoadingDocumentTemplates}
                                // error={errors.documentTemplateFinancialOverviewId}
                                // errorMessage={errorMessage.documentTemplateFinancialOverviewId}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelectLong
                                label={'E-mail template'}
                                name={'emailTemplateFinancialOverviewId'}
                                options={emailTemplates}
                                value={emailTemplateFinancialOverviewId}
                                onChangeAction={setEmailTemplateFinancialOverviewId}
                                placeholder={'Gebruik administratie e-mail template'}
                                clearable={true}
                                isLoading={peekLoadingEmailTemplates}
                                // error={errors.emailTemplateFinancialOverviewId}
                                // errorMessage={errorMessage.emailTemplateFinancialOverviewId}
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
