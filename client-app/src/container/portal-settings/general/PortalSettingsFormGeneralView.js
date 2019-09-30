import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const PortalSettingsFormGeneralView = ({
    portalUrl,
    backgroundColor,
    responsibleUserId,
    documentTemplateAgreementId,
    emailTemplateAgreementId,
    switchToEdit,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Portal Url'} value={portalUrl} />
                    </div>
                    <div className="row">
                        <ViewText label={'Achtergrondkleur'} value={backgroundColor} />
                    </div>
                    <div className="row">
                        <ViewText label={'Portal log gebruiker'} value={responsibleUserId} />
                    </div>
                    <div className="row">
                        <ViewText label={'Document template'} value={documentTemplateAgreementId} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Email template'}
                            value={emailTemplateAgreementId}
                            // value={emailTemplateAgreement ? emailTemplateAgreement.name : ''}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsFormGeneralView;
