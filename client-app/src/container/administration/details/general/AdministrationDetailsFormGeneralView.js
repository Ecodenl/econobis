import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import Image from 'react-bootstrap/es/Image';
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
        prefixInvoiceNumber,
        usesVat,
        emailBccNotas,
        portalSettingsLayout,
        usesMollie,
        mollieApiKey,
    } = props.administrationDetails;
    const { logoFilenameSrc } = props.administrationLogoDetails;

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
                        <div className="col-sm-6">
                            <label className="col-sm-6"></label>
                            <div className="col-sm-6">
                                <Image
                                    src={logoFilenameSrc}
                                    style={{
                                        border: '1px solid #999',
                                        display: 'inline-block',
                                        padding: '1px',
                                        borderRadius: '1px',
                                        height: '50px',
                                        boxShadow: '0 0 0 1px #fff inset',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Portal instellingen layout'}
                            value={portalSettingsLayout ? portalSettingsLayout.description : 'gebruikt standaard'}
                        />
                        <ViewText label={'Gebruikt BTW'} value={usesVat ? 'Ja' : 'Nee'} hidden={true} />
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
                                    label={
                                        <span>
                                            Synchroniseer contacten vanaf
                                            <br />
                                            <small style={{ color: '#ccc', fontWeight: 'normal' }}>
                                                Nota aanmaakdatum vanaf wanneer contacten initieel gemaakt worden in
                                                Twinfield
                                            </small>
                                        </span>
                                    }
                                    value={
                                        dateSyncTwinfieldContacts ? moment(dateSyncTwinfieldContacts).format('L') : ''
                                    }
                                />
                                <ViewText
                                    label={
                                        <span>
                                            Synchroniseer betalingen vanaf
                                            <br />
                                            <small style={{ color: '#ccc', fontWeight: 'normal' }}>
                                                Nota aanmaakdatum vanaf wanneer betalingen opgehaald worden uit
                                                Twinfield
                                            </small>
                                        </span>
                                    }
                                    value={
                                        dateSyncTwinfieldPayments ? moment(dateSyncTwinfieldPayments).format('L') : ''
                                    }
                                />
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
