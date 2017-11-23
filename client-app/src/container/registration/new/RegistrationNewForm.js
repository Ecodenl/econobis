import React from 'react';

import RegistrationNewFormGeneral from './RegistrationNewFormGeneral';
import Panel from '../../../components/panel/Panel';
import PanelHeader from '../../../components/panel/PanelHeader';
import PanelBody from '../../../components/panel/PanelBody';

const RegistrationNewForm = props => {
        return (
            <div>
                <Panel>
                    <PanelBody>
                        <RegistrationNewFormGeneral contactId={props.contactId} />
                    </PanelBody>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Reeds genomen maatregelen</span>
                    </PanelHeader>
                </Panel>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Gewenste maatregelen</span>
                    </PanelHeader>
                </Panel>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Opmerkingen</span>
                    </PanelHeader>
                </Panel>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Afsluiting</span>
                    </PanelHeader>
                </Panel>
            </div>
        );
};

export default RegistrationNewForm;
