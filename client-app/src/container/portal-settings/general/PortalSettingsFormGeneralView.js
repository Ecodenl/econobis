import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import Image from 'react-bootstrap/es/Image';

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
    imageHash,
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
                            label={'Logo'}
                            divSize={'col-sm-8'}
                            value={'logo.png'}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={`${URL_API}/portal/images/logo.png?${imageHash}`}
                            style={{
                                backgroundColor: backgroundImageColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '1px',
                                borderRadius: '1px',
                                height: '50px',
                                boxShadow: '0 0 0 1px #fff inset',
                            }}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Favicon'}
                            divSize={'col-sm-8'}
                            value={'favicon.ico'}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={`${URL_API}/portal/favicon.ico?${imageHash}`}
                            style={{
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '1px',
                                borderRadius: '1px',
                                height: '20px',
                                boxShadow: '0 0 0 1px #fff inset',
                            }}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Achtergrond kleur'}
                            divSize={'col-sm-8'}
                            value={backgroundColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: backgroundColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '20px',
                                height: '20px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Achtergrond afbeelding kleur'}
                            divSize={'col-sm-8'}
                            value={backgroundImageColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: backgroundImageColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '20px',
                                height: '20px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Tweede achtergrond kleur'}
                            divSize={'col-sm-8'}
                            value={backgroundSecondaryColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: backgroundSecondaryColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '20px',
                                height: '20px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Buttonknop kleur'}
                            divSize={'col-sm-8'}
                            value={buttonColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: buttonColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '20px',
                                height: '20px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        />
                    </div>
                    <hr />
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
