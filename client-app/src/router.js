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
const CreateRevenuesKwhReportApp = React.lazy(() =>
    import('./container/project/details/revenueKwh/details/create/CreateRevenuesKwhReportApp')
);
const CreateRevenuePartsKwhReportApp = React.lazy(() =>
    import('./container/project/details/revenueKwh/details/revenue-parts/details/create/CreateRevenuePartsKwhReportApp')
);
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
    import('./container/project/details/revenueKwh/energy-supplier-report/EnergySupplierReportNewApp')
);
const PartEnergySupplierExcelNewApp = React.lazy(() =>
    import(
        './container/project/details/revenueKwh/details/revenue-parts/energy-supplier-excel/PartEnergySupplierExcelNewApp'
    )
);
const Forgot = React.lazy(() => import('./container/auth/Forgot'));
const HousingFileDetailsApp = React.lazy(() => import('./container/housing-file/details/HousingFileDetailsApp'));
const HousingFileNewApp = React.lazy(() => import('./container/housing-file/new/HousingFileNewApp'));
const HousingFilesListApp = React.lazy(() => import('./container/housing-file/list/HousingFilesListApp'));
const HousingFileSpecificationsListApp = React.lazy(() =>
    import('./container/housing-file-specification/list/HousingFileSpecificationsListApp')
);
const QuotationRequestDetailsApp = React.lazy(() =>
    import('./container/quotation-request/details/QuotationRequestDetailsApp')
);
const QuotationRequestNewApp = React.lazy(() => import('./container/quotation-request/new/QuotationRequestNewApp'));
const QuotationRequestPlanNewApp = React.lazy(() =>
    import('./container/quotation-request/plan/QuotationRequestPlanNewApp')
);
const QuotationRequestsListApp = React.lazy(() =>
    import('./container/quotation-request/list/QuotationRequestsListApp')
);
const Reset = React.lazy(() => import('./container/auth/Reset'));
const Login = React.lazy(() => import('./container/auth/Login'));
const Logout = React.lazy(() => import('./container/auth/Logout'));
const MailboxDetailsApp = React.lazy(() => import('./container/mailbox/details/MailboxDetailsApp'));
const MailboxNewApp = React.lazy(() => import('./container/mailbox/new/MailboxNewApp'));
const MailboxesListApp = React.lazy(() => import('./container/mailbox/list/MailboxesListApp'));
const DistrictsListApp = React.lazy(() => import('./container/district/list/DistrictsListApp'));
const DistrictNewApp = React.lazy(() => import('./container/district/new/DistrictNewApp'));
const DistrictDetailsApp = React.lazy(() => import('./container/district/details/DistrictDetailsApp'));
const DistrictCalendarApp = React.lazy(() => import('./container/district/calendar/DistrictCalendarApp'));
const MailgunEventListApp = React.lazy(() => import('./container/mailgun-event/list/MailgunEventListApp'));
const ContactAvailabilityListApp = React.lazy(() =>
    import('./container/contact-availability/list/ContactAvailabilityListApp')
);
const ContactAvailabilityDetailsApp = React.lazy(() =>
    import('./container/contact-availability/details/ContactAvailabilityDetailsApp')
);
const MailgunDomainsListApp = React.lazy(() => import('./container/mailgun-domain/list/MailgunDomainsListApp'));
const MailgunDomainNewApp = React.lazy(() => import('./container/mailgun-domain/new/MailgunDomainNewApp'));
const MailgunDomainDetailsApp = React.lazy(() => import('./container/mailgun-domain/details/MailgunDomainDetailsApp'));
import Main from './container/global/Main';
import LoadingPage from './container/global/LoadingPage';
import RevenuesKwhNewApp from './container/project/details/revenueKwh/new/RevenuesKwhNewApp';
import RevenuesKwhDetailsApp from './container/project/details/revenueKwh/details/RevenuesKwhDetailsApp';
import RevenuePartsKwhDetailsApp from './container/project/details/revenueKwh/details/revenue-parts/details/RevenuePartsKwhDetailsApp';
import PortalSettingsDashboardWidgetDetailsApp from './container/portal-settings-dashboard/widgets/details/PortalSettingsDashboardWidgetDetailsApp';
const MeasuresListApp = React.lazy(() => import('./container/measures/list/MeasuresListApp'));
const MeasureDetailsApp = React.lazy(() => import('./container/measures/details/MeasureDetailsApp'));
const MeasureCategoriesListApp = React.lazy(() =>
    import('./container/measure-categories/list/MeasureCategoriesListApp')
);
const MeasureCategoryDetailsApp = React.lazy(() =>
    import('./container/measure-categories/details/MeasureCategoryDetailsApp')
);
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
// const ParticipantProjectRevenueDetailsApp = React.lazy(() =>
//     import('./container/participant-project/details/revenue/details/RevenueDetailsApp')
// );
// const ParticipantProjectRevenueNewApp = React.lazy(() =>
//     import('./container/participant-project/details/revenue/new/RevenueNewApp')
// );
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
const ProjectRevenueDetailsApp = React.lazy(() =>
    import('./container/project/details/revenue/details/RevenueDetailsApp')
);
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
const FinancialOverviewListApp = React.lazy(() =>
    import('./container/financial/overview/list/FinancialOverviewListApp')
);
const FinancialOverviewCreateApp = React.lazy(() =>
    import('./container/financial/overview/create/FinancialOverviewCreateApp')
);

const FinancialOverviewNewApp = React.lazy(() => import('./container/financial/overview/new/FinancialOverviewNewApp'));
const FinancialOverviewDetailsApp = React.lazy(() =>
    import('./container/financial/overview/details/FinancialOverviewDetailsApp')
);
const FinancialOverviewProjectDetailsApp = React.lazy(() =>
    import('./container/financial/overview/project/FinancialOverviewProjectDetailsApp')
);
const FinancialOverviewContactPreviewApp = React.lazy(() =>
    import('./container/financial/overview/preview/FinancialOverviewContactPreviewApp')
);
const FinancialOverviewContactViewApp = React.lazy(() =>
    import('./container/financial/overview/details/contact/view/FinancialOverviewContactViewApp')
);

const CostCentersListApp = React.lazy(() => import('./container/cost-center/list/CostCentersListApp'));
const CostCenterNewApp = React.lazy(() => import('./container/cost-center/new/CostCenterNewApp'));
const CostCenterDetailsApp = React.lazy(() => import('./container/cost-center/details/CostCenterDetailsApp'));
const PortalSettingsApp = React.lazy(() => import('./container/portal-settings/PortalSettingsApp'));
const PortalSettingsDashboardApp = React.lazy(() =>
    import('./container/portal-settings-dashboard/PortalSettingsDashboardApp')
);
const PortalSettingsDashboardWidgetNewApp = React.lazy(() =>
    import('./container/portal-settings-dashboard/widgets/new/PortalSettingsDashboardWidgetNewApp')
);
const PortalSettingsLayoutListApp = React.lazy(() =>
    import('./container/portal-settings-layout/list/PortalSettingsLayoutListApp')
);
const PortalSettingsLayoutNewApp = React.lazy(() =>
    import('./container/portal-settings-layout/new/PortalSettingsLayoutNewApp')
);
const PortalSettingsLayoutApp = React.lazy(() =>
    import('./container/portal-settings-layout/details/PortalSettingsLayoutApp')
);
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
const TwinfieldListApp = React.lazy(() => import('./container/twinfield/list'));
const HousingFileListApp = React.lazy(() => import('./container/housing-file/log'));
const CooperationDetailsApp = React.lazy(() => import('./container/cooperation/details'));
const TwoFactorActivate = React.lazy(() => import('./container/auth/TwoFactorActivate'));
const TwoFactorConfirm = React.lazy(() => import('./container/auth/TwoFactorConfirm'));
const TwoFactorRecover = React.lazy(() => import('./container/auth/TwoFactorRecover'));

/**
 * Mailclient / Mail in splitview
 * */
const EmailSplitView = React.lazy(() => import('./container/email/splitview/EmailSplitView'));
const OpenEmailModal = React.lazy(() => import('./container/email/OpenEmailModalView'));

const Routes = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
                <Route path="login" component={Login} />
                <Route path="loguit" component={Logout} />
                <Route path="wachtwoord-vergeten" component={Forgot} />
                <Route path="wachtwoord-wijzig/:token/:email" component={Reset} />
                <Route path="two-factor/activate" component={TwoFactorActivate} />
                <Route path="two-factor/confirm" component={TwoFactorConfirm} />
                <Route path="two-factor/recover" component={TwoFactorRecover} />
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
                    /* Cooperation */
                    <Route path="cooperatie" component={CooperationDetailsApp} />
                    /* Documents */
                    <Route path="documenten" component={DocumentsListApp} />
                    <Route path="document/nieuw/:type/document" component={DocumentNewApp} />
                    <Route
                        path="document/nieuw/:type/:showOnPortal/administratie/:administrationId"
                        component={DocumentNewApp}
                    />
                    <Route path="document/nieuw/:type/:showOnPortal/project/:projectId" component={DocumentNewApp} />
                    <Route
                        path="document/nieuw/:type/:showOnPortal/project/:projectId/deelnemer/:participantId/contact/:contactId"
                        component={DocumentNewApp}
                    />
                    <Route path="document/nieuw/:type/email-bijlage/:emailAttachmentId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/campagne/:campaignId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/contact-groep/:contactGroupId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/contact/:contactId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/order/:orderId" component={DocumentNewApp} />
                    <Route
                        path="document/nieuw/:type/woningdossier/:housingFileId/contact/:contactId"
                        component={DocumentNewApp}
                    />
                    <Route
                        path="document/nieuw/:type/intake/:intakeId/campagne/:campaignId/contact/:contactId"
                        component={DocumentNewApp}
                    />
                    <Route path="document/nieuw/:type/maatregel/:measureId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/offerteverzoek/:quotationRequestId" component={DocumentNewApp} />
                    <Route path="document/nieuw/:type/taak/:taskId" component={DocumentNewApp} />
                    <Route
                        path="document/nieuw/:type/kans/:opportunityId/intake/:intakeId/campagne/:campaignId/contact/:contactId"
                        component={DocumentNewApp}
                    />
                    {/* todo WM: worden deze nog gebruikt? */}
                    {/*<Route path="document/nieuw/:type/kans/:opportunityId" component={DocumentNewApp} />*/}
                    {/*<Route path="document/nieuw/:type/intake/:intakeId" component={DocumentNewApp} />*/}
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
                    <Route path="email/nieuw/kans/:opportunityId/:contactId" component={EmailNewApp} />
                    <Route path="email/nieuw/offerteverzoek/:quotationRequestId/:contactId" component={EmailNewApp} />
                    {/*<Route path="email/nieuw/offerteverzoek/:quotationRequestId/contacts/:contactIds" component={EmailNewApp} />*/}
                    <Route
                        path="email/nieuw/offerteverzoek/:quotationRequestId/:contactId/occupant/:occupantId"
                        component={EmailNewApp}
                    />
                    <Route path="email/nieuw/intake/:intakeId/contact/:contactId" component={EmailNewApp} />
                    <Route path="email/nieuw/taak/:taskId" component={EmailNewApp} />
                    <Route path="email/nieuw/taak/:taskId/contact/:contactId" component={EmailNewApp} />
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
                    /* Orders */
                    <Route path="order/nieuw/contact/:contactId" component={OrderNewApp} />
                    <Route path="order/:id" component={OrderDetailsApp} />
                    <Route path="order/inzien/:id" component={InvoicePreviewApp} />
                    /* Nota's */
                    <Route path="nota/:id" component={InvoiceDetailsApp} />
                    <Route path="nota/inzien/:id" component={InvoiceViewApp} />
                    <Route path="nota/twinfield/:twinfieldCode/:twinfieldNumber" component={InvoiceViewApp} />
                    /* Waardestaten */
                    <Route path="waardestaten" component={FinancialOverviewListApp} />
                    <Route path="waardestaat/nieuw" component={FinancialOverviewNewApp} />
                    <Route path="waardestaat/:id" component={FinancialOverviewDetailsApp} />
                    <Route path="waardestaat/:id/aanmaken/:type" component={FinancialOverviewCreateApp} />
                    <Route path="waardestaat-project/:id" component={FinancialOverviewProjectDetailsApp} />
                    <Route path="waardestaat-contact/preview/:id" component={FinancialOverviewContactPreviewApp} />
                    <Route path="waardestaat-contact/inzien/:id" component={FinancialOverviewContactViewApp} />
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
                    /* PortalSettingsLayout */
                    <Route path="portal-instellingen-dashboard" component={PortalSettingsDashboardApp} />
                    <Route
                        path="portal-instellingen-dashboard-widget/nieuw"
                        component={PortalSettingsDashboardWidgetNewApp}
                    />
                    <Route
                        path="portal-instellingen-dashboard-widget/:id"
                        component={PortalSettingsDashboardWidgetDetailsApp}
                    />
                    /* PortalSettingsLayout */
                    <Route path="portal-instellingen-layout" component={PortalSettingsLayoutListApp} />
                    <Route path="portal-instellingen-layout/nieuw" component={PortalSettingsLayoutNewApp} />
                    <Route path="portal-instellingen-layout/:id" component={PortalSettingsLayoutApp} />
                    /* MeasureCategories */
                    <Route path="maatregel-categorieen" component={MeasureCategoriesListApp} />
                    <Route path="maatregel-categorie/:id" component={MeasureCategoryDetailsApp} />
                    /* Measures */
                    <Route path="maatregelen" component={MeasuresListApp} />
                    <Route path="maatregel/:id" component={MeasureDetailsApp} />
                    /* Mailboxes */
                    <Route path="mailbox/nieuw" component={MailboxNewApp} />
                    <Route path="mailbox/:id" component={MailboxDetailsApp} />
                    <Route path="mailboxen" component={MailboxesListApp} />
                    /* Districts */
                    <Route path="afspraak-kalender/nieuw" component={DistrictNewApp} />
                    <Route path="afspraak-kalender/:id" component={DistrictDetailsApp} />
                    <Route path="afspraak-kalender/:id/kalender" component={DistrictCalendarApp} />
                    <Route path="afspraak-kalenders" component={DistrictsListApp} />
                    /* Availabilities */
                    <Route path="beschikbaarheid/:id" component={ContactAvailabilityDetailsApp} />
                    <Route path="beschikbaarheid" component={ContactAvailabilityListApp} />
                    /* Mailgun Events */
                    <Route path="mailgun/log" component={MailgunEventListApp} />
                    /* Housing File */
                    <Route
                        path="woningdossier/nieuw/contact/:contactId/adres/:addressId"
                        component={HousingFileNewApp}
                    />
                    <Route path="woningdossier/:id" component={HousingFileDetailsApp} />
                    <Route path="woningdossiers" component={HousingFilesListApp} />
                    <Route path="woningdossier-specificaties" component={HousingFileSpecificationsListApp} />
                    /* Quotation Request */
                    <Route
                        path="offerteverzoek/nieuw/kans/:opportunityId/actie/:opportunityActionId"
                        component={QuotationRequestNewApp}
                    />
                    <Route
                        path="offerteverzoek/nieuw/kans/:opportunityId/plan/:districtId"
                        component={QuotationRequestPlanNewApp}
                    />
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
                    <Route path="project/details/:id" component={ProjectDetailsApp} />
                    <Route path="project/opbrengst/:id" component={ProjectRevenueDetailsApp} />
                    <Route path="project/opbrengst/:id/rapportage" component={PaymentInvoiceCreateApp} />
                    <Route path="project/opbrengst-kwh/nieuw/:projectId/:categoryId" component={RevenuesKwhNewApp} />
                    <Route path="project/opbrengst-kwh/:id" component={RevenuesKwhDetailsApp} />
                    <Route path="project/opbrengst-kwh/:id/rapportage" component={CreateRevenuesKwhReportApp} />
                    <Route
                        path="project/opbrengst-kwh/:revenueId/energieleverancier-rapport"
                        component={EnergySupplierReportNewApp}
                    />
                    <Route
                        path="project/opbrengst-deelperiode-kwh/:revenuePartId/energieleverancier-excel"
                        component={PartEnergySupplierExcelNewApp}
                    />
                    <Route
                        path="project/opbrengst-kwh/:revenueId/deelperiode/:id"
                        component={RevenuePartsKwhDetailsApp}
                    />
                    <Route
                        path="project/opbrengst-deelperiode-kwh/:id/rapportage"
                        component={CreateRevenuePartsKwhReportApp}
                    />
                    <Route path="project/preview-rapportage" component={ParticipantReportCreateApp} />
                    <Route path="project/:id" component={ProjectGeneralApp} />
                    <Route path="projecten" component={ProjectsListApp} />
                    <Route path="projecten/:filter/:value" component={ProjectsListApp} />
                    <Route path="deelnemers" component={ParticipantListApp} />
                    <Route path="project/deelnemer/:participationId/overdragen" component={ParticipationTransferApp} />
                    <Route path="project/deelnemer/nieuw/:projectId" component={ParticipantNewApp} />
                    <Route path="project/deelnemer/nieuw/contact/:contactId" component={ParticipantNewApp} />
                    <Route path="project/deelnemer/:id" component={ParticipantDetailsApp} />
                    {/*<Route*/}
                    {/*    path="project/deelnemer/opbrengst/nieuw/:projectId/:participationId/:categoryId"*/}
                    {/*    component={ParticipantProjectRevenueNewApp}*/}
                    {/*/>*/}
                    {/*<Route path="project/deelnemer/opbrengst/:id" component={ParticipantProjectRevenueDetailsApp} />*/}
                    /* Processes */
                    <route path="processen" component={ProcessesListApp} />
                    /* Twinfield */
                    <route path="twinfield" component={TwinfieldListApp} />
                    /* Housingfile Log */
                    <route path="housing-file/log" component={HousingFileListApp} />
                    /* Task / notes */
                    <Route path="taak/nieuw" component={TaskNewApp} />
                    <Route path="taak/nieuw/:closed" component={TaskNewApp} />
                    <Route path="taak/nieuw/:closed/:type/:id" component={TaskNewApp} />
                    <Route path="taak/:id" component={TaskDetailsApp} />
                    <Route path="taak/nieuw/:type/:id" component={TaskNewApp} />
                    <Route path="taak/nieuw/kans/:opportunityId/contact/:contactId" component={TaskNewApp} />
                    <Route
                        path="taak/nieuw/contact/:contactId/project/:projectId/deelnemer/:participantId"
                        component={TaskNewApp}
                    />
                    <Route
                        path="taak/nieuw/:closed/kans/:opportunityId/intake/:intakeId/campagne/:campaignId/contact/:contactId"
                        component={TaskNewApp}
                    />
                    <Route
                        path="taak/nieuw/:closed/intake/:intakeId/campagne/:campaignId/contact/:contactId"
                        component={TaskNewApp}
                    />
                    <Route
                        path="taak/nieuw/:closed/nota/:invoiceId/order/:orderId/contact/:contactId"
                        component={TaskNewApp}
                    />
                    <Route path="taak/nieuw/:closed/order/:orderId/contact/:contactId" component={TaskNewApp} />
                    <Route
                        path="taak/nieuw/:closed/woningdossier/:housingFileId/contact/:contactId"
                        component={TaskNewApp}
                    />
                    {/*<Route path="taak/nieuw/:closed/kans/:opportunityId/contact/:contactId" component={TaskNewApp} />*/}
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
                    /* Mailclient */
                    <Route path="mailclient/:folder" component={EmailSplitView} />
                    <Route path="mailclient/email/:id" component={OpenEmailModal} />
                    /* 404 route */
                    <Route path="*" component={NotFoundedPage} />
                </Route>
            </Router>
        </Suspense>
    );
};

export default Routes;
