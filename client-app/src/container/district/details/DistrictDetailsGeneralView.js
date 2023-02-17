import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

export default function DistrictDetailsGeneralView({district, switchToEdit}) {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Weergavenaam'} value={district.name}/>
                        <ViewText label={'Standaard duur afspraak'} value={district.defaultDurationMinutes + ' minuten'}/>
                    </div>
                    <div className="row">
                        <ViewText label={'Verstuur automatisch e-mail aan bewoner bij maken afspraak'} value={district.sendEmailToContactWhenPlanned ? 'Ja' : 'Nee'}/>
                        <ViewText label={'E-mail template'} value={district.emailToContactTemplate?.name}/>
                    </div>
                    <div className="row">
                        <ViewText label={'Verstuur automatisch e-mail aan coach bij maken afspraak'} value={district.sendEmailToCoachWhenPlanned ? 'Ja' : 'Nee'}/>
                        <ViewText label={'E-mail template'} value={district.emailToCoachTemplate?.name}/>
                    </div>
                    <div className="row">
                        <ViewText label={'Gesloten'} value={district.closed ? 'Ja' : 'Nee'}/>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
}
