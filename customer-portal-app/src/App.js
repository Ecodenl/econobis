import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './container/Dashboard';
import Login from './container/login';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    {/*<ProtectedRoute path="/" component={Dashboard} />*/}
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <Route path="/login" component={Login} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
