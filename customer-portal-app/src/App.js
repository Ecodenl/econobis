import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './container/login';
import AccountInfo from './container/account-info';
import AccountInfoCorp from './container/account-info-corp';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <ProtectedRoute exact path="/" component={AccountInfo} />
                    <ProtectedRoute path="/account-info" component={AccountInfo} />
                    <ProtectedRoute path="/account-info-corp" component={AccountInfoCorp} />
                    <Route path="/login" component={Login} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
