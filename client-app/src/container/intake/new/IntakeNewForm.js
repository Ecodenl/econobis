import React from 'react';

import IntakeNewFormGeneral from './IntakeNewFormGeneral';
import Panel from '../../../components/panel/Panel';
import PanelHeader from '../../../components/panel/PanelHeader';
import PanelBody from '../../../components/panel/PanelBody';

const IntakeNewForm = props => {
        return (
            <div>
                <Panel>
                    <PanelBody>
                        <IntakeNewFormGeneral contactId={props.contactId} addressId={props.addressId}/>
                    </PanelBody>
                </Panel>
            </div>
        );
};

export default IntakeNewForm;
