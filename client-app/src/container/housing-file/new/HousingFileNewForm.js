import React from 'react';

import HousingFileNewFormGeneral from './HousingFileNewFormGeneral';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const HousingFileNewForm = props => {
    return (
        <div>
            <Panel>
                <PanelBody>
                    <HousingFileNewFormGeneral contactId={props.contactId} addressId={props.addressId} />
                </PanelBody>
            </Panel>
        </div>
    );
};

export default HousingFileNewForm;
