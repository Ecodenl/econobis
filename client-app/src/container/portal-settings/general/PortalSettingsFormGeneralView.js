import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const PortalSettingsFormGeneralView = ({
    portalActive,
    portalName,
    cooperativeName,
    portalWebsite,
    portalUrl,
    responsibleUser,
    checkContactTaskResponsibleUser,
    checkContactTaskResponsibleTeam,
    contactResponsibleOwnerUser,
    emailTemplateNewAccount,
    linkPrivacyPolicy,
    showNewAtCooperativeLink,
    newAtCooperativeLinkText,
    showAllowRequestForDelete,
    allowRequestForDeleteButtonText,
    defaultContactGroupMember,
    defaultContactGroupNoMember,
    pcrPowerKwhConsumptionPercentage,
    pcrGeneratingCapacityOneSolorPanel,
    defaultAdministration,
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
                    <hr />
                    <div className="row">
                        <ViewText
                            label={'Contacten portal actief'}
                            divSize={'col-sm-8'}
                            value={portalActive ? 'Ja' : 'Nee'}
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
                            label={'Nieuwe contacten kunnen account aanmaken'}
                            divSize={'col-sm-8'}
                            value={showNewAtCooperativeLink ? 'Ja' : 'Nee'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    {showNewAtCooperativeLink ? (
                        <div className="row">
                            <ViewText
                                label={'Tekst voor het aanmaken nieuw account'}
                                divSize={'col-sm-8'}
                                value={newAtCooperativeLinkText}
                                className={'col-sm-8 form-group'}
                            />
                            {/*<span*/}
                            {/*className="rc-color-picker-trigger"*/}
                            {/*unselectable="unselectable"*/}
                            {/*style={{*/}
                            {/*backgroundColor: backgroundImageColor,*/}
                            {/*color: backgroundImageTextColor,*/}
                            {/*border: '1px solid #999',*/}
                            {/*display: 'inline-block',*/}
                            {/*padding: '2px',*/}
                            {/*borderRadius: '2px',*/}
                            {/*width: '300px',*/}
                            {/*height: 'auto',*/}
                            {/*boxShadow: '0 0 0 2px #fff inset',*/}
                            {/*}}*/}
                            {/*>*/}
                            {/*{newAtCooperativeLinkText.replace('{cooperatie_naam}', cooperativeName)}*/}
                            {/*</span>*/}
                        </div>
                    ) : null}
                    <div className="row">
                        <ViewText
                            label={'Verwijderen via portaal toestaan'}
                            divSize={'col-sm-8'}
                            value={showAllowRequestForDelete ? 'Ja' : 'Nee'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    {showAllowRequestForDelete ? (
                        <div className="row">
                            <ViewText
                                label={'Knoptekst voor verwijderen via portaal'}
                                divSize={'col-sm-8'}
                                value={allowRequestForDeleteButtonText}
                                className={'col-sm-8 form-group'}
                            />
                        </div>
                    ) : null}
                    <div className="row">
                        <ViewText
                            label={'Standaard contact groep lid worden'}
                            divSize={'col-sm-8'}
                            value={defaultContactGroupMember ? defaultContactGroupMember.name : ''}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Standaard contact groep geen lid worden'}
                            divSize={'col-sm-8'}
                            value={defaultContactGroupNoMember ? defaultContactGroupNoMember.name : ''}
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
                            label={'Advies % te dekken jaarlijks verbruik zonnepanelen'}
                            divSize={'col-sm-8'}
                            value={pcrPowerKwhConsumptionPercentage}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Opbrengstcapaciteit van 1 zonnepaneel'}
                            divSize={'col-sm-8'}
                            value={pcrGeneratingCapacityOneSolorPanel}
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
                    <div className="row">
                        <ViewText
                            label={'Standaard administratie / uitgevende instantie'}
                            divSize={'col-sm-8'}
                            value={defaultAdministration ? defaultAdministration.name : ''}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsFormGeneralView;
