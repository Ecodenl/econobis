import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import AuditTrailListApp from './container/audit-trail/list/AuditTrailListApp';
import AdministrationNewApp from './container/administration/new/AdministrationNewApp';
import AdministrationDetailsApp from './container/administration/details/AdministrationDetailsApp';
import AdministrationsListApp from './container/administration/list/AdministrationsListApp';
import CalendarApp from './container/calendar/CalendarApp';
import ConceptsInListApp from './container/email/concept-list/ConceptsInListApp';
import ConceptApp from './container/email/concept/ConceptApp';
import CampaignDetailsApp from './container/campaigns/details/CampaignDetailsApp';
import CampaignNewApp from './container/campaigns/new/CampaignNewApp';
import CampaignsListApp from './container/campaigns/list/CampaignsListApp';
import ContactDetailsApp from './container/contact/details/ContactDetailsApp';
import ContactGroupDetailsApp from './container/contact-groups/details/ContactGroupDetailsApp';
import ContactGroupNewApp from './container/contact-groups/new/ContactGroupNewApp';
import ContactGroupsListApp from './container/contact-groups/list-groups/ContactGroupsListApp';
import ContactNewApp from './container/contact/new/ContactNewApp';
import ContactsInGroupListApp from './container/contact-groups/list-contacts-in-group/ContactsInGroupListApp';
import ContactsListApp from './container/contact/list/ContactsListApp';
import ContactImportApp from './container/contact/import/ContactImportApp';
import DashboardDefaultApp from './container/dashboard/dashboards/default/DashboardDefaultApp';
import DashboardEnergySavingApp from './container/dashboard/dashboards/energy-saving/DashboardEnergySavingApp';
import DashboardFinancialApp from './container/dashboard/dashboards/financial/DashboardFinancialApp';
import DashboardParticipationsApp from './container/dashboard/dashboards/participations/DashboardParticipationsApp';
import DocumentsListApp from './container/document/list/DocumentsListApp';
import DocumentDetailsApp from './container/document/details/DocumentDetailsApp';
import DocumentViewApp from './container/document/view/DocumentViewApp';
import DocumentNewApp from './container/document/new/DocumentNewApp';
import DocumentTemplatesListApp from './container/document-template/list/DocumentTemplatesListApp';
import DocumentTemplateDetailsApp from './container/document-template/details/DocumentTemplateDetailsApp';
import DocumentTemplateNewApp from './container/document-template/new/DocumentTemplateNewApp';
import EmailsInListApp from './container/email/list/EmailsInListApp';
import EmailNewApp from './container/email/new/EmailNewApp';
import EmailDetailsApp from './container/email/details/EmailDetailsApp';
import EmailTemplatesListApp from './container/email-templates/list/EmailTemplatesListApp';
import EmailTemplateDetailsApp from './container/email-templates/details/EmailTemplateDetailsApp';
import EmailTemplateNewApp from './container/email-templates/new/EmailTemplateNewApp';
import EmailAnswerApp from './container/email/answer/EmailAnswerApp';
import EnergySupplierReportNewApp from './container/production-project/details/revenue/energy-supplier-report/EnergySupplierReportNewApp';
import EnergySupplierCSVNewApp from './container/production-project/details/revenue/energy-supplier-csv/EnergySupplierCSVNewApp';
import Forgot from './container/auth/Forgot';
import HousingFileDetailsApp from './container/housing-file/details/HousingFileDetailsApp';
import HousingFileNewApp from './container/housing-file/new/HousingFileNewApp';
import HousingFilesListApp from './container/housing-file/list/HousingFilesListApp';
import QuotationRequestDetailsApp from './container/quotation-request/details/QuotationRequestDetailsApp';
import QuotationRequestNewApp from './container/quotation-request/new/QuotationRequestNewApp';
import QuotationRequestsListApp from './container/quotation-request/list/QuotationRequestsListApp';
import Reset from './container/auth/Reset';
import Login from './container/auth/Login';
import Logout from './container/auth/Logout';
import MailboxDetailsApp from './container/mailbox/details/MailboxDetailsApp';
import MailboxNewApp from './container/mailbox/new/MailboxNewApp';
import MailboxesListApp from './container/mailbox/list/MailboxesListApp';
import Main from './container/global/Main';
import MeasuresListApp from './container/measures/list/MeasuresListApp';
import MeasureDetailsApp from './container/measures/details/MeasureDetailsApp';
import NotFoundedPage from './container/global/NotFoundedPage';
import OpportunitiesListApp from './container/opportunities/list/OpportunitiesListApp';
import OpportunityDetailsApp from './container/opportunities/details/OpportunityDetailsApp';
import OpportunityNewApp from './container/opportunities/new/OpportunityNewApp';
import OrderNewApp from './container/financial/order/new/OrderNewApp';
import OrderDetailsApp from './container/financial/order/details/OrderDetailsApp';
import InvoicePreviewApp from './container/financial/order/preview/InvoicePreviewApp';
import ParticipantNewApp from './container/production-project/general/participant/new/ParticipantNewApp';
import ParticipantListApp from './container/participant/list/ParticipantsListApp';
import ParticipantDetailsApp from './container/production-project/general/participant/details/ParticipantDetailsApp';
import ParticipationTransferApp from './container/production-project/general/participant/details/transfer/ParticipationTransferApp';
import PostalCodeLinkListApp from './container/postal-code-link/list/PostalCodeLinkListApp';
import ProductsListApp from './container/product/list/ProductsListApp';
import ProductNewApp from './container/product/new/ProductNewApp';
import ProductDetailsApp from './container/product/details/ProductDetailsApp';
import ProductionProjectsListApp from './container/production-project/list/ProductionProjectsListApp';
import ProductionProjectDetailsApp from './container/production-project/details/ProductionProjectDetailsApp';
import ProductionProjectGeneralApp from './container/production-project/general/ProductionProjectGeneralApp';
import ProductionProjectNewApp from './container/production-project/new/ProductionProjectNewApp';
import ProductionProjectRevenueNewApp from './container/production-project/details/revenue/new/RevenueNewApp';
import PermissionHelper from './helpers/PermissionHelper';
import IntakeDetailsApp from './container/intake/details/IntakeDetailsApp';
import IntakeNewApp from './container/intake/new/IntakeNewApp';
import IntakesListApp from './container/intake/list/IntakesListApp';
import InvoiceDetailsApp from './container/financial/invoice/details/InvoiceDetailsApp';
import InvoiceViewApp from './container/financial/invoice/view/InvoiceViewApp';
import RequireAuth from './helpers/RequireAuth';
import TaskDetailsApp from './container/task/details/TaskDetailsApp';
import TaskNewApp from './container/task/new/TaskNewApp';
import TasksListApp from './container/task/list-tasks/TasksListApp';
import NotesListApp from './container/task/list-notes/NotesListApp';
import TeamsListApp from './container/team/list/TeamsListApp';
import TeamNewApp from './container/team/new/TeamNewApp';
import TeamDetailsApp from './container/team/details/TeamDetailsApp';
import UserDetailsApp from './container/users/details/UserDetailsApp';
import UserNewApp from './container/users/new/UserNewApp';
import UsersListApp from './container/users/list/UsersListApp';
import RevenueDetailsApp from './container/production-project/details/revenue/details/RevenueDetailsApp';
import FinancialApp from './container/financial/FinancialApp';
import InvoiceSendApp from "./container/financial/invoice/send/InvoiceSendApp";

const Routes = () => {
    return (
        <Router onUpdate={() => window.scrollTo(0, 0)} history={ hashHistory }>
            <Route path="login" component={ Login } />
            <Route path="loguit" component={ Logout } />
            <Route path='wachtwoord-vergeten' component={Forgot}/>
            <Route path='wachtwoord-wijzig/:token' component={Reset}/>
            <Route path="/" component={ RequireAuth(Main) }>
                <IndexRoute component={ DashboardDefaultApp } />

                /* Dashboards */
                <Route path="dashboard" component={DashboardDefaultApp} />
                <Route path="dashboard/energie-besparing" component={PermissionHelper(DashboardEnergySavingApp, 'manageQuotationRequest')} />
                <Route path="dashboard/financieel" component={PermissionHelper(DashboardFinancialApp, 'manageFinancial')} />
                <Route path="dashboard/participaties" component={PermissionHelper(DashboardParticipationsApp, 'manageParticipation')} />

                /* Administrations */
                <Route path="administraties" component={AdministrationsListApp} />
                <Route path="administratie/nieuw" component={AdministrationNewApp} />
                <Route path="administratie/:id" component={AdministrationDetailsApp} />

                /* Audit trail*/
                <Route path="audit-trail" component={ AuditTrailListApp } />

                /* Calender/agenda*/
                <Route path="agenda" component={CalendarApp} />

                /* Contact */
                <Route path="contact-groep/nieuw" component={ContactGroupNewApp} />
                <Route path="contact-groepen" component={ ContactGroupsListApp } />
                <Route path="contact/nieuw/:type" component={ ContactNewApp } />
                <Route path="contact/import" component={ ContactImportApp } />
                <Route path="contact/:id" component={ ContactDetailsApp } />
                <Route path="contacten" component={ ContactsListApp } />
                /* Contacts in group */
                <Route path="contact-groep/:id" component={ContactGroupDetailsApp} />
                <Route path="contacten-in-groep/:contactGroup" component={ ContactsInGroupListApp } />
                /* Campaign */
                <Route path="campagne/nieuw" component={CampaignNewApp} />
                <Route path="campagne/nieuw/maatregel/:measureId" component={CampaignNewApp} />
                <Route path="campagne/:id" component={CampaignDetailsApp} />
                <Route path="campagnes" component={CampaignsListApp} />
                <Route path="contacten/:filter/:value" component={ ContactsListApp } />
                /* Documents */
                <Route path="documenten" component={DocumentsListApp} />
                <Route path="document/nieuw/:type" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/contact/:contactId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/contact-groep/:contactGroupId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/kans/:opportunityId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/intake/:intakeId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/maatregel/:measureId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/campagne/:campaignId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/taak/:taskId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/order/:orderId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/woningdossier/:housingFileId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/offerteverzoek/:quotationRequestId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/productie-project/:productionProjectId" component={DocumentNewApp} />
                <Route path="document/nieuw/:type/productie-project/:productionProjectId/participant/:participantId/contact/:contactId" component={DocumentNewApp} />
                <Route path="document/:id" component={DocumentDetailsApp} />
                <Route path="document/inzien/:id" component={DocumentViewApp} />
                /* Document templates */
                <Route path="document-templates" component={DocumentTemplatesListApp} />
                <Route path="document-template/nieuw" component={DocumentTemplateNewApp} />
                <Route path="document-template/:id" component={DocumentTemplateDetailsApp} />
                /* Emails */
                <Route path="emails/concept" component={ConceptsInListApp} />
                <Route path="email/concept/:id" component={ConceptApp} />
                <Route path="emails/:folder" component={EmailsInListApp} />
                <Route path="emails/:folder/:type" component={EmailsInListApp} />
                <Route path="email/nieuw" component={EmailNewApp} />
                <Route path="email/nieuw/:type" component={EmailNewApp} />
                <Route path="email/nieuw/groep/:groupId/:type" component={EmailNewApp} />
                <Route path="email/nieuw/contact/:contactId" component={EmailNewApp} />
                <Route path="email/nieuw/document/:documentId" component={EmailNewApp} />
                <Route path="email/nieuw/offerteverzoek/:quotationRequestId/:contactId" component={EmailNewApp} />
                <Route path="email/:id" component={EmailDetailsApp} />
                <Route path="email/:id/:type" component={EmailAnswerApp} />
                /* Email templates */
                <Route path="email-templates" component={EmailTemplatesListApp} />
                <Route path="email-template/nieuw" component={EmailTemplateNewApp} />
                <Route path="email-template/:id" component={EmailTemplateDetailsApp} />
                /* Financial */
                <Route path="financieel/:id" component={FinancialApp} />
                <Route path="financieel/:id/:type" component={FinancialApp} />
                <Route path="financieel/:id/:type/:filter" component={FinancialApp} />
                <Route path="financieel/:id/facturen/gecontroleerd/verzenden" component={InvoiceSendApp} />
                <Route path="order/nieuw/contact/:contactId" component={OrderNewApp} />
                <Route path="order/:id" component={OrderDetailsApp} />
                <Route path="order/inzien/:id" component={InvoicePreviewApp} />
                <Route path="factuur/:id" component={InvoiceDetailsApp} />
                <Route path="factuur/inzien/:id" component={InvoiceViewApp} />

                /* Campagnes */
                <Route path="campagne/nieuw" component={CampaignNewApp} />
                <Route path="campagne/:id" component={CampaignDetailsApp} />
                <Route path="campagnes" component={CampaignsListApp} />
                /* Measures */
                <Route path="maatregelen" component={MeasuresListApp} />
                <Route path="maatregel/:id" component={MeasureDetailsApp} />
                /* Mailboxes */
                <Route path="mailbox/nieuw" component={MailboxNewApp} />
                <Route path="mailbox/:id" component={MailboxDetailsApp} />
                <Route path="mailboxen" component={MailboxesListApp} />
                /* Housing File */
                <Route path="woningdossier/nieuw/contact/:contactId/adres/:addressId" component={HousingFileNewApp} />
                <Route path="woningdossier/:id" component={HousingFileDetailsApp} />
                <Route path="woningdossiers" component={ HousingFilesListApp } />
                /* Quotation Request */
                <Route path="offerteverzoek/nieuw/kans/:opportunityId" component={QuotationRequestNewApp} />
                <Route path="offerteverzoek/:id" component={QuotationRequestDetailsApp} />
                <Route path="offerteverzoeken" component={QuotationRequestsListApp} />
                /* Intake */
                <Route path="intake/nieuw/contact/:contactId/adres/:addressId" component={IntakeNewApp} />
                <Route path="intake/:id" component={IntakeDetailsApp} />
                <Route path="intakes" component={ IntakesListApp } />
                /* User */
                <Route path="gebruiker/nieuw" component={UserNewApp} />
                <Route path="gebruiker/:id" component={UserDetailsApp} />
                <Route path="gebruikers" component={UsersListApp} />
                /* Opportunity */
                <Route path="kans/nieuw/intake/:intakeId/maatregel-categorie/:measureCategoryId" component={OpportunityNewApp} />
                <Route path="kans/:id" component={OpportunityDetailsApp} />
                <Route path="kansen" component={OpportunitiesListApp} />
                /* Postal code links */
                <Route path="postcoderoos" component={PostalCodeLinkListApp} />

                /* Product */
                <Route path="producten" component={ProductsListApp} />
                <Route path="product/nieuw" component={ProductNewApp} />
                <Route path="product/:id" component={ProductDetailsApp} />

                /* Production project */
                <Route path="productie-project/nieuw" component={ProductionProjectNewApp} />
                <Route path="productie-project/opbrengst/nieuw/:productionProjectId" component={ProductionProjectRevenueNewApp} />
                <Route path="productie-project/opbrengst/:revenueId/energieleverancier-rapport" component={EnergySupplierReportNewApp} />
                <Route path="productie-project/opbrengst/:revenueId/energieleverancier-csv" component={EnergySupplierCSVNewApp} />
                <Route path="productie-project/details/:id" component={ProductionProjectDetailsApp} />
                <Route path="productie-project/opbrengst/:id" component={RevenueDetailsApp} />
                <Route path="productie-project/:id" component={ProductionProjectGeneralApp} />
                <Route path="productie-projecten" component={ProductionProjectsListApp} />

                <Route path="participanten" component={ParticipantListApp} />
                <Route path="productie-project/participant/:participationId/overdragen" component={ParticipationTransferApp} />
                <Route path="productie-project/participant/nieuw/:productionProjectId" component={ParticipantNewApp} />
                <Route path="productie-project/participant/nieuw/contact/:contactId" component={ParticipantNewApp} />
                <Route path="productie-project/participant/:id" component={ParticipantDetailsApp} />
                /* Task / notes */
                <Route path="taak/nieuw" component={TaskNewApp} />
                <Route path="taak/nieuw/:closed" component={TaskNewApp} />
                <Route path="taak/nieuw/:closed/:type/:id" component={TaskNewApp} />
                <Route path="taak/nieuw/:closed/kans/:opportunityId/contact/:contactId" component={TaskNewApp} />
                <Route path="taak/:id" component={TaskDetailsApp} />
                <Route path="taak/nieuw/:type/:id" component={TaskNewApp} />
                <Route path="taak/nieuw/kans/:opportunityId/contact/:contactId" component={TaskNewApp} />
                <Route path="taak/nieuw/contact/:contactId/productie-project/:productionProjectId/participant/:participantId" component={TaskNewApp} />
                <Route path="taken" component={TasksListApp} />
                <Route path="taken/:type" component={TasksListApp} />
                <Route path="taken/:type" component={TasksListApp} />
                <Route path="notities" component={NotesListApp} />
                /* Teams */
                <Route path="teams" component={TeamsListApp} />
                <Route path="team/nieuw" component={TeamNewApp} />
                <Route path="team/:id" component={TeamDetailsApp} />
                /* 404 route */
                <Route path="*" component={ NotFoundedPage } />
            </Route>
        </Router>
    );
};

export default Routes;
