import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

export default function ContactAvailabilityDetailsGeneralView({contact, switchToEdit}) {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Max afspraken per week'} value={contact.coachMaxAppointmentsPerWeek}/>
                        <ViewText label={'Min tijd tussen afspraken'} value={contact.coachMinMinutesBetweenAppointments + ' min'}/>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
}
