import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const PortalSettingsFormGeneralView = ({
    portalName,
    cooperativeName,
    portalWebsite,
    portalUrl,
    backgroundColor,
    responsibleUserId,
    checkContactTaskResponsibleUserId,
    checkContactTaskResponsibleTeamId,
    contactResponsibleOwnerUserId,
    emailTemplateNewAccountId,
    linkPrivacyPolicy,
    switchToEdit,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Contacten portal URL'} value={portalUrl} />
                    </div>
                    {/*<div className="row">*/}
                        {/*<ViewText label={'Achtergrondkleur'} value={backgroundColor} />*/}
                    {/*</div>*/}
                    <div className="row">
                        <ViewText label={'Verantwoordelijke portal'} value={responsibleUserId} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Eigenaar nieuwe contacten'}
                            value={contactResponsibleOwnerUserId}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijk uitvoeren taak (gebruiker)'}
                            value={checkContactTaskResponsibleUserId}
                        />
                        <ViewText
                            label={'of Verantwoordelijk uitvoeren taak (team)'}
                            value={checkContactTaskResponsibleTeamId}
                        />
                    </div>
                    <div className="row">
                        <ViewText label={'Privacybeleid link'} value={linkPrivacyPolicy} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Email template Nieuwe account activeren'}
                            value={emailTemplateNewAccountId}
                        />
                    </div>
                    <div className="row">
                        <ViewText label={'Coöperatie portal naam'} value={portalName} />
                    </div>
                    <div className="row">
                        <ViewText label={'Coöperatie naam'} value={cooperativeName} />
                    </div>
                    <div className="row">
                        <ViewText label={'Coöperatie website'} value={portalWebsite} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsFormGeneralView;
