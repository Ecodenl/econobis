import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const PortalSettingsFormGeneralView = ({
    portalName,
    portalWebsite,
    portalUrl,
    backgroundColor,
    responsibleUserId,
    checkContactTaskResponsibleUserId,
    documentTemplateAgreementId,
    emailTemplateAgreementId,
    emailTemplateNewAccountId,
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
                        <ViewText label={'Cooperatie naam'} value={portalName} />
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
                        <ViewText
                            label={'Verantwoordelijk gebruiker controle contact taak'}
                            value={checkContactTaskResponsibleUserId}
                        />
                    </div>
                    <div className="row">
                        <ViewText label={'Document template'} value={documentTemplateAgreementId} />
                    </div>
                    <div className="row">
                        <ViewText label={'Email template Inschrijvingsbevestiging'} value={emailTemplateAgreementId} />
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
