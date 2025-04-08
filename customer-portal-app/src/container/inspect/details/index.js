import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import LoadingView from '../../../components/general/LoadingView';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestAPI';
import InspectDetailsDocumentTable from './document-table';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import QuotationRequestExternalParty from './action-quotation-request/QuotationRequestExternalParty';
import QuotationRequestCoach from './action-quotation-request/QuotationRequestCoach';
import QuotationRequestOccupant from './action-quotation-request/QuotationRequestOccupant';
import QuotationRequestProjectManager from './action-quotation-request/QuotationRequestProjectManager';
import RedirectionCoach from './action-redirection/RedirectionCoach';
import RedirectionExternalParty from './action-redirection/RedirectionExternalParty';
import RedirectionOccupant from './action-redirection/RedirectionOccupant';
import RedirectionProjectManager from './action-redirection/RedirectionProjectManager';
import SubsidyRequestCoach from './action-subsidy-request/SubsidyRequestCoach';
import SubsidyRequestExternalParty from './action-subsidy-request/SubsidyRequestExternalParty';
import SubsidyRequestOccupant from './action-subsidy-request/SubsidyRequestOccupant';
import SubsidyRequestProjectManager from './action-subsidy-request/SubsidyRequestProjectManager';
import VisitCoach from './action-visit/VisitCoach';
import VisitExternalParty from './action-visit/VisitExternalParty';
import VisitOccupant from './action-visit/VisitOccupant';
import VisitProjectManager from './action-visit/VisitProjectManager';

function InspectDetails({ match, history, user }) {
    const [isLoading, setLoading] = useState(true);
    const [initialQuotationRequest, setInitialQuotationRequest] = useState({});
    const [initialQuotationRequestDocumenten, setInitialQuotationRequestDocumenten] = useState({});
    const [reload, setReload] = useState(false);
    const [reloadDocumenten, setReloadDocumenten] = useState(false);

    const handleSubmit = (values, actions) => {
        QuotationRequestAPI.update({
            id: match.params.id,
            dateRecorded: values.dateRecorded,
            datePlannedAttempt1: values.datePlannedAttempt1,
            datePlannedAttempt2: values.datePlannedAttempt2,
            datePlannedAttempt3: values.datePlannedAttempt3,
            datePlanned: values.datePlanned,
            dateReleased: values.dateReleased,
            dateApprovedClient: values.dateApprovedClient,
            dateApprovedProjectManager: values.dateApprovedProjectManager,
            dateApprovedExternal: values.dateApprovedExternal,
            opportunityStatusId: values.opportunity.status.id,
            opportunityActionId: values.opportunityAction.id,
            coachOrOrganisationNote: values.coachOrOrganisationNote,
            projectmanagerNote: values.projectmanagerNote,
            externalpartyNote: values.externalpartyNote,
            clientNote: values.clientNote,
            quotationAmount: values.quotationAmount ? values.quotationAmount.toString().replace(',', '.') : '',
            statusId: values.status.id,
            dateUnderReview: values.dateUnderReview,
            dateExecuted: values.dateExecuted,
            awardAmount: values.awardAmount ? values.awardAmount.toString().replace(',', '.') : '',
            dateUnderReviewDetermination: values.dateUnderReviewDetermination,
            dateApprovedDetermination: values.dateApprovedDetermination,
            amountDetermination: values.amountDetermination
                ? values.amountDetermination.toString().replace(',', '.')
                : '',
        }).then(response => {
            redirectBack();
        });
    };

    const previewDocument = (event, documentId) => {
        event.preventDefault();
        history.push(`/schouwen/${match.params.id}/document/${documentId}`);
    };

    function redirectBack() {
        if (match.params.campaignId) {
            history.push(`/schouwen/campagne/${match.params.campaignId}`);
        } else {
            history.push('/schouwen');
        }
    }

    useEffect(() => {
        QuotationRequestAPI.fetchById(match.params.id).then(response => {
            setInitialQuotationRequest(response.data);
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
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'externalparty' ? (
                                        <QuotationRequestExternalParty
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                        <QuotationRequestProjectManager
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.isOccupant === true ? (
                                        <QuotationRequestOccupant
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : null}
                                </>
                            ) : initialQuotationRequest.opportunityAction.codeRef === 'subsidy-request' ? (
                                <>
                                    {user.inspectionPersonTypeId === 'coach' ||
                                    (!user.inspectionPersonTypeId && user.isOrganisationContact === true) ? (
                                        <SubsidyRequestCoach
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'externalparty' ? (
                                        <SubsidyRequestExternalParty
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                        <SubsidyRequestProjectManager
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.isOccupant === true ? (
                                        <SubsidyRequestOccupant
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : null}
                                </>
                            ) : initialQuotationRequest.opportunityAction.codeRef === 'visit' ? (
                                <>
                                    {user.inspectionPersonTypeId === 'coach' ||
                                    (!user.inspectionPersonTypeId && user.isOrganisationContact === true) ? (
                                        <VisitCoach
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'externalparty' ? (
                                        <VisitExternalParty
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                        <VisitProjectManager
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.isOccupant === true ? (
                                        <VisitOccupant
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : null}
                                </>
                            ) : initialQuotationRequest.opportunityAction.codeRef === 'redirection' ? (
                                <>
                                    {user.inspectionPersonTypeId === 'coach' ||
                                    (!user.inspectionPersonTypeId && user.isOrganisationContact === true) ? (
                                        <RedirectionCoach
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'externalparty' ? (
                                        <RedirectionExternalParty
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                        <RedirectionProjectManager
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : user.isOccupant === true ? (
                                        <RedirectionOccupant
                                            redirectBack={redirectBack}
                                            initialQuotationRequest={initialQuotationRequest}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : null}
                                </>
                            ) : null}

                            {(initialQuotationRequest.opportunityAction.codeRef === 'visit' &&
                                user.inspectionPersonTypeId !== 'projectmanager' &&
                                user.inspectionPersonTypeId !== 'externalparty') ||
                            (initialQuotationRequest.opportunityAction.codeRef === 'quotation-request' &&
                                user.inspectionPersonTypeId !== 'externalparty') ||
                            (initialQuotationRequest.opportunityAction.codeRef === 'redirection' &&
                                user.inspectionPersonTypeId !== 'projectmanager' &&
                                user.inspectionPersonTypeId !== 'externalparty') ||
                            initialQuotationRequest.opportunityAction.codeRef === 'subsidy-request' ? (
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
