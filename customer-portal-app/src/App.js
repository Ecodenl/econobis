import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './container/login';
import AccountInfo from './container/account-info';
import AccountInfoCorp from './container/account-info-corp';
import MyAreasOfInterest from './container/my-areas-of-interest';
import RegisterCapital from './container/register/capital';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <ProtectedRoute exact path="/" component={AccountInfo} />
                    <ProtectedRoute path="/gegevens" component={AccountInfo} />
                    <ProtectedRoute path="/gegevens-zakelijk" component={AccountInfoCorp} />
                    <ProtectedRoute path="/mijn-interessegebieden" component={MyAreasOfInterest} />
                    <ProtectedRoute path="/inschrijven/kapitaal/:project" component={RegisterCapital} />
                    <PublicRoute path="/login" component={Login} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
