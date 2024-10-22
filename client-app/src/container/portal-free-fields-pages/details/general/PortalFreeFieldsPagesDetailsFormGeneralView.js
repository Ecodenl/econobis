import React from 'react';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const PortalFreeFieldsPagesDetailsFormGeneralView = ({
    name,
    isActive,
    description,
    urlPageRef,
    portalUrl,
    switchToEdit,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Pagina naam'} value={name} />
                        <ViewText label={'Actief'} value={isActive ? 'Ja' : 'Nee'} />
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="description" className="col-sm-12">
                                Pagina beschrijving
                            </label>
                        </div>
                        <div className="col-sm-9" id="description">
                            {description}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="urlPageRef" className="col-sm-12">
                                Portaal url
                            </label>
                        </div>
                        <div className="col-sm-9" id="urlPageRef">
                            {`https://${portalUrl}/#/vrije-velden/${urlPageRef}`}
                        </div>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalFreeFieldsPagesDetailsFormGeneralView;
