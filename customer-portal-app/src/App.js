import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Login from './container/login';
import AccountInfo from './container/account-info';
import AccountInfoCorp from './container/account-info-corp';
import MyAreasOfInterest from './container/my-areas-of-interest';
import RegisterCapital from './container/register/capital';
import ProjectList from './container/project/list';
import ProjectDetails from './container/project/details';

function App() {
    return (
        <Router>
            <AuthProvider>
                <UserProvider>
                    <Switch>
                        <ProtectedRoute exact path="/" component={AccountInfo} />
                        <ProtectedRoute path="/gegevens" component={AccountInfo} />
                        <ProtectedRoute path="/gegevens-zakelijk" component={AccountInfoCorp} />
                        <ProtectedRoute path="/mijn-interessegebieden" component={MyAreasOfInterest} />
                        <ProtectedRoute path="/inschrijven/:id" component={RegisterCapital} />
                        <ProtectedRoute path="/inschrijven-projecten" component={ProjectList} />
                        <ProtectedRoute path="/project/:id" component={ProjectDetails} />
                        <PublicRoute path="/login" component={Login} />
                    </Switch>
                </UserProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
