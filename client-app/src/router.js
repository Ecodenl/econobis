import React, { Suspense } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import PermissionHelper from './helpers/PermissionHelper';
import RequireAuth from './helpers/RequireAuth';

const AuditTrailListApp = React.lazy(() => import('./container/audit-trail/list/AuditTrailListApp'));
const AdministrationNewApp = React.lazy(() => import('./container/administration/new/AdministrationNewApp'));
const AdministrationDetailsApp = React.lazy(() =>
    import('./container/administration/details/AdministrationDetailsApp')
);
const AdministrationsListApp = React.lazy(() => import('./container/administration/list/AdministrationsListApp'));
const CalendarApp = React.lazy(() => import('./container/calendar/CalendarApp'));
const ConceptsInListApp = React.lazy(() => import('./container/email/concept-list/ConceptsInListApp'));
const ConceptApp = React.lazy(() => import('./container/email/concept/ConceptApp'));
const CampaignDetailsApp = React.lazy(() => import('./container/campaigns/details/CampaignDetailsApp'));
const CampaignNewApp = React.lazy(() => import('./container/campaigns/new/CampaignNewApp'));
const CampaignsListApp = React.lazy(() => import('./container/campaigns/list/CampaignsListApp'));
const ContactDetailsApp = React.lazy(() => import('./container/contact/details/ContactDetailsApp'));
const ContactGroupDetailsApp = React.lazy(() => import('./container/contact-groups/details/ContactGroupDetailsApp'));
const ContactGroupNewApp = React.lazy(() => import('./container/contact-groups/new/ContactGroupNewApp'));
const ContactGroupsListApp = React.lazy(() => import('./container/contact-groups/list-groups/ContactGroupsListApp'));
const ContactNewApp = React.lazy(() => import('./container/contact/new/ContactNewApp'));
const ContactsInGroupListApp = React.lazy(() =>
    import('./container/contact-groups/list-contacts-in-group/ContactsInGroupListApp')
);
const ContactsListApp = React.lazy(() => import('./container/contact/list/ContactsListApp'));
const ContactImportApp = React.lazy(() => import('./container/contact/import/ContactImportApp'));
const DashboardDefaultApp = React.lazy(() => import('./container/dashboard/dashboards/default/DashboardDefaultApp'));
const DashboardEnergySavingApp = React.lazy(() =>
    import('./container/dashboard/dashboards/energy-saving/DashboardEnergySavingApp')
);
const DashboardFinancialApp = React.lazy(() =>
    import('./container/dashboard/dashboards/financial/DashboardFinancialApp')
);
const DashboardParticipationsApp = React.lazy(() =>
    import('./container/dashboard/dashboards/participations/DashboardParticipationsApp')
);
const DocumentsListApp = React.lazy(() => import('./container/document/list/DocumentsListApp'));
const DocumentDetailsApp = React.lazy(() => import('./container/document/details/DocumentDetailsApp'));
const DocumentViewApp = React.lazy(() => import('./container/document/view/DocumentViewApp'));
const DocumentNewApp = React.lazy(() => import('./container/document/new/DocumentNewApp'));
const DocumentTemplatesListApp = React.lazy(() =>
    import('./container/document-template/list/DocumentTemplatesListApp')
);
const DocumentTemplateDetailsApp = React.lazy(() =>
    import('./container/document-template/details/DocumentTemplateDetailsApp')
);
const DocumentTemplateNewApp = React.lazy(() => import('./container/document-template/new/DocumentTemplateNewApp'));
const EmailsInListApp = React.lazy(() => import('./container/email/list/EmailsInListApp'));
const EmailNewApp = React.lazy(() => import('./container/email/new/EmailNewApp'));
const EmailDetailsApp = React.lazy(() => import('./container/email/details/EmailDetailsApp'));
const EmailTemplatesListApp = React.lazy(() => import('./container/email-templates/list/EmailTemplatesListApp'));
const EmailTemplateDetailsApp = React.lazy(() => import('./container/email-templates/details/EmailTemplateDetailsApp'));
const EmailTemplateNewApp = React.lazy(() => import('./container/email-templates/new/EmailTemplateNewApp'));
const EmailAnswerApp = React.lazy(() => import('./container/email/answer/EmailAnswerApp'));
const EnergySupplierReportNewApp = React.lazy(() =>
    import('./container/project/details/revenue/energy-supplier-report/EnergySupplierReportNewApp')
);
const EnergySupplierExcelNewApp = React.lazy(() =>
    import('./container/project/details/revenue/energy-supplier-excel/EnergySupplierExcelNewApp')
);
const Forgot = React.lazy(() => import('./container/auth/Forgot'));
const HousingFileDetailsApp = React.lazy(() => import('./container/housing-file/details/HousingFileDetailsApp'));
const HousingFileNewApp = React.lazy(() => import('./container/housing-file/new/HousingFileNewApp'));
const HousingFilesListApp = React.lazy(() => import('./container/housing-file/list/HousingFilesListApp'));
const QuotationRequestDetailsApp = React.lazy(() =>
    import('./container/quotation-request/details/QuotationRequestDetailsApp')
);
const QuotationRequestNewApp = React.lazy(() => import('./container/quotation-request/new/QuotationRequestNewApp'));
const QuotationRequestsListApp = React.lazy(() =>
    import('./container/quotation-request/list/QuotationRequestsListApp')
);
const Reset = React.lazy(() => import('./container/auth/Reset'));
const Login = React.lazy(() => import('./container/auth/Login'));
const Logout = React.lazy(() => import('./container/auth/Logout'));
const MailboxDetailsApp = React.lazy(() => import('./container/mailbox/details/MailboxDetailsApp'));
const MailboxNewApp = React.lazy(() => import('./container/mailbox/new/MailboxNewApp'));
const MailboxesListApp = React.lazy(() => import('./container/mailbox/list/MailboxesListApp'));
const MailgunDomainsListApp = React.lazy(() => import('./container/mailgun-domain/list/MailgunDomainsListApp'));
const MailgunDomainNewApp = React.lazy(() => import('./container/mailgun-domain/new/MailgunDomainNewApp'));
const MailgunDomainDetailsApp = React.lazy(() => import('./container/mailgun-domain/details/MailgunDomainDetailsApp'));
import Main from './container/global/Main';
import LoadingPage from './container/global/LoadingPage';
const MeasuresListApp = React.lazy(() => import('./container/measures/list/MeasuresListApp'));
const MeasureDetailsApp = React.lazy(() => import('./container/measures/details/MeasureDetailsApp'));
const NotFoundedPage = React.lazy(() => import('./container/global/NotFoundedPage'));
const OpportunitiesListApp = React.lazy(() => import('./container/opportunities/list/OpportunitiesListApp'));
const OpportunityDetailsApp = React.lazy(() => import('./container/opportunities/details/OpportunityDetailsApp'));
const OpportunityNewApp = React.lazy(() => import('./container/opportunities/new/OpportunityNewApp'));
const OrderNewApp = React.lazy(() => import('./container/financial/order/new/OrderNewApp'));
const OrderDetailsApp = React.lazy(() => import('./container/financial/order/details/OrderDetailsApp'));
const InvoicePreviewApp = React.lazy(() => import('./container/financial/order/preview/InvoicePreviewApp'));
const ParticipantNewApp = React.lazy(() => import('./container/participant-project/new/ParticipantNewApp'));
const ParticipantListApp = React.lazy(() => import('./container/participant/list/ParticipantsListApp'));
const ParticipantDetailsApp = React.lazy(() => import('./container/participant-project/details/ParticipantDetailsApp'));
const ParticipationTransferApp = React.lazy(() =>
    import('./container/participant-project/details/transfer/ParticipationTransferApp')
);
const PostalCodeLinkListApp = React.lazy(() => import('./container/postal-code-link/list/PostalCodeLinkListApp'));
const ProductsListApp = React.lazy(() => import('./container/product/list/ProductsListApp'));
const ProductNewApp = React.lazy(() => import('./container/product/new/ProductNewApp'));
const ProductDetailsApp = React.lazy(() => import('./container/product/details/ProductDetailsApp'));
const ProjectsListApp = React.lazy(() => import('./container/project/list/ProjectsListApp'));
const ProjectDetailsApp = React.lazy(() => import('./container/project/details/ProjectDetailsApp'));
const ProjectGeneralApp = React.lazy(() => import('./container/project/general/ProjectGeneralApp'));
const ProjectNewApp = React.lazy(() => import('./container/project/new/ProjectNewApp'));
const ProjectRevenueNewApp = React.lazy(() => import('./container/project/details/revenue/new/RevenueNewApp'));
const IntakeDetailsApp = React.lazy(() => import('./container/intake/details/IntakeDetailsApp'));
const IntakeNewApp = React.lazy(() => import('./container/intake/new/IntakeNewApp'));
const IntakesListApp = React.lazy(() => import('./container/intake/list/IntakesListApp'));
const InvoiceDetailsApp = React.lazy(() => import('./container/financial/invoice/details/InvoiceDetailsApp'));
const InvoiceViewApp = React.lazy(() => import('./container/financial/invoice/view/InvoiceViewApp'));
const TaskDetailsApp = React.lazy(() => import('./container/task/details/TaskDetailsApp'));
const TaskNewApp = React.lazy(() => import('./container/task/new/TaskNewApp'));
const TasksListApp = React.lazy(() => import('./container/task/list-tasks/TasksListApp'));
const NotesListApp = React.lazy(() => import('./container/task/list-notes/NotesListApp'));
const TeamsListApp = React.lazy(() => import('./container/team/list/TeamsListApp'));
const TeamNewApp = React.lazy(() => import('./container/team/new/TeamNewApp'));
const TeamDetailsApp = React.lazy(() => import('./container/team/details/TeamDetailsApp'));
const UserDetailsApp = React.lazy(() => import('./container/users/details/UserDetailsApp'));
const UserNewApp = React.lazy(() => import('./container/users/new/UserNewApp'));
const UsersListApp = React.lazy(() => import('./container/users/list/UsersListApp'));
const RevenueDetailsApp = React.lazy(() => import('./container/project/details/revenue/details/RevenueDetailsApp'));
const FinancialApp = React.lazy(() => import('./container/financial/FinancialApp'));
const InvoiceSendApp = React.lazy(() => import('./container/financial/invoice/send/InvoiceSendApp'));
const OrderCreateApp = React.lazy(() => import('./container/financial/order/create/OrderCreateApp'));
const PaymentInvoiceCreateApp = React.lazy(() =>
    import('./container/project/details/revenue/details/create/PaymentInvoiceCreateApp')
);
const ParticipantReportCreateApp = React.lazy(() =>
    import('./container/participant-project/create/ParticipantReportCreateApp')
);
const WebformsListApp = React.lazy(() => import('./container/webform/list/WebformsListApp'));
const WebformNewApp = React.lazy(() => import('./container/webform/new/WebformNewApp'));
const WebformDetailsApp = React.lazy(() => import('./container/webform/details/WebformDetailsApp'));
const VatCodesListApp = React.lazy(() => import('./container/vat-code/list/VatCodesListApp'));
const VatCodeNewApp = React.lazy(() => import('./container/vat-code/new/VatCodeNewApp'));
const VatCodeDetailsApp = React.lazy(() => import('./container/vat-code/details/VatCodeDetailsApp'));
const LedgersListApp = React.lazy(() => import('./container/ledger/list/LedgersListApp'));
const LedgerNewApp = React.lazy(() => import('./container/ledger/new/LedgerNewApp'));
const LedgerDetailsApp = React.lazy(() => import('./container/ledger/details/LedgerDetailsApp'));
const CostCentersListApp = React.lazy(() => import('./container/cost-center/list/CostCentersListApp'));
const CostCenterNewApp = React.lazy(() => import('./container/cost-center/new/CostCenterNewApp'));
const CostCenterDetailsApp = React.lazy(() => import('./container/cost-center/details/CostCenterDetailsApp'));
const PortalSettingsApp = React.lazy(() => import('./container/portal-settings/PortalSettingsApp'));
const TaskTypesListApp = React.lazy(() => import('./container/task-type/list/TaskTypesListApp'));
const TaskTypeDetailsApp = React.lazy(() => import('./container/task-type/details/TaskTypeDetailsApp'));
const QuotationRequestStatusListApp = React.lazy(() =>
    import('./container/quotation-request-status/list/QuotationRequestStatusListApp')
);
const QuotationRequestStatusDetailsApp = React.lazy(() =>
    import('./container/quotation-request-status/details/QuotationRequestStatusDetailsApp')
);
const OpportunityStatusListApp = React.lazy(() =>
    import('./container/opportunity-status/list/OpportunityStatusListApp')
);
const OpportunityStatusDetailsApp = React.lazy(() =>
    import('./container/opportunity-status/details/OpportunityStatusDetailsApp')
);
const ProcessesListApp = React.lazy(() => import('./container/processes/list'));

const Routes = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
                <Route path="login" component={Login} />
                <Route path="loguit" component={Logout} />
                <Route path="wachtwoord-vergeten" component={Forgot} />
                <Route path="wachtwoord-wijzig/:token/:email" component={Reset} />
                <Route path="/" component={RequireAuth(Main)}>
                    <IndexRoute component={DashboardDefaultApp} />
                    /* Dashboards */
                    <Route path="dashboard" component={DashboardDefaultApp} />
                    <Route
                        path="dashboard/energie-besparing"
                        component={PermissionHelper(DashboardEnergySavingApp, 'manageQuotationRequest')}
                    />
                    <Route
                        path="dashboard/financieel"
                        component={PermissionHelper(DashboardFinancialApp, 'manageFinancial')}
                    />
                    <Route
                        path="dashboard/deelnames"
                        component={PermissionHelper(DashboardParticipationsApp, 'manageParticipation')}
                    />
                    /* Administrations */
                    <Route path="administraties" component={AdministrationsListApp} />
                    <Route path="administratie/nieuw" component={AdministrationNewApp} />
                    <Route path="administratie/:id" component={AdministrationDetailsApp} />
                    /* Audit trail*/
                    <Route path="audit-trail" component={AuditTrailListApp} />
                    /* Calender/agenda*/
                    <Route path="agenda" component={CalendarApp} />
                    /* Contact */
                    <Route path="contact-groep/nieuw" component={ContactGroupNewApp} />
                    <Route path="contact-groepen" component={ContactGroupsListApp} />
                    <Route path="contact/nieuw/:type" component={ContactNewApp} />
                    <Route path="contact/import" component={ContactImportApp} />
                    <Route path="contact/:id" component={ContactDetailsApp} />
                    <Route path="contacten" component={ContactsListApp} />
                    /* Contacts in group */
                    <Route path="contact-groep/:id/:mode" component={ContactGroupDetailsApp} />
                    <Route path="contact-groep/:id" component={ContactGroupDetailsApp} />
                    <Route path="contacten-in-groep/:contactGroup" component={ContactsInGroupListApp} />
                    /* Campaign */
                    <Route path="campagne/nieuw" component={CampaignNewApp} />
                    <Route path="campagne/nieuw/maatregel/:measureId" component={CampaignNewApp} />
                    <Route path="campagne/:id" component={CampaignDetailsApp} />
                    <Route path="campagnes" component={CampaignsListApp} />
                    <Route path="contacten/:filter/:value" component={ContactsListApp} />
                    /* Documents */
                    <Route path="documenten" component={DocumentsListApp} />
                    <Route path="document/nieuw/:type/email-bijlage/:emailAttachmentId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/contact/:contactId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/contact-groep/:contactGroupId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/kans/:opportunityId" component={DocumentNewApp} />
                    <Route
                        path="document/nieuw/:type/kans/:opportunityId/intake/:intakeId/contact/:contactId"
                        component={DocumentNewApp}
                    />
                    <Route path="document/nieuw/:type/intake/:intakeId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/intake/:intakeId/contact/:contactId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/maatregel/:measureId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/campagne/:campaignId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/taak/:taskId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/order/:orderId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/woningdossier/:housingFileId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/offerteverzoek/:quotationRequestId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/project/:projectId" component={DocumentNewApp} />
                    <Route
                        path="document/nieuw/:type/project/:projectId/deelnemer/:participantId/contact/:contactId"
                        component={DocumentNewApp}
                    />
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
                    <Route path="email/nieuw/groep/:contactGroupId/:type" component={EmailNewApp} />
                    <Route path="email/nieuw/contact/:contactId" component={EmailNewApp} />
                    <Route path="email/nieuw/document/:documentId" component={EmailNewApp} />
                    <Route path="email/nieuw/offerteverzoek/:quotationRequestId/:contactId" component={EmailNewApp} />
                    <Route path="email/nieuw/intake/:intakeId/contact/:contactId" component={EmailNewApp} />
                    <Route path="email/:id" component={EmailDetailsApp} />
                    <Route path="email/:id/:type" component={EmailAnswerApp} />
                    /* Email templates */
                    <Route path="email-templates" component={EmailTemplatesListApp} />
                    <Route path="email-template/nieuw" component={EmailTemplateNewApp} />
                    <Route path="email-template/:id" component={EmailTemplateDetailsApp} />
                    /* Financial */
                    <Route path="financieel/:id" component={FinancialApp} />
                    <Route path="financieel/:id/:type" component={FinancialApp} />
                    <Route path="financieel/:id/orders/aanmaken" component={OrderCreateApp} />
                    <Route path="financieel/:id/:type/:filter" component={FinancialApp} />
                    <Route
                        path="financieel/:id/notas/te-verzenden/verzenden/:type/:paymentType"
                        component={InvoiceSendApp}
                    />
                    <Route
                        path="financieel/:id/notas/te-verzenden/verzenden/:type/:paymentType"
                        component={InvoiceSendApp}
                    />
                    <Route path="order/nieuw/contact/:contactId" component={OrderNewApp} />
                    <Route path="order/:id" component={OrderDetailsApp} />
                    <Route path="order/inzien/:id" component={InvoicePreviewApp} />
                    <Route path="nota/:id" component={InvoiceDetailsApp} />
                    <Route path="nota/inzien/:id" component={InvoiceViewApp} />
                    /* Campagnes */
                    <Route path="campagne/nieuw" component={CampaignNewApp} />
                    <Route path="campagne/:id" component={CampaignDetailsApp} />
                    <Route path="campagnes" component={CampaignsListApp} />
                    /* Ledgers */
                    <Route path="grootboekrekeningen" component={LedgersListApp} />
                    <Route path="grootboekrekening/nieuw" component={LedgerNewApp} />
                    <Route path="grootboekrekening/:id" component={LedgerDetailsApp} />
                    /* Costcenters */
                    <Route path="kostenplaatsen" component={CostCentersListApp} />
                    <Route path="kostenplaats/nieuw" component={CostCenterNewApp} />
                    <Route path="kostenplaats/:id" component={CostCenterDetailsApp} />
                    /* Measures */
                    <Route path="maatregelen" component={MeasuresListApp} />
                    <Route path="maatregel/:id" component={MeasureDetailsApp} />
                    /* Mailboxes */
                    <Route path="mailbox/nieuw" component={MailboxNewApp} />
                    <Route path="mailbox/:id" component={MailboxDetailsApp} />
                    <Route path="mailboxen" component={MailboxesListApp} />
                    /* Housing File */
                    <Route
                        path="woningdossier/nieuw/contact/:contactId/adres/:addressId"
                        component={HousingFileNewApp}
                    />
                    <Route path="woningdossier/:id" component={HousingFileDetailsApp} />
                    <Route path="woningdossiers" component={HousingFilesListApp} />
                    /* Quotation Request */
                    <Route path="offerteverzoek/nieuw/kans/:opportunityId" component={QuotationRequestNewApp} />
                    <Route path="offerteverzoek/:id" component={QuotationRequestDetailsApp} />
                    <Route path="offerteverzoeken" component={QuotationRequestsListApp} />
                    /* Intake */
                    <Route path="intake/nieuw/contact/:contactId/adres/:addressId" component={IntakeNewApp} />
                    <Route path="intake/:id" component={IntakeDetailsApp} />
                    <Route path="intakes" component={IntakesListApp} />
                    /* User */
                    <Route path="gebruiker/nieuw" component={UserNewApp} />
                    <Route path="gebruiker/:id" component={UserDetailsApp} />
                    <Route path="gebruikers" component={UsersListApp} />
                    /* Opportunity */
                    <Route
                        path="kans/nieuw/intake/:intakeId/maatregel-categorie/:measureCategoryId"
                        component={OpportunityNewApp}
                    />
                    <Route path="kans/:id" component={OpportunityDetailsApp} />
                    <Route path="kansen" component={OpportunitiesListApp} />
                    /* Postal code links */
                    <Route path="postcoderoos" component={PostalCodeLinkListApp} />
                    /* Product */
                    <Route path="producten" component={ProductsListApp} />
                    <Route path="product/nieuw" component={ProductNewApp} />
                    <Route path="product/:id" component={ProductDetailsApp} />
                    /* Project */
                    <Route path="project/nieuw" component={ProjectNewApp} />
                    <Route path="project/opbrengst/nieuw/:projectId/:categoryId" component={ProjectRevenueNewApp} />
                    <Route
                        path="project/opbrengst/:revenueId/energieleverancier-rapport"
                        component={EnergySupplierReportNewApp}
                    />
                    <Route
                        path="project/opbrengst/:revenueId/energieleverancier-excel"
                        component={EnergySupplierExcelNewApp}
                    />
                    <Route path="project/details/:id" component={ProjectDetailsApp} />
                    <Route path="project/opbrengst/:id" component={RevenueDetailsApp} />
                    <Route path="project/opbrengst/:id/rapportage" component={PaymentInvoiceCreateApp} />
                    <Route path="project/preview-rapportage" component={ParticipantReportCreateApp} />
                    <Route path="project/:id" component={ProjectGeneralApp} />
                    <Route path="projecten" component={ProjectsListApp} />
                    <Route path="deelnemers" component={ParticipantListApp} />
                    <Route path="project/deelnemer/:participationId/overdragen" component={ParticipationTransferApp} />
                    <Route path="project/deelnemer/nieuw/:projectId" component={ParticipantNewApp} />
                    <Route path="project/deelnemer/nieuw/contact/:contactId" component={ParticipantNewApp} />
                    <Route path="project/deelnemer/:id" component={ParticipantDetailsApp} />
                    /* Processes */
                    <route path="processen" component={ProcessesListApp} />
                    /* Task / notes */
                    <Route path="taak/nieuw" component={TaskNewApp} />
                    <Route path="taak/nieuw/:closed" component={TaskNewApp} />
                    <Route path="taak/nieuw/:closed/:type/:id" component={TaskNewApp} />
                    <Route path="taak/nieuw/:closed/kans/:opportunityId/contact/:contactId" component={TaskNewApp} />
                    <Route path="taak/:id" component={TaskDetailsApp} />
                    <Route path="taak/nieuw/:type/:id" component={TaskNewApp} />
                    <Route path="taak/nieuw/kans/:opportunityId/contact/:contactId" component={TaskNewApp} />
                    <Route
                        path="taak/nieuw/contact/:contactId/project/:projectId/deelnemer/:participantId"
                        component={TaskNewApp}
                    />
                    <Route path="taken" component={TasksListApp} />
                    <Route path="taken/:type" component={TasksListApp} />
                    <Route path="taken/:type" component={TasksListApp} />
                    <Route path="notities" component={NotesListApp} />
                    /* Teams */
                    <Route path="teams" component={TeamsListApp} />
                    <Route path="team/nieuw" component={TeamNewApp} />
                    <Route path="team/:id" component={TeamDetailsApp} />
                    /* Vat codes */
                    <Route path="btw-codes" component={VatCodesListApp} />
                    <Route path="btw-code/nieuw" component={VatCodeNewApp} />
                    <Route path="btw-code/:id" component={VatCodeDetailsApp} />
                    /* Webforms */
                    <Route path="webformulieren" component={WebformsListApp} />
                    <Route path="webformulier/nieuw" component={WebformNewApp} />
                    <Route path="webformulier/:id" component={WebformDetailsApp} />
                    /* Mailboxes */
                    <Route path="mailgun-domeinen" component={MailgunDomainsListApp} />
                    <Route path="mailgun-domein/nieuw" component={MailgunDomainNewApp} />
                    <Route path="mailgun-domein/:id" component={MailgunDomainDetailsApp} />
                    /* Portal settings */
                    <Route path="portal-settings" component={PortalSettingsApp} />
                    /* Taak types */
                    <Route path="taak-types" component={TaskTypesListApp} />
                    <Route path="taak-type/:id" component={TaskTypeDetailsApp} />
                    <Route path="offerte-verzoek-statussen" component={QuotationRequestStatusListApp} />
                    <Route path="offerte-verzoek-status/:id" component={QuotationRequestStatusDetailsApp} />
                    <Route path="kans-statussen" component={OpportunityStatusListApp} />
                    <Route path="kans-status/:id" component={OpportunityStatusDetailsApp} />
                    /* 404 route */
                    <Route path="*" component={NotFoundedPage} />
                </Route>
            </Router>
        </Suspense>
    );
};

export default Routes;
