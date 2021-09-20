import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import moment from 'moment';

const AdministrationDetailsFormGeneralView = props => {
    const {
        name,
        administrationCode,
        address,
        postalCode,
        emailTemplateCollection,
        emailTemplateTransfer,
        emailTemplateReminder,
        emailTemplateExhortation,
        emailTemplateFinancialOverview,
        city,
        country,
        kvkNumber,
        btwNumber,
        IBAN,
        ibanAttn,
        email,
        website,
        bic,
        sepaContractName,
        sepaCreditorId,
        rsinNumber,
        defaultPaymentTerm,
        numberOfInvoiceReminders,
        logoName,
        mailboxEmail,
        usesTwinfield,
        twinfieldConnectionType,
        twinfieldConnectionTypeWithIdAndName,
        twinfieldHasRefreshToken,
        twinfieldRedirectUri,
        twinfieldUsername,
        twinfieldClientId,
        twinfieldClientSecret,
        twinfieldOrganizationCode,
        twinfieldOfficeCode,
        dateSyncTwinfieldContacts,
        dateSyncTwinfieldPayments,
        dateSyncTwinfieldInvoices,
        pendingInvoicesPresent,
        oldestUnpaidInvoiceDate,
        prefixInvoiceNumber,
        usesVat,
        emailBccNotas,
        portalSettingsLayout,
        usesMollie,
        mollieApiKey,
    } = props.administrationDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Naam'} value={name} />
                        <ViewText label={'Administratie code'} value={administrationCode ? administrationCode : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'Adres'} value={address ? address : ''} />
                        <ViewText label={'Postcode'} value={postalCode ? postalCode : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'Plaats'} value={city ? city : ''} />
                        <ViewText label={'Land'} value={country ? country.name : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'KvK'} value={kvkNumber ? kvkNumber : ''} />
                        <ViewText label={'BTW nummer'} value={btwNumber ? btwNumber : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'IBAN'} value={IBAN ? IBAN : ''} />
                        <ViewText label={'IBAN t.n.v.'} value={ibanAttn ? ibanAttn : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'Website'} value={website ? website : ''} />
                        <ViewText label={'Bic'} value={bic ? bic : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'Sepa contractnaam'} value={sepaContractName ? sepaContractName : ''} />
                        <ViewText label={'Sepa crediteur id'} value={sepaCreditorId ? sepaCreditorId : ''} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'E-mail template nota incasso'}
                            value={emailTemplateCollection ? emailTemplateCollection.name : ''}
                        />
                        <ViewText label={'E-mail'} value={email ? email : ''} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'E-mail template nota overboeken'}
                            value={emailTemplateTransfer ? emailTemplateTransfer.name : ''}
                        />
                        <ViewText label={'RSIN nummer'} value={rsinNumber ? rsinNumber : ''} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'E-mail template herinnering'}
                            value={emailTemplateReminder ? emailTemplateReminder.name : ''}
                        />
                        <ViewText
                            label={'Standaard betalingstermijn(dagen)'}
                            value={defaultPaymentTerm ? defaultPaymentTerm : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'E-mail template aanmaning'}
                            value={emailTemplateExhortation ? emailTemplateExhortation.name : ''}
                        />
                        <ViewText
                            label={'Aantal keer herinneringen nota'}
                            value={
                                numberOfInvoiceReminders === 1
                                    ? '1x'
                                    : numberOfInvoiceReminders === 2
                                    ? '2x'
                                    : numberOfInvoiceReminders === 3
                                    ? '3x'
                                    : ''
                            }
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'E-mail template waardestaat'}
                            value={emailTemplateFinancialOverview ? emailTemplateFinancialOverview.name : ''}
                        />
                        <ViewText label={'Prefix nota nummer'} value={prefixInvoiceNumber} />
                    </div>
                    <div className="row">
                        <ViewText label={"Afzender van Rapportages en nota's is e-mail adres"} value={mailboxEmail} />
                        <ViewText label={'Logo'} value={logoName} />
                    </div>

                    <div className="row">
                        <ViewText label={"Nota's ook mailen in BCC naar"} value={emailBccNotas ? emailBccNotas : ''} />
                        <ViewText label={'Gebruikt BTW'} value={usesVat ? 'Ja' : 'Nee'} hidden={true} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Portal instellingen layout'}
                            value={portalSettingsLayout ? portalSettingsLayout.description : 'gebruikt standaard'}
                        />
                    </div>

                    <div className="row">
                        <ViewText label={'Gebruikt Mollie'} value={usesMollie ? 'Ja' : 'Nee'} />
                        {(props.meDetails.email === 'support@econobis.nl' ||
                            props.meDetails.email === 'software@xaris.nl') &&
                            usesMollie && <ViewText label={'Mollie API key'} value={mollieApiKey} />}
                    </div>

                    {usesTwinfield == true && (
                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Twinfield</span>
                            </div>
                        </div>
                    )}

                    <div className="row">
                        <ViewText label={'Gebruikt Twinfield'} value={usesTwinfield ? 'Ja' : 'Nee'} />
                        {usesTwinfield == true && (
                            <ViewText
                                label={'API connection type'}
                                value={
                                    twinfieldConnectionTypeWithIdAndName
                                        ? twinfieldConnectionTypeWithIdAndName.name
                                        : ''
                                }
                            />
                        )}
                    </div>

                    {usesTwinfield == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText label={'Omgeving'} value={twinfieldOrganizationCode} />
                                <ViewText label={'Code'} value={twinfieldOfficeCode} />
                            </div>

                            {twinfieldConnectionType === 'webservice' && (
                                <div className="row">
                                    <ViewText label={'Gebruikersnaam'} value={twinfieldUsername} />
                                    <ViewText label={'Wachtwoord'} value="**********" />
                                </div>
                            )}

                            {twinfieldConnectionType === 'openid' && (
                                <React.Fragment>
                                    <div className="row">
                                        <ViewText label={'Client Id'} value={twinfieldClientId} />
                                        <ViewText label={'Client Secret'} value="**********" />
                                    </div>

                                    <div className="row">
                                        <ViewText label={'Heeft refresh token?'} value={twinfieldHasRefreshToken} />
                                        {twinfieldHasRefreshToken === 'Nee' && (
                                            <ViewText
                                                className={'col-sm-6 form-group'}
                                                label="Haal nieuwe refresh token op"
                                                name={'twinfieldRedirectUri'}
                                                value={
                                                    <span>
                                                        <a
                                                            href={
                                                                twinfieldRedirectUri +
                                                                '?administrationId=' +
                                                                props.administrationDetails.id
                                                            }
                                                            className={'link-underline'}
                                                        >
                                                            {twinfieldRedirectUri}
                                                        </a>
                                                    </span>
                                                }
                                            />
                                        )}
                                    </div>
                                </React.Fragment>
                            )}

                            <div className="row">
                                <ViewText
                                    label={'Synchroniseer contacten vanaf'}
                                    value={
                                        dateSyncTwinfieldContacts ? moment(dateSyncTwinfieldContacts).format('L') : ''
                                    }
                                />
                                <div className="col-sm-6 form-group">
                                    <small style={{ fontWeight: 'normal' }}>
                                        Nota (verzend)datum vanaf wanneer contacten initieel gemaakt worden in
                                        Twinfield. Indien gebruik Twinfield aangezet wordt en contacten van verzonden of
                                        betaalde nota's die (nog) niet gesynchroniseerd zijn met Twinfield en die nog
                                        niet eerder aangemaakt zijn in Twinfield zullen worden aangemaakt bij Opslaan.
                                        <br />
                                        Laat datum leeg als je geen contacten initieel wil aanmaken in Twinfield.
                                    </small>
                                </div>
                            </div>
                            <div className="row">
                                <ViewText
                                    label={"Nota's in behandeling"}
                                    value={pendingInvoicesPresent ? 'Ja' : 'Nee'}
                                />
                                <div className="col-sm-6 form-group">
                                    <small style={{ fontWeight: 'normal' }}>
                                        Nota's in behandeling zijn nota's met status 'Wordt definitief gemaakt', 'Fout
                                        bij maken', 'Wordt verstuurd', 'Opnieuw te verzenden' of 'Wordt opnieuw
                                        verstuurd'. Zolang er nota's in behandeling zijn kunnen de datums hieronder
                                        (Synchroniseer nota's vanaf en Synchroniseer betalingen vanaf) niet gewijzigd
                                        worden.
                                    </small>
                                </div>
                            </div>
                            <div className="row">
                                <ViewText
                                    label={"Synchroniseer nota's vanaf"}
                                    value={
                                        dateSyncTwinfieldInvoices ? moment(dateSyncTwinfieldInvoices).format('L') : ''
                                    }
                                />
                                <div className="col-sm-6 form-group">
                                    <small style={{ fontWeight: 'normal' }}>
                                        Nota (verzend)datum vanaf wanneer nota's gesynchroniseerd moeten worden naar
                                        Twinfield. Nota's voor deze datum die niet naar Twinfield zijn gesynchroniseerd
                                        zullen handmatig in Econobis op betaald gezet moeten worden. Over het algemeen
                                        zet je hier de datum waarop je wilt gaan starten met Twinfield.
                                        <br />
                                        Laat datum leeg als je alle nota's wilt synchroniseren.
                                    </small>
                                </div>
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Oudste nota datum met status niet betaald  '}
                                    value={oldestUnpaidInvoiceDate ? moment(oldestUnpaidInvoiceDate).format('L') : ''}
                                />
                                <div className="col-sm-6 form-group">
                                    <small style={{ fontWeight: 'normal' }}>
                                        Je kan de datum 'Synchroniseer betalingen vanaf'(zie hieronder) niet instellen
                                        op een datum na de oudste nota (verzend)datum met status niet betaald.
                                    </small>
                                </div>
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Synchroniseer betalingen vanaf'}
                                    value={
                                        dateSyncTwinfieldPayments ? moment(dateSyncTwinfieldPayments).format('L') : ''
                                    }
                                />
                                <div className="col-sm-6 form-group">
                                    <small style={{ fontWeight: 'normal' }}>
                                        Nota (verzend)datum vanaf wanneer betalingen gesynchroniseerd moeten worden uit
                                        Twinfield. Datum 'Synchroniseer betalingen vanaf' moet voor oudste nota datum
                                        (zie hierboven) met status niet betaald liggen.
                                        <br />
                                        Deze datum wordt gebruikt bij de procedure Synchroniseren betalingen die elke
                                        nacht automatisch draait.
                                        <br />
                                        Laat datum leeg als je betalingen van alle nota's wilt synchroniseren.
                                    </small>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        administrationDetails: state.administrationDetails,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsFormGeneralView);
