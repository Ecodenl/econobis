import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './container/Dashboard';
import Login from './container/login';
import AccountInfo from './container/account-info';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <ProtectedRoute exact path="/" component={AccountInfo} />
                    <ProtectedRoute exact path="/account-info" component={AccountInfo} />
                    <Route path="/login" component={Login} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
