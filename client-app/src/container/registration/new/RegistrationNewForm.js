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
                        <RegistrationNewFormGeneral contactId={props.contactId} addressId={props.addressId}/>
                    </PanelBody>
                </Panel>
            </div>
        );
};

export default RegistrationNewForm;
