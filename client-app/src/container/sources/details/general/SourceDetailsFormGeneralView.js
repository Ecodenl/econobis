import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const SourceDetailsFormGeneralView = ({ name, nameCustom, switchToEdit }) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Naam'} value={name} />
                    </div>
                    <div className="row">
                        <ViewText label={'Aangepaste naam'} value={nameCustom} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default SourceDetailsFormGeneralView;
