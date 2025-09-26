import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const SourceDetailsFormGeneralView = ({ name, nameCustom, visible, switchToEdit }) => {
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
                    <div className="row">
                        <ViewText label={'Zichtbaar'} value={visible ? 'Ja' : 'Nee'} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default SourceDetailsFormGeneralView;
