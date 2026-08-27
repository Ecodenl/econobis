import React from 'react';
import ContactAvailabilityDetailsPlanningPanel from './ContactAvailabilityDetailsPlanningPanel';
import { PortalUserConsumer } from '../../context/PortalUserContext';
// import ErrorUnauthorized from '../../components/general/ErrorUnauthorized';
import ErrorPage from '../../components/general/ErrorPage';

function AvailabilityDetails({ user }) {
    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                {user.inspectionPersonTypeId === 'coach' ? (
                    <ContactAvailabilityDetailsPlanningPanel />
                ) : (
                    <ErrorPage message={'Geen toegang'} />
                )}
            </div>
        </div>
    );
}

export default function AvailabilityDetailsWithContext(props) {
    return <PortalUserConsumer>{({ user }) => <AvailabilityDetails user={user} />}</PortalUserConsumer>;
}
