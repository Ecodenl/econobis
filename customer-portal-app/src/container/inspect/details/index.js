import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import LoadingView from '../../../components/general/LoadingView';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestAPI';
import InspectDetailsDocumentTable from './document-table';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import VisitCoach from './action-visit/VisitCoach';
import VisitProjectManager from './action-visit/VisitProjectManager';
import VisitExternalParty from './action-visit/VisitExternalParty';
import SubsidyRequestExternalParty from './action-subsidy-request/SubsidyRequestExternalParty';
import SubsidyRequestProjectManager from './action-subsidy-request/SubsidyRequestProjectManager';
import QuotationRequestExternalParty from './action-quotation-request/QuotationRequestExternalParty';
import QuotationRequestCoach from './action-quotation-request/QuotationRequestCoach';

function InspectDetails({ match, history, user }) {
    const [isLoading, setLoading] = useState(true);
    const [initialQuotationRequest, setInitialQuotationRequest] = useState({});
    const [initialQuotationRequestDocumenten, setInitialQuotationRequestDocumenten] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [reload, setReload] = useState(false);
    const [reloadDocumenten, setReloadDocumenten] = useState(false);

    const handleSubmit = (values, actions) => {
        QuotationRequestAPI.update({
            id: match.params.id,
            dateRecorded: values.dateRecorded,
            datePlanned: values.datePlanned,
            dateReleased: values.dateReleased,
            dateApprovedProjectManager: values.dateApprovedProjectManager,
            dateApprovedExternal: values.dateApprovedExternal,
            opportunityStatusId: values.opportunity.status.id,
            opportunityActionId: values.opportunityAction.id,
            coachOrOrganisationNote: values.coachOrOrganisationNote,
            externalpartyNote: values.externalpartyNote,
            // quotationText: values.quotationText,
            quotationAmount: values.quotationAmount ? values.quotationAmount.toString().replace(',', '.') : '',
            statusId: values.status.id,
            dateUnderReview: values.dateUnderReview,
            dateExecuted: values.dateExecuted,
        }).then(response => {
            history.push('/schouwen');
        });
    };

    const previewDocument = (event, documentId) => {
        event.preventDefault();
        history.push(`/schouwen/${match.params.id}/document/${documentId}`);
    };

    useEffect(() => {
        QuotationRequestAPI.fetchById(match.params.id).then(response => {
            setInitialQuotationRequest(response.data);
            QuotationRequestAPI.fetchQuotationRequestStatus(response.data.opportunityAction.id).then(payload => {
                setStatuses(payload.data.data);
            });
            setLoading(false);
            setReload(false);
        });
    }, [reload == true]);

    useEffect(() => {
        QuotationRequestAPI.fetchDocumentenById(match.params.id).then(response => {
            setInitialQuotationRequestDocumenten(response.data);
            setLoading(false);
            setReloadDocumenten(false);
        });
    }, [reloadDocumenten == true]);

    const getStatusOptions = () => {
        return statuses.map(status => {
            return {
                id: status.id,
                name: initialQuotationRequest?.opportunityAction.name + ' - ' + status.name,
            };
        });
    };

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    {initialQuotationRequest.opportunityAction ? (
                        <>
                            {initialQuotationRequest.opportunityAction.codeRef === 'quotation-request' ? (
                                <>
                                    {user.inspectionPersonTypeId === 'coach' ||
                                    (!user.inspectionPersonTypeId && user.isOrganisationContact === true) ? (
                                        <QuotationRequestCoach
                                            history={history}
                                            initialQuotationRequest={initialQuotationRequest}
                                            isOrganisationContact={user.isOrganisationContact}
                                            handleSubmit={handleSubmit}
                                            getStatusOptions={getStatusOptions}
                                        />
                                    ) : user.inspectionPersonTypeId === 'externalparty' ? (
                                        <QuotationRequestExternalParty
                                            history={history}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                            getStatusOptions={getStatusOptions}
                                        />
                                    ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                        <p>Voor projectleider verwachten we geen offerteverzoek</p>
                                    ) : null}
                                </>
                            ) : initialQuotationRequest.opportunityAction.codeRef === 'subsidy-request' ? (
                                <>
                                    {user.inspectionPersonTypeId === 'coach' ||
                                    (!user.inspectionPersonTypeId && user.isOrganisationContact === true) ? (
                                        <p>Voor coach of organisatie verwachten we geen budgetaanvraag</p>
                                    ) : user.inspectionPersonTypeId === 'externalparty' ? (
                                        <SubsidyRequestExternalParty
                                            history={history}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                            getStatusOptions={getStatusOptions}
                                        />
                                    ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                        <SubsidyRequestProjectManager
                                            history={history}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                            getStatusOptions={getStatusOptions}
                                        />
                                    ) : null}
                                </>
                            ) : initialQuotationRequest.opportunityAction.codeRef === 'visit' ? (
                                <>
                                    {user.inspectionPersonTypeId === 'coach' ||
                                    (!user.inspectionPersonTypeId && user.isOrganisationContact === true) ? (
                                        <VisitCoach
                                            history={history}
                                            initialQuotationRequest={initialQuotationRequest}
                                            isOrganisationContact={user.isOrganisationContact}
                                            handleSubmit={handleSubmit}
                                            getStatusOptions={getStatusOptions}
                                        />
                                    ) : user.inspectionPersonTypeId === 'externalparty' ? (
                                        <VisitExternalParty
                                            history={history}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                            getStatusOptions={getStatusOptions}
                                        />
                                    ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                        <VisitProjectManager
                                            history={history}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                            getStatusOptions={getStatusOptions}
                                        />
                                    ) : null}
                                </>
                            ) : null}

                            {initialQuotationRequest.opportunityAction.codeRef === 'visit' ||
                            (initialQuotationRequest.opportunityAction.codeRef === 'quotation-request' &&
                                user.inspectionPersonTypeId !== 'projectmanager') ||
                            (initialQuotationRequest.opportunityAction.codeRef === 'subsidy-request' &&
                                user.inspectionPersonTypeId !== 'coach') ? (
                                <InspectDetailsDocumentTable
                                    quotationRequestId={match.params.id}
                                    documents={initialQuotationRequestDocumenten.documents}
                                    previewDocument={previewDocument}
                                    setReloadDocumenten={setReloadDocumenten}
                                />
                            ) : null}
                        </>
                    ) : null}
                </>
            )}
        </Container>
    );
}

export default function InspectDetailsWithContext(props) {
    return <PortalUserConsumer>{({ user }) => <InspectDetails {...props} user={user} />}</PortalUserConsumer>;
}
