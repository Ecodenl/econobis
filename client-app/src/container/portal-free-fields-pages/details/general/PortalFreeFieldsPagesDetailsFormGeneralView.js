import React from 'react';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const PortalFreeFieldsPagesDetailsFormGeneralView = ({ name, isActive, description, urlPageRef, switchToEdit }) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Pagina naam'} value={name} />
                        <ViewText label={'Actief'} value={isActive ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <ViewText label={'Pagina beschrijving'} value={description} />
                    </div>

                    <div className="row">
                        <ViewText
                            className={'col-md-12'}
                            label={'Portaal url: https://xxxx.mijnenergiesamen.nl/#/vrije-velden/'}
                            value={urlPageRef}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalFreeFieldsPagesDetailsFormGeneralView;
