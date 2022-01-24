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
    portalLogoFileNameHeader,
    portalImageBgFileNameLogin,
    portalImageBgFileNameHeader,
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
    const logoHeaderUrl = `${URL_API}/portal/images/${portalLogoFileNameHeader}?${imageHash}`;
    const imageBgLoginUrl = `${URL_API}/portal/images/${portalImageBgFileNameLogin}?${imageHash}`;
    const imageBgHeaderUrl = `${URL_API}/portal/images/${portalImageBgFileNameHeader}?${imageHash}`;
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
                            label={'Logo login (bestandstype PNG)'}
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
                            label={'Achtergrond afbeelding login (bestandstype PNG)'}
                            divSize={'col-sm-8'}
                            value={portalImageBgFileNameLogin}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={imageBgLoginUrl}
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
                            label={'Logo header (bestandstype PNG)'}
                            divSize={'col-sm-8'}
                            value={portalLogoFileNameHeader}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={logoHeaderUrl}
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
                            label={'Achtergrond afbeelding header (bestandstype PNG)'}
                            divSize={'col-sm-8'}
                            value={portalImageBgFileNameHeader}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={imageBgHeaderUrl}
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
                            label={'1. Login/Header - achtergrond afbeelding kleur'}
                            divSize={'col-sm-8'}
                            value={loginHeaderBackgroundColor}
                            className={'col-sm-8 form-group'}
                            textToolTip={`Achtergrond afbeelding werkt alleen als je hier RGBA kleurcode gebruiktkleur en daar (deels) transparantie op toepast: 0.0 (fully transparent) and 1.0 (fully opaque)<br />
                                Bijv:<br />
                                rgba(35, 150, 179, 0). Achtergrond kleur volledig transparant, dus zie je achtergrond afbeelding ook volledig.<br />
                                rgba(35, 150, 179, 1). Achtergrond kleur volledig NIET transparant, dus zie je achtergrond afbeelding helemaal niet.<br />
                                rgba(35, 150, 179, 0.5). Achtergrond kleur voor 50% transparant, dus zie je achtergrond afbeelding voor 50% door achtergrond kleur heen. Hiermee krijgt je een soort watermerk effect.`}
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
                            label={'2. Login/Header - achtergrond afbeelding tekst kleur'}
                            divSize={'col-sm-8'}
                            value={loginHeaderBackgroundTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'3. Header - menu/poppetje kleur'}
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
                            label={'4. Login - veld achtergrond kleur'}
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
                            label={'5. Login - veld tekst kleur'}
                            divSize={'col-sm-8'}
                            value={loginFieldBackgroundTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'6. Menu achtergrond / pagina header tekst kleur'}
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
                                width: '150px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Menutekst
                        </span>
                        <br />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: '#fff',
                                color: portalBackgroundColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '150px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Pagina header tekst
                        </span>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'7. Achtergrond tekst kleur'}
                            divSize={'col-sm-8'}
                            value={portalBackgroundTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'8. Buttonknop kleur'}
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
                            label={'9. Buttonknop tekst kleur'}
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
