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
    linkPrivacyPolicy,
    linkAgreeTerms,
    linkUnderstandInfo,
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
                        <ViewText label={'Privacy beleid link'} value={linkPrivacyPolicy} />
                    </div>
                    <div className="row">
                        <ViewText label={'Voorwaarden link'} value={linkAgreeTerms} />
                    </div>
                    <div className="row">
                        <ViewText label={'Projectinformatie link'} value={linkUnderstandInfo} />
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
