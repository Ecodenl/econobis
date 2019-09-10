import React, { useState, useEffect } from 'react';
import PortalUserAPI from '../../api/portal-user/PortalUserAPI';
import { UserConsumer } from '../../context/UserContext';
import DefaultContactView from '../contact/DefaultContactView';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import LoadingView from '../../components/general/LoadingView';

const AccountInfo = function(props) {
    const [portalUserData, setPortalUserData] = useState({});
    const [contact, setContact] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (function callFetchPortalUserDetails() {
            setLoading(true);
            PortalUserAPI.fetchPortalUserDetails()
                .then(payload => {
                    setPortalUserData(payload.data.data);
                    props.updateUser(payload.data.data);
                    // callFetchContact(payload.data.data.id);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, []);

    useEffect(() => {
        if (props.inControlContact.id) {
            callFetchContact(props.inControlContact.id);
        }

        function callFetchContact(id) {
            setLoading(true);
            ContactAPI.fetchContact(id)
                .then(payload => {
                    const contactData = rebaseContact(payload.data.data);

                    setContact(contactData);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        }
    }, [props.inControlContact]);

    return (
        <div className="content-section">
            {isLoading ? (
                <LoadingView />
            ) : (
                <div className="content-container w-container">
                    <h1 className="content-heading">Contactgegevens</h1>
                    <div className="w-form" />
                    <DefaultContactView initialContact={contact} />
                </div>
            )}
        </div>
    );
};
export default function AccountInfoWithContext(props) {
    return (
        <UserConsumer>
            {({ updateUser, inControlContact }) => (
                <AccountInfo {...props} updateUser={updateUser} inControlContact={inControlContact} />
            )}
        </UserConsumer>
    );
}
