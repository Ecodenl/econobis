import React from 'react';
import Container from 'react-bootstrap/Container';
import ContactAvailabilityDetailsPlanningPanel from "./ContactAvailabilityDetailsPlanningPanel";

export default function AvailabilityDetails() {
    return (
        <Container className={'content-section'}>
            <ContactAvailabilityDetailsPlanningPanel/>
        </Container>
    );
}
