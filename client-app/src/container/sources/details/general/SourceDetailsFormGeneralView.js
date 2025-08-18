import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const SourceDetailsFormGeneralView = ({ name, switchToEdit }) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Naam'} value={name} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default SourceDetailsFormGeneralView;
