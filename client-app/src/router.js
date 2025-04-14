import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import PermissionWrapper from './helpers/PermissionWrapper';
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
const FreeFieldsListApp = React.lazy(() => import('./container/free-fields/list/FreeFieldsListApp'));
const FreeFieldNewApp = React.lazy(() => import('./container/free-fields/new/FreeFieldNewApp'));
const FreeFieldDetailsApp = React.lazy(() => import('./container/free-fields/details/FreeFieldDetailsApp'));
const PortalFreeFieldsPagesListApp = React.lazy(() =>
    import('./container/portal-free-fields-pages/list/PortalFreeFieldsPagesListApp')
);
const PortalFreeFieldsPagesNewApp = React.lazy(() =>
    import('./container/portal-free-fields-pages/new/PortalFreeFieldsPagesNewApp')
);
const PortalFreeFieldsPagesDetailsApp = React.lazy(() =>
    import('./container/portal-free-fields-pages/details/PortalFreeFieldsPagesDetailsApp')
);

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
const AddressDonglesListApp = React.lazy(() => import('./container/address-dongles/list/AddressDonglesListApp'));
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
const EmailSplitView = React.lazy(() => import('./container/email/splitview/EmailSplitView'));
const OpenEmailModal = React.lazy(() => import('./container/email/OpenEmailModalView'));

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return null;
};
const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingPage />}>
                <ScrollToTop />
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="loguit" element={<Logout />} />
                    <Route path="wachtwoord-vergeten" element={<Forgot />} />
                    <Route path="wachtwoord-wijzig/:token/:email" element={<Reset />} />
                    <Route path="two-factor/activate" element={<TwoFactorActivate />} />
                    <Route path="two-factor/confirm" element={<TwoFactorConfirm />} />
                    <Route path="two-factor/recover" element={<TwoFactorRecover />} />
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Main />
                            </RequireAuth>
                        }
                    >
                        {/* Dashboards */}
                        <Route index element={<DashboardDefaultApp />} />
                        <Route path="dashboard" element={<DashboardDefaultApp />} />
                        <Route
                            path="dashboard/energie-besparing"
                            element={
                                <PermissionWrapper requiredPermission="manageQuotationRequest">
                                    <DashboardEnergySavingApp />
                                </PermissionWrapper>
                            }
                        />
                        <Route
                            path="dashboard/financieel"
                            element={
                                <PermissionWrapper requiredPermission="manageFinancial">
                                    <DashboardFinancialApp />
                                </PermissionWrapper>
                            }
                        />
                        <Route
                            path="dashboard/deelnames"
                            element={
                                <PermissionWrapper requiredPermission="manageParticipation">
                                    <DashboardParticipationsApp />
                                </PermissionWrapper>
                            }
                        />
                        /* Administrations */
                        <Route path="administraties" element={<AdministrationsListApp />} />
                        <Route path="administratie/nieuw" element={<AdministrationNewApp />} />
                        <Route path="administratie/:id" element={<AdministrationDetailsApp />} />
                        <Route path="contacten/:filter/:value" element={<ContactsListApp />} />
                        <Route path="contacten" element={<ContactsListApp />} />
                        <Route path="contact/:id" element={<ContactDetailsApp />} />
                        <Route path="*" element={<NotFoundedPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
