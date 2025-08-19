import React from 'react';
import ContactAvailabilityDetailsPlanningPanel from './ContactAvailabilityDetailsPlanningPanel';
import { PortalUserConsumer } from '../../context/PortalUserContext';

function AvailabilityDetails({ user }) {
    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                {user.inspectionPersonTypeId === 'coach' ? (
                    <ContactAvailabilityDetailsPlanningPanel />
                ) : null}
            </div>
        </div>
    );
}

export default function AvailabilityDetailsWithContext(props) {
    return <PortalUserConsumer>{({ user }) => <AvailabilityDetails user={user} />}</PortalUserConsumer>;
}
