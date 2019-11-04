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
                        <ViewText label={'Mijn cooperatie naam'} value={portalName} />
                    </div>
                    <div className="row">
                        <ViewText label={'Cooperatie naam'} value={cooperativeName} />
                    </div>
                    <div className="row">
                        <ViewText label={'Cooperatie website'} value={portalWebsite} />
                    </div>
                    <div className="row">
                        <ViewText label={'Portal Url'} value={portalUrl} />
                    </div>
                    <div className="row">
                        <ViewText label={'Privacy beleid link'} value={linkPrivacyPolicy} />
                    </div>
                    <div className="row">
                        <ViewText label={'Achtergrondkleur'} value={backgroundColor} />
                    </div>
                    <div className="row">
                        <ViewText label={'Portal log gebruiker'} value={responsibleUserId} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijke gebruiker eigenaar contact'}
                            value={contactResponsibleOwnerUserId}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijke gebruiker controle contact taak'}
                            value={checkContactTaskResponsibleUserId}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijk team controle contact taak'}
                            value={checkContactTaskResponsibleTeamId}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Email template Nieuw account bevestiging'}
                            value={emailTemplateNewAccountId}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsFormGeneralView;
