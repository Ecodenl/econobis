import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import CampaignDetailsApp from './container/campaigns/details/CampaignDetailsApp';
import CampaignNewApp from './container/campaigns/new/CampaignNewApp';
import CampaignsListApp from './container/campaigns/list/CampaignsListApp';
import ContactDetailsApp from './container/contact/details/ContactDetailsApp';
import ContactGroupDetailsApp from './container/contact-groups/details/ContactGroupDetailsApp';
import ContactGroupNewApp from './container/contact-groups/new/ContactGroupNewApp';
import ContactGroupsListApp from './container/contact-groups/list-groups/ContactGroupsListApp';
import ContactNewApp from './container/contact/new/ContactNewApp';
import ContactsInGroupListApp from './container/contact-groups/list-contacts-in-group/ContactsInGroupListApp';
import ContactsListApp from './container/contact/list/ContactsListApp';
import DashboardApp from './container/dashboard/DashboardApp';
import Login from './container/auth/Login';
import Logout from './container/auth/Logout';
import MailboxDetailsApp from './container/mailbox/details/MailboxDetailsApp';
import MailboxNewApp from './container/mailbox/new/MailboxNewApp';
import MailboxesListApp from './container/mailbox/list/MailboxesListApp';
import Main from './container/global/Main';
import MeasuresListApp from './container/measures/list/MeasuresListApp';
import MeasureNewApp from './container/measures/new/MeasureNewApp';
import MeasureDetailsApp from './container/measures/details/MeasureDetailsApp';
import NotFoundedPage from './container/global/NotFoundedPage';
import OpportunitiesListApp from './container/opportunities/list/OpportunitiesListApp';
import OpportunityDetailsApp from './container/opportunities/details/OpportunityDetailsApp';
import OpportunityNewApp from './container/opportunities/new/OpportunityNewApp';
import PermissionHelper from './helpers/PermissionHelper';
import RegistrationDetailsApp from './container/registration/details/RegistrationDetailsApp';
import RegistrationNewApp from './container/registration/new/RegistrationNewApp';
import RegistrationsListApp from './container/registration/list/RegistrationsListApp';
import RequireAuth from './helpers/RequireAuth';
import TaskDetailsApp from './container/task/details/TaskDetailsApp';
import TaskNewApp from './container/task/new/TaskNewApp';
import TasksListApp from './container/task/list/TasksListApp';
import UserDetailsApp from './container/users/details/UserDetailsApp';
import UserNewApp from './container/users/new/UserNewApp';
import UsersListApp from './container/users/list/UsersListApp';

const Routes = () => {
    return (
        <Router onUpdate={() => window.scrollTo(0, 0)} history={ hashHistory }>
            <Route path="login" component={ Login } />
            <Route path="loguit" component={ Logout } />
            <Route path="/" component={ RequireAuth(Main) }>
                <IndexRoute component={ DashboardApp } />
                /* Contact */
                <Route path="contact-groep/nieuw" component={ContactGroupNewApp} />
                <Route path="contact-groepen" component={ ContactGroupsListApp } />
                <Route path="contact/nieuw/:type" component={ PermissionHelper(ContactNewApp, true) } />
                <Route path="contact/nieuw/:type/organisatie/:id" component={ PermissionHelper(ContactNewApp, true) } />
                <Route path="contact/:id" component={ ContactDetailsApp } />
                <Route path="contacten" component={ ContactsListApp } />
                /* Contacts in group */
                <Route path="contact-groep/:id" component={ContactGroupDetailsApp} />
                <Route path="contacten-in-groep/:contactGroup" component={ ContactsInGroupListApp } />
                /* Campaign */
                <Route path="campagne/nieuw" component={CampaignNewApp} />
                <Route path="campagne/:id" component={CampaignDetailsApp} />
                <Route path="campagnes" component={CampaignsListApp} />
                <Route path="contacten/:filter/:value" component={ ContactsListApp } />


                <Route path="maatregelen" component={MeasuresListApp} />
                <Route path="maatregel/nieuw" component={MeasureNewApp} />
                <Route path="maatregel/:id" component={MeasureDetailsApp} />
                /* Mailboxes */
                <Route path="mailbox/nieuw" component={MailboxNewApp} />
                <Route path="mailbox/:id" component={MailboxDetailsApp} />
                <Route path="mailboxen" component={MailboxesListApp} />
                /* Registration */
                <Route path="aanmelding/nieuw/contact/:contactId/adres/:addressId" component={RegistrationNewApp} />
                <Route path="aanmelding/:id" component={RegistrationDetailsApp} />
                <Route path="aanmeldingen" component={ RegistrationsListApp } />
                /*  User */
                <Route path="gebruiker/nieuw" component={UserNewApp} />
                <Route path="gebruiker/:id" component={UserDetailsApp} />
                <Route path="gebruikers" component={UsersListApp} />
                /* Opportunity */
                <Route path="kans/nieuw" component={OpportunityNewApp} />
                <Route path="kans/nieuw/:type/:id" component={OpportunityNewApp} />
                <Route path="kans/:id" component={OpportunityDetailsApp} />
                <Route path="kansen" component={OpportunitiesListApp} />
                /* Task */
                <Route path="taak/nieuw" component={TaskNewApp} />
                <Route path="taak/nieuw/:type/:id" component={TaskNewApp} />
                <Route path="taak/:id" component={TaskDetailsApp} />
                <Route path="taken" component={TasksListApp} />
                /* 404 route */
                <Route path="*" component={ NotFoundedPage } />
            </Route>
        </Router>
    );
};

export default Routes;
