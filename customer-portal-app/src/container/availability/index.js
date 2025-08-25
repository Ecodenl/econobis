import React from 'react';
import ContactAvailabilityDetailsPlanningPanel from './ContactAvailabilityDetailsPlanningPanel';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import ErrorUnauthorized from '../../components/general/ErrorUnauthorized';

function AvailabilityDetails({ user }) {
    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                {user.inspectionPersonTypeId === 'coach' ? (
                    <ContactAvailabilityDetailsPlanningPanel />
                ) : (
                    <ErrorUnauthorized />
                )}
            </div>
        </div>
    );
}

export default function AvailabilityDetailsWithContext(props) {
    return <PortalUserConsumer>{({ user }) => <AvailabilityDetails user={user} />}</PortalUserConsumer>;
}
