import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/modal/Modal';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import DocumentTemplateAPI from '../../../../api/document-template/DocumentTemplateAPI';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputReactSelectLong from '../../../../components/form/InputReactSelectLong';
import ButtonText from '../../../../components/button/ButtonText';
// import { previewFinancialOverview } from '../../../../actions/financial-overview/FinancialOverviewActions';

export default function FinancialOverviewCreateInterimModal({ financialOverviewContactId, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(true);

    const [financialOverviewContact, setFinancialOverviewContact] = useState([]);
    const [documentTemplateFinancialOverviewId, setDocumentTemplateFinancialOverviewId] = useState(null);
    const [emailTemplateFinancialOverviewId, setEmailTemplateFinancialOverviewId] = useState(null);
    const [documentTemplates, setDocumentTemplates] = useState([]);
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [peekLoadingDocumentTemplates, setPeekLoadingDocumentTemplates] = useState(true);
    const [peekLoadingEmailTemplates, setPeekLoadingEmailTemplates] = useState(true);
    const [emailToAllowed, setEmailToAllowed] = useState(false);

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
                const data = payload?.data?.data ?? [];
                console.log(payload?.data?.data ?? []);
                setFinancialOverviewContact(data);
                setDocumentTemplateFinancialOverviewId(
                    data?.documentTemplateFinancialOverviewId ??
                        data?.financialOverview?.documentTemplateFinancialOverviewId ??
                        null
                );
                setEmailTemplateFinancialOverviewId(
                    data?.emailTemplateFinancialOverviewId ??
                        data?.financialOverview?.emailTemplateFinancialOverviewId ??
                        null
                );
                setEmailToAllowed(data?.emailToAllowed ?? false);
            })
            .catch(error => {
                console.log(error);
                setFinancialOverviewContact([]);
                setDocumentTemplateFinancialOverviewId(null);
                setEmailTemplateFinancialOverviewId(null);
                setEmailToAllowed(false);
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

    function saveCreateInterim() {
        if (!financialOverviewContactId || !financialOverviewContact?.financialOverview?.id) return;

        FinancialOverviewContactAPI.updateFinancialOverviewContactForInterim(
            financialOverviewContactId,
            emailTemplateFinancialOverviewId,
            documentTemplateFinancialOverviewId
        )
            .then(() => {
                //
            })
            .catch(error => {
                console.log(error);
                setFinancialOverviewContact([]);
                setDocumentTemplateFinancialOverviewId(null);
                setEmailTemplateFinancialOverviewId(null);
                setEmailToAllowed(false);
            })
            .finally(() => {
                setShowModal(false);
                onClose && onClose();
            });
    }
    function previewEmailCreateInterim() {
        if (!financialOverviewContactId || !financialOverviewContact?.financialOverview?.id) return;

        FinancialOverviewContactAPI.updateFinancialOverviewContactForInterim(
            financialOverviewContactId,
            emailTemplateFinancialOverviewId,
            documentTemplateFinancialOverviewId
        )
            .then(() => {
                navigate(
                    `/waardestaat/${financialOverviewContact.financialOverview.id}/aanmaken/email/${financialOverviewContactId}`
                );
            })
            .catch(error => {
                console.log(error);
                setFinancialOverviewContact([]);
                setDocumentTemplateFinancialOverviewId(null);
                setEmailTemplateFinancialOverviewId(null);
                setEmailToAllowed(false);
            })
            .finally(() => {
                setShowModal(false);
                onClose && onClose();
            });
    }

    function previewPostCreateInterim() {
        if (!financialOverviewContactId || !financialOverviewContact?.financialOverview?.id) return;

        FinancialOverviewContactAPI.updateFinancialOverviewContactForInterim(
            financialOverviewContactId,
            emailTemplateFinancialOverviewId,
            documentTemplateFinancialOverviewId
        )
            .then(() => {
                navigate(
                    `/waardestaat/${financialOverviewContact.financialOverview.id}/aanmaken/post/${financialOverviewContactId}`
                );
            })
            .catch(error => {
                console.log(error);
                setFinancialOverviewContact([]);
                setDocumentTemplateFinancialOverviewId(null);
                setEmailTemplateFinancialOverviewId(null);
                setEmailToAllowed(false);
            })
            .finally(() => {
                setShowModal(false);
                onClose && onClose();
            });

        setShowModal(false);
        onClose && onClose();
    }

    return (
        <>
            {showModal && (
                <Modal
                    modalClassName="modal-lg"
                    confirmAction={saveCreateInterim}
                    closeModal={() => {
                        setShowModal(false);
                        onClose && onClose();
                    }}
                    title="Tussentijdse waardestaat"
                >
                    <div>
                        <div className="row">
                            <div className={'col-sm-12'}>
                                <h4>Tussentijdse waardestaat voor {financialOverviewContact?.contactFullNameFnf}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
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
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
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
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right" role="group">
                                    {emailToAllowed ? (
                                        <ButtonText
                                            buttonText={'Preview e-mail tussentijdse waardestaat'}
                                            onClickAction={previewEmailCreateInterim}
                                        />
                                    ) : null}
                                    <ButtonText
                                        buttonText={'Preview post tussentijdse waardestaat'}
                                        onClickAction={previewPostCreateInterim}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
