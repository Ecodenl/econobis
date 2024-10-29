import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PortalFreeFieldsFields from '../portal-free-fields-fields/PortalFreeFieldsFields';

const PortalFreeFieldsPagesDetailsFormGeneralView = ({
    id,
    name,
    isActive,
    description,
    urlPageRef,
    portalUrl,
    portalFreeFieldsFields,
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
                        <div className="col-sm-9" id="description" style={{ whiteSpace: 'break-spaces' }}>
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
            <PortalFreeFieldsFields pageId={id} portalFreeFieldsFields={portalFreeFieldsFields} showEditPage={false} />
        </div>
    );
};

export default PortalFreeFieldsPagesDetailsFormGeneralView;
