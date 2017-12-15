import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Main from './container/global/Main';
import Login from './container/auth/Login';
import Logout from './container/auth/Logout';
import RequireAuth from './helpers/RequireAuth';
import PermissionHelper from './helpers/PermissionHelper';

import DashboardApp from './container/dashboard/DashboardApp';

import ContactsListApp from './container/contactsList/ContactsListApp';
import ContactDetailsApp from './container/contactDetails/ContactDetailsApp';
import ContactNewApp from './container/contactNew/ContactNewApp';

import TaskDetailsApp from './container/task/details/TaskDetailsApp';
import TasksListApp from './container/task/list/TasksListApp';
import TaskNewApp from './container/task/new/TaskNewApp';

import RegistrationsListApp from './container/registration/list/RegistrationsListApp';
import RegistrationDetailsApp from './container/registration/details/RegistrationDetailsApp';
import RegistrationNewApp from './container/registration/new/RegistrationNewApp';

import OpportunitiesListApp from './container/opportunities/list/OpportunitiesListApp';
import OpportunityDetailsApp from './container/opportunities/details/OpportunityDetailsApp';
import OpportunityNewApp from './container/opportunities/new/OpportunityNewApp';
import UsersListApp from './container/users/list/UsersListApp';
import UserNewApp from './container/users/new/UserNewApp';
import UserDetailsApp from './container/users/details/UserDetailsApp';
import ContactGroupsListApp from './container/contact-groups/list-groups/ContactGroupsListApp';
import ContactGroupNewApp from './container/contact-groups/new/ContactGroupNewApp';
import ContactGroupDetailsApp from './container/contact-groups/details/ContactGroupDetailsApp';
import ContactsInGroupListApp from './container/contact-groups/list-contacts-in-group/ContactsInGroupListApp';


const Routes = () => {
    return (
        <Router onUpdate={() => window.scrollTo(0, 0)} history={ hashHistory }>
            <Route path="login" component={ Login } />
            <Route path="loguit" component={ Logout } />
            <Route path="/" component={ RequireAuth(Main) }>
                <IndexRoute component={ DashboardApp } />

                <Route path="contacten/:filter/:value" component={ ContactsListApp } />
                <Route path="contacten" component={ ContactsListApp } />
                <Route path="contact/nieuw/:type/organisatie/:id" component={ PermissionHelper(ContactNewApp, true) } />
                <Route path="contact/nieuw/:type" component={ PermissionHelper(ContactNewApp, true) } />
                <Route path="contact/:id" component={ ContactDetailsApp } />

                <Route path="taken" component={TasksListApp} />
                <Route path="taak/nieuw/:type/:id" component={TaskNewApp} />
                <Route path="taak/:id" component={TaskDetailsApp} />

                <Route path="aanmeldingen" component={ RegistrationsListApp } />
                <Route path="aanmelding/nieuw/contact/:contactId/adres/:addressId" component={RegistrationNewApp} />
                <Route path="aanmelding/:id" component={RegistrationDetailsApp} />

                <Route path="kansen" component={OpportunitiesListApp} />
                <Route path="kans/nieuw" component={OpportunityNewApp} />
                <Route path="kans/nieuw/:type/:id" component={OpportunityNewApp} />
                <Route path="kans/:id" component={OpportunityDetailsApp} />

                <Route path="gebruikers" component={UsersListApp} />
                <Route path="gebruiker/nieuw" component={UserNewApp} />
                <Route path="gebruiker/:id" component={UserDetailsApp} />

                <Route path="contact-groepen" component={ ContactGroupsListApp } />
                <Route path="contact-groep/nieuw" component={ContactGroupNewApp} />
                <Route path="contact-groep/:id" component={ContactGroupDetailsApp} />
                <Route path="contacten-in-groep/:contactGroup" component={ ContactsInGroupListApp } />

                // 404 route
                <Route path="*" component={ DashboardApp } />
            </Route>
        </Router>
    );
};

export default Routes;
