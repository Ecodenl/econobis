import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import { PortalUserProvider } from './context/PortalUserContext';
import Login from './container/authorization/login';
import TwoFactorConfirm from './container/authorization/two-factor';
import TwoFactorRecover from './container/authorization/two-factor/recover';
import Register from './container/authorization/register';
import Forgot from './container/authorization/forgot';
import Reset from './container/authorization/reset';
import Dashboard from './container/dashboard';
import ContactDetails from './container/contact-details';
// import MyAreasOfInterest from './container/my-areas-of-interest';
import RegisterProject from './container/register';
import ProjectList from './container/project/list';
import ProjectDetails from './container/project/details';
import RegistrationList from './container/registration/list';
import NewAccount from './container/authorization/new-account';
import NewAccountSuccess from './container/authorization/new-account/NewAccountSuccess';
import ChangeAccount from './container/authorization/change-account';
import AboutUs from './container/about-us/list';
import RegistrationDetails from './container/registration/details';
import FinancialOverviewDocuments from './container/financial-overview-documents/list';
import { ThemeSettingsProvider } from './context/ThemeSettingsContext';
import AboutUsAdministration from './container/about-us/details';
import ProjectMollieRedirectWithContext from './container/register/mollie-redirect';
import CoachInspectList from './container/inspect/list';
import CoachInspectDetails from './container/inspect/details';
import AvailabilityDetails from './container/availability/index';
import DocumentPreview from './container/inspect/details/document';
import FreeFieldsPageDetails from './container/free-fields-page/details';

function App() {
    return (
        <Router>
            <AuthProvider>
                <PortalUserProvider>
                    <ThemeSettingsProvider>
                        <Switch>
                            <ProtectedRoute exact path="/" component={Dashboard} />
                            <ProtectedRoute path="/dashboard" component={Dashboard} />
                            <ProtectedRoute path="/gegevens" component={ContactDetails} />
                            {/*<ProtectedRoute path="/mijn-interessegebieden" component={MyAreasOfInterest} />*/}
                            <ProtectedRoute
                                path="/inschrijven/mollie-resultaat/:code"
                                component={ProjectMollieRedirectWithContext}
                            />
                            <ProtectedRoute path="/inschrijven/:id" component={RegisterProject} />
                            <ProtectedRoute path="/inschrijven-projecten" component={ProjectList} />
                            <ProtectedRoute path="/inschrijvingen-projecten" component={RegistrationList} />
                            <ProtectedRoute path="/project-deelname/:id" component={RegistrationDetails} />
                            <ProtectedRoute path="/project/:id" component={ProjectDetails} />
                            <ProtectedRoute path="/waardestaat-documenten" component={FinancialOverviewDocuments} />
                            <ProtectedRoute path="/wijzig-inloggegevens" component={ChangeAccount} />
                            <ProtectedRoute path="/over-ons" component={AboutUs} />
                            <ProtectedRoute path="/over-ons-organisatie/:id" component={AboutUsAdministration} />
                            <ProtectedRoute path="/schouwen/campagne/:campaignId/:id" component={CoachInspectDetails} />
                            <ProtectedRoute path="/schouwen/campagne/:campaignId" component={CoachInspectList} />
                            <ProtectedRoute
                                path="/schouwen/:quotationRequestId/document/:id"
                                component={DocumentPreview}
                            />
                            <ProtectedRoute path="/schouwen/:id" component={CoachInspectDetails} />
                            <ProtectedRoute path="/schouwen" component={CoachInspectList} />
                            <ProtectedRoute path="/beschikbaarheid" component={AvailabilityDetails} />
                            <ProtectedRoute path="/vrije-velden/:urlPageRef" component={FreeFieldsPageDetails} />
                            <PublicRoute path="/login" component={Login} />
                            <PublicRoute path="/two-factor/confirm" component={TwoFactorConfirm} />
                            <PublicRoute path="/two-factor/recover" component={TwoFactorRecover} />
                            <PublicRoute path="/activeer-registratie/:registrationCode/:email" component={Register} />
                            <PublicRoute path="/wachtwoord-vergeten" component={Forgot} />
                            <PublicRoute path="/wachtwoord-wijzigen/:token/:email" component={Reset} />
                            <PublicRoute path="/nieuw-account" component={NewAccount} />
                            <PublicRoute path="/nieuw-account-succes" component={NewAccountSuccess} />
                        </Switch>
                    </ThemeSettingsProvider>
                </PortalUserProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
