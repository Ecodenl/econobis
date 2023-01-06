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
                        <ViewText label={'Standaard duur afspraak'} value="90 minuten"/>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
}
