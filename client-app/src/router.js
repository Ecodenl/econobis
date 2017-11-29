import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Main from './container/global/Main';
import Login from './container/auth/Login';
import Logout from './container/auth/Logout';
import RequireAuth from './helpers/RequireAuth';
import DashboardApp from './container/dashboard/DashboardApp';

import ContactsListApp from './container/contactsList/ContactsListApp';
import ContactDetailsApp from './container/contactDetails/ContactDetailsApp';
import ContactNewApp from './container/contactNew/ContactNewApp';

import TasksApp from './container/tasks/TasksApp';

import RegistrationsListApp from './container/registration/list/RegistrationsListApp';
import RegistrationDetailsApp from './container/registration/details/RegistrationDetailsApp';
import RegistrationNewApp from './container/registration/new/RegistrationNewApp';

import OppertunitiesApp from './container/opportunities/OppertunitiesApp';
import UsersListApp from './container/users/list/UsersListApp';
import UserNewApp from './container/users/new/UserNewApp';
import UserDetailsApp from './container/users/details/UserDetailsApp';

const Routes = () => {
    return (
        <Router onUpdate={() => window.scrollTo(0, 0)} history={ hashHistory }>
            <Route path="login" component={ Login } />
            <Route path="loguit" component={ Logout } />
            <Route path="/" component={ RequireAuth(Main) }>
                <IndexRoute component={ DashboardApp } />

                <Route path="contacten/:filter/:value" component={ ContactsListApp } />
                <Route path="contacten" component={ ContactsListApp } />
                <Route path="contact/nieuw/:type/bedrijf/:id" component={ ContactNewApp } />
                <Route path="contact/nieuw/:type" component={ ContactNewApp } />
                <Route path="contact/:id" component={ ContactDetailsApp } />

                <Route path="taak/:id" component={TasksApp} />

                <Route path="aanmeldingen" component={ RegistrationsListApp } />
                <Route path="aanmelding/nieuw/contact/:contactId/adres/:addressId" component={RegistrationNewApp} />
                <Route path="aanmelding/:id" component={RegistrationDetailsApp} />

                <Route path="kans/:id" component={OppertunitiesApp} />

                <Route path="gebruikers" component={UsersListApp} />
                <Route path="gebruiker/nieuw" component={UserNewApp} />
                <Route path="gebruiker/:id" component={UserDetailsApp} />
            </Route>
        </Router>
    );
};

export default Routes;
