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
    backgroundImageColor,
    backgroundSecondaryColor,
    buttonColor,
    responsibleUser,
    checkContactTaskResponsibleUser,
    checkContactTaskResponsibleTeam,
    checkContactTaskResponsible,
    contactResponsibleOwnerUser,
    emailTemplateNewAccount,
    linkPrivacyPolicy,
    showNewAtCooperativeLink,
    switchToEdit,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Contacten portal URL'} value={portalUrl} />
                    </div>
                    <div className="row">
                        <ViewText label={'Logo'} value={'logo.png'} />
                    </div>
                    <div className="row">
                        <ViewText label={'Achtergrond kleur'} value={backgroundColor} />
                    </div>
                    <div className="row">
                        <ViewText label={'Achtergrond afbeelding kleur'} value={backgroundImageColor} />
                    </div>
                    <div className="row">
                        <ViewText label={'Tweede achtergrond kleur'} value={backgroundSecondaryColor} />
                    </div>
                    <div className="row">
                        <ViewText label={'Buttonknop kleur'} value={buttonColor} />
                    </div>

                    <hr />

                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijke portal'}
                            value={responsibleUser ? responsibleUser.fullName : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Eigenaar nieuwe contacten'}
                            value={contactResponsibleOwnerUser ? contactResponsibleOwnerUser.fullName : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijke uitvoeren taak'}
                            value={
                                checkContactTaskResponsibleUser
                                    ? checkContactTaskResponsibleUser.fullName
                                    : checkContactTaskResponsibleTeam
                                    ? checkContactTaskResponsibleTeam.name
                                    : ''
                            }
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Nieuw bij, aanmelden mogelijk'}
                            value={showNewAtCooperativeLink ? 'Ja' : 'Nee'}
                        />
                    </div>
                    <div className="row">
                        <ViewText label={'Privacybeleid link'} value={linkPrivacyPolicy} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Email template Nieuwe account activeren'}
                            value={emailTemplateNewAccount ? emailTemplateNewAccount.name : ''}
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
