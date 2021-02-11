import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import Image from 'react-bootstrap/es/Image';
import { FaUser } from 'react-icons/fa';

const PortalSettingsLayoutDetailsFormGeneralView = ({
    description,
    isDefault,
    portalLogoFileName,
    portalFaviconFileName,
    portalBackgroundColor,
    portalBackgroundTextColor,
    loginHeaderBackgroundColor,
    loginHeaderBackgroundTextColor,
    headerIconsColor,
    loginFieldBackgroundColor,
    loginFieldBackgroundTextColor,
    buttonColor,
    buttonTextColor,
    switchToEdit,
    imageHash,
}) => {
    const logoUrl = `${URL_API}/portal/images/${portalLogoFileName}?${imageHash}`;
    const faviconUrl = `${URL_API}/portal/${portalFaviconFileName}?${imageHash}`;

    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Omschrijving'}
                            value={description}
                            divSize={'col-sm-8'}
                            className={'col-sm-8 form-group'}
                        />
                        <ViewText
                            label={'Standaard'}
                            value={isDefault ? 'Ja' : 'Nee'}
                            divSize={'col-sm-4'}
                            className={'col-sm-4 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Logo (bestandstype PNG)'}
                            divSize={'col-sm-8'}
                            value={portalLogoFileName}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={logoUrl}
                            style={{
                                backgroundColor: loginHeaderBackgroundColor,
                                color: loginHeaderBackgroundTextColor,
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
                            label={'Favicon (bestandstype ICO)'}
                            divSize={'col-sm-8'}
                            value={portalFaviconFileName}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={faviconUrl}
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
                            label={'Login/Header - achtergrond afbeelding kleur'}
                            divSize={'col-sm-8'}
                            value={loginHeaderBackgroundColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: loginHeaderBackgroundColor,
                                color: loginHeaderBackgroundTextColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '50px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Tekst
                        </span>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Login/Header - achtergrond afbeelding tekst kleur'}
                            divSize={'col-sm-8'}
                            value={loginHeaderBackgroundTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Header - menu/poppetje kleur'}
                            divSize={'col-sm-8'}
                            value={headerIconsColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: loginHeaderBackgroundColor,
                                color: headerIconsColor,
                                textAlign: 'center',
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '4px',
                                borderRadius: '2px',
                                width: '50px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            = <FaUser />
                        </span>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Login - veld achtergrond kleur'}
                            divSize={'col-sm-8'}
                            value={loginFieldBackgroundColor}
                            className={'col-sm-8 form-group'}
                        />
                        <div
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: loginHeaderBackgroundColor,
                                display: 'inline-block',
                            }}
                        >
                            <span
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: loginFieldBackgroundColor,
                                    color: loginFieldBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Login - veld tekst kleur'}
                            divSize={'col-sm-8'}
                            value={loginFieldBackgroundTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Achtergrond kleur'}
                            divSize={'col-sm-8'}
                            value={portalBackgroundColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: portalBackgroundColor,
                                color: portalBackgroundTextColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '50px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Tekst
                        </span>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Achtergrond tekst kleur'}
                            divSize={'col-sm-8'}
                            value={portalBackgroundTextColor}
                            className={'col-sm-8 form-group'}
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
                                color: buttonTextColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '50px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Tekst
                        </span>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Buttonknop tekst kleur'}
                            divSize={'col-sm-8'}
                            value={buttonTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsLayoutDetailsFormGeneralView;
