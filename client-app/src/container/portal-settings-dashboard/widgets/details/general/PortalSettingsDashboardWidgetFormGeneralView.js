import React from 'react';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import Image from 'react-bootstrap/es/Image';
import InputTextArea from '../../../../../components/form/InputTextArea';

function getDefaultButtonTextByCodeRef(codeRef) {
    switch (codeRef) {
        case 'over-ons':
            return 'Over ons';
        case 'project-schrijf-je-in':
            return 'Inschrijven projecten';
        case 'huidige-deelnames':
            return 'Huidige deelnames';
    }
    return '**onbekend**';
}

const PortalSettingsDashboardWidgetFormGeneralView = ({
    id,
    codeRef,
    order,
    widgetImageFileName,
    title,
    active,
    text,
    buttonText,
    buttonLink,
    contactGroup,
    hideForContactGroup,
    backgroundColor,
    textColor,
    backgroundColorUsed,
    textColorUsed,
    switchToEdit,
    imageHash,
}) => {
    const imageUrl = widgetImageFileName && `${URL_API}/portal/images/${widgetImageFileName}?${imageHash}`;

    const textButtonText = () => {
        const staticWidgets = ['over-ons', 'project-schrijf-je-in', 'huidige-deelnames'];
        if (staticWidgets.includes(codeRef)) {
            console.log('variable tekst', getDefaultButtonTextByCodeRef(codeRef));
            return `Als je de naam van deze knop aanpast zal de naam in het menu (rechts boven op de gebruikers portal website) van “${getDefaultButtonTextByCodeRef(
                codeRef
            )}” ook mee veranderen.`;
        }
        return '';
    };

    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Titel'}
                            value={title}
                            divSize={'col-sm-8'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Actief'}
                            value={active ? 'Ja' : 'Nee'}
                            divSize={'col-sm-8'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label="Afbeelding (bestandstype PNG of JPG)"
                            divSize={'col-sm-8'}
                            value={widgetImageFileName}
                            className={'col-sm-8 form-group'}
                        />
                        <Image
                            src={imageUrl}
                            thumbnail={true}
                            style={{
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '1px',
                                borderRadius: '1px',
                                maxHeight: '50px',
                                width: 'auto',
                                marginLeft: '20px',
                                marginBottom: '10px',
                                boxShadow: '0 0 0 1px #fff inset',
                            }}
                        />
                    </div>

                    <div className="row">
                        {/*<div className="col-sm-4">*/}
                        {/*    <label htmlFor="text" className="col-sm-12">*/}
                        {/*        Tekst*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        {/*<div className="col-sm-8" id="text">*/}
                        {/*    {text}*/}
                        {/*</div>*/}
                        <InputTextArea
                            label={'Tekst'}
                            size={'col-sm-8'}
                            sizeLabel={'col-sm-6'}
                            sizeInput={'col-sm-6'}
                            name={'text'}
                            value={text}
                            readOnly={true}
                            className={'col-sm-8 form-group'}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Knoptekst'}
                            value={buttonText}
                            divSize={'col-sm-8'}
                            className={'col-sm-8 form-group'}
                            textToolTip={textButtonText()}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Knoplink'}
                            value={buttonLink}
                            divSize={'col-sm-8'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Zichtbaar voor groep'}
                            value={contactGroup ? contactGroup.name : 'Alle groepen'}
                            divSize={'col-sm-8'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Verborgen voor groep'}
                            value={hideForContactGroup ? hideForContactGroup.name : 'Geen'}
                            divSize={'col-sm-8'}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Widget achtergrond kleur'}
                            divSize={'col-sm-8'}
                            value={backgroundColor}
                            className={'col-sm-8 form-group'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: backgroundColor ? backgroundColor : backgroundColorUsed,
                                color: textColor ? textColor : textColorUsed,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px',
                                borderRadius: '2px',
                                width: '150px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Widget tekst
                        </span>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Widget tekst kleur'}
                            divSize={'col-sm-8'}
                            value={textColor}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsDashboardWidgetFormGeneralView;
