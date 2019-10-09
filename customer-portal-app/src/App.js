import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import { PortalUserProvider } from './context/PortalUserContext';
import Login from './container/authorization/login';
import Register from './container/authorization/register';
import Forgot from './container/authorization/forgot';
import Reset from './container/authorization/reset';
import ContactDetails from './container/contact-details';
import MyAreasOfInterest from './container/my-areas-of-interest';
import RegisterCapital from './container/register';
import ProjectList from './container/project/list';
import ProjectDetails from './container/project/details';
import RegistrationList from './container/registration/list';

function App() {
    return (
        <Router>
            <AuthProvider>
                <PortalUserProvider>
                    <Switch>
                        <ProtectedRoute exact path="/" component={ContactDetails} />
                        <ProtectedRoute path="/gegevens" component={ContactDetails} />
                        <ProtectedRoute path="/mijn-interessegebieden" component={MyAreasOfInterest} />
                        <ProtectedRoute path="/inschrijven/:id" component={RegisterCapital} />
                        <ProtectedRoute path="/inschrijven-projecten" component={ProjectList} />
                        <ProtectedRoute path="/inschrijvingen-projecten" component={RegistrationList} />
                        <ProtectedRoute path="/project/:id" component={ProjectDetails} />
                        <PublicRoute path="/login" component={Login} />
                        <PublicRoute path="/activeer-registratie/:registrationCode/:email" component={Register} />
                        <PublicRoute path="/wachtwoord-vergeten" component={Forgot} />
                        <PublicRoute path="/wachtwoord-wijzigen/:token/:email" component={Reset} />
                    </Switch>
                </PortalUserProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
