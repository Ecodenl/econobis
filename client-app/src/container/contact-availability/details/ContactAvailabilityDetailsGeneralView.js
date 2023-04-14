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
                        <ViewText label={'Max. aantal afspraken per week'} value={contact.coachMaxAppointmentsPerWeek}/>
                        <ViewText label={'Min. tijd tussen afspraken'} value={contact.coachMinMinutesBetweenAppointments + ' minuten'}/>
                    </div>
                    <div className="row">
                        <ViewText label={'Max. aantal afspraken per maand'} value={contact.coachMaxAppointmentsPerMonth}/>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
}
