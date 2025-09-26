import React from 'react';
import { getApiUrl } from '../../../../api/utils/ApiUrl';

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
    useTransparentBackgroundLogin,
    portalImageBgFileNameLogin,
    useTransparentBackgroundHeader,
    portalImageBgFileNameHeader,
    portalFaviconFileName,
    portalMainBackgroundColor,
    portalMainTextColor,
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
    const logoUrl = `${getApiUrl()}/portal/images/${portalLogoFileName}?${imageHash}`;
    const logoHeaderUrl = `${getApiUrl()}/portal/images/${portalLogoFileNameHeader}?${imageHash}`;
    const imageBgLoginUrl = `${getApiUrl()}/portal/images/${portalImageBgFileNameLogin}?${imageHash}`;
    const imageBgHeaderUrl = `${getApiUrl()}/portal/images/${portalImageBgFileNameHeader}?${imageHash}`;
    const faviconUrl = `${getApiUrl()}/portal/${portalFaviconFileName}?${imageHash}`;

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
                    <div className="col-md-12">
                        <h4>Afbeeldingen</h4>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'A. Logo op de login pagina (bestandstype PNG)'}
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
                                maxHeight: '50px',
                                width: 'auto',
                                marginBottom: '10px',
                                boxShadow: '0 0 0 1px #fff inset',
                            }}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'B. Achtergrond afbeelding login pagina (bestandstype PNG)'}
                            divSize={'col-sm-8'}
                            value={useTransparentBackgroundLogin ? 'Geen' : portalImageBgFileNameLogin}
                            className={'col-sm-8 form-group'}
                            textToolTip={`Om afbeelding zichtbaar te maken moet de achtergrond deels transparant zijn, zie 1. Login pagina / Header kleur voor meer informatie.`}
                        />
                        {!useTransparentBackgroundLogin && (
                            <Image
                                src={imageBgLoginUrl}
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: loginHeaderBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    maxHeight: '50px',
                                    width: 'auto',
                                    marginBottom: '10px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        )}
                    </div>
                    <div className="row">
                        <ViewText
                            label={'C. Logo in de header (bestandstype PNG)'}
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
                                width: 'auto',
                                marginBottom: '10px',
                                boxShadow: '0 0 0 1px #fff inset',
                            }}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'D. Achtergrond afbeelding in de header (bestandstype PNG)'}
                            divSize={'col-sm-8'}
                            value={useTransparentBackgroundHeader ? 'Geen' : portalImageBgFileNameHeader}
                            className={'col-sm-8 form-group'}
                            textToolTip={`Om afbeelding zichtbaar te maken moet de achtergrond deels transparant zijn, zie 1. Login pagina / Header kleur voor meer informatie.`}
                        />
                        {!useTransparentBackgroundHeader && (
                            <Image
                                src={imageBgHeaderUrl}
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: loginHeaderBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    maxHeight: '50px',
                                    width: 'auto',
                                    marginBottom: '10px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        )}
                    </div>
                    <div className="row">
                        <ViewText
                            label={'E. Favicon in tabblad browser (bestandstype ICO)'}
                            divSize={'col-sm-8'}
                            value={portalFaviconFileName}
                            className={'col-sm-8 form-group'}
                            textToolTip={`Een favicon is het icoontje dat je ziet in de tabbladen van je browser. Vaak is de favicon het logo van het bedrijf waarvan je de website bezoekt.`}
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
                    <div className="col-md-12">
                        <h4>Kleur</h4>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'1. Login pagina/ header kleur'}
                            divSize={'col-sm-8'}
                            value={loginHeaderBackgroundColor}
                            className={'col-sm-8 form-group'}
                            textToolTip={`Achtergrond afbeelding werkt alleen als je hier RGBA kleurcode gebruiktkleur en daar (deels) transparantie op toepast: 0.0 (fully transparent) and 1.0 (fully opaque)<br />
                                Bijv:<br />
                                rgba(35, 150, 179, 0). Achtergrond kleur volledig transparant, dus zie je achtergrond afbeelding ook volledig.<br />
                                rgba(35, 150, 179, 1). Achtergrond kleur volledig NIET transparant, dus zie je achtergrond afbeelding helemaal niet.<br />
                                rgba(35, 150, 179, 0.5). Achtergrond kleur voor 50% transparant, dus zie je achtergrond afbeelding voor 50% door achtergrond kleur heen. Hiermee krijgt je een soort watermerk effect.<br />
                                LETOP: Als je de colorpicker hier gebruikt dan wordt kleur vervangen door HEX waarde i.p.v. rgba waarde en vervalt de transparantie en zie je achtergornd afbeelding dus ook niet meer.`}
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
                            label={'2. Login pagina/ header tekst kleur'}
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
                            label={'4. Login pagina tekstveld achtergrond kleur'}
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
                            label={'5. Login pagina tekstveld tekst kleur'}
                            divSize={'col-sm-8'}
                            value={loginFieldBackgroundTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'6. Menu achtergrond kleur / welkomsttitel tekst kleur'}
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
                                backgroundColor: '#ffffff',
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
                            label={'7. Menu achtergrond tekst kleur'}
                            divSize={'col-sm-8'}
                            value={portalBackgroundTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'8. Buttonknop / Profielcirkel kleur'}
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
                            label={'9. Buttonknop / Profielcirkel tekst kleur'}
                            divSize={'col-sm-8'}
                            value={buttonTextColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'10. Algemene achtergrond kleur'}
                            divSize={'col-sm-8'}
                            value={portalMainBackgroundColor}
                            className={'col-sm-8 form-group'}
                            textToolTip={`Let op: geen donkere achtergrond kleur kiezen dan wordt zwarte tekst slecht leesbaar.`}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: portalMainBackgroundColor,
                                color: portalMainTextColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '150px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Algemene tekst
                        </span>
                    </div>
                    {/*<div className="row">*/}
                    {/*    <ViewText*/}
                    {/*        label={'11. Algemene tekst kleur'}*/}
                    {/*        divSize={'col-sm-8'}*/}
                    {/*        value={portalMainTextColor}*/}
                    {/*        className={'col-sm-8 form-group'}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsLayoutDetailsFormGeneralView;
