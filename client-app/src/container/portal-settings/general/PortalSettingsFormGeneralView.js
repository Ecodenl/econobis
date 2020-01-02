import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const PortalSettingsFormGeneralView = ({
    portalName,
    cooperativeName,
    portalWebsite,
    portalUrl,
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
                        <ViewText
                            label={'Contacten portal URL'}
                            divSize={'col-sm-8'}
                            value={portalUrl}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijke portal'}
                            divSize={'col-sm-8'}
                            value={responsibleUser ? responsibleUser.fullName : ''}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Eigenaar nieuwe contacten'}
                            divSize={'col-sm-8'}
                            value={contactResponsibleOwnerUser ? contactResponsibleOwnerUser.fullName : ''}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verantwoordelijke uitvoeren taak'}
                            divSize={'col-sm-8'}
                            value={
                                checkContactTaskResponsibleUser
                                    ? checkContactTaskResponsibleUser.fullName
                                    : checkContactTaskResponsibleTeam
                                    ? checkContactTaskResponsibleTeam.name
                                    : ''
                            }
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Nieuw bij, aanmelden mogelijk'}
                            divSize={'col-sm-8'}
                            value={showNewAtCooperativeLink ? 'Ja' : 'Nee'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Privacybeleid link'}
                            divSize={'col-sm-8'}
                            value={linkPrivacyPolicy}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Email template Nieuwe account activeren'}
                            divSize={'col-sm-8'}
                            value={emailTemplateNewAccount ? emailTemplateNewAccount.name : ''}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Coöperatie portal naam'}
                            divSize={'col-sm-8'}
                            value={portalName}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Coöperatie naam'}
                            divSize={'col-sm-8'}
                            value={cooperativeName}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Coöperatie website'}
                            divSize={'col-sm-8'}
                            value={portalWebsite}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsFormGeneralView;
