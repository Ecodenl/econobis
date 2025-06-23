import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ViewText from '../../../components/form/ViewText';
import PanelHeader from '../../../components/panel/PanelHeader';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import HoomCampaigns from './hoom-campaigns/HoomCampaigns';

function CooperationDetailsFormView({ formData, toggleEdit, meDetails }) {
    return (
        <section className={'panel-hover'} onClick={toggleEdit}>
            {formData.createContactsForReportTableInProgress == true && (
                <Panel>
                    <PanelHeader>
                        <span className="h5" style={{ color: '#e64a4a' }}>
                            Contactgroep/contact koppelingen report tabel wordt momenteel bijgewerkt…
                        </span>
                    </PanelHeader>
                </Panel>
            )}
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Naam'} value={formData.name} />
                        <ViewText label={'KvK'} value={formData.kvkNumber} />
                    </div>
                    <div className="row">
                        <ViewText label={'Adres'} value={formData.address} />
                        <ViewText label={'Btw nummer'} value={formData.btwNumber} />
                    </div>
                    <div className="row">
                        <ViewText label={'Postcode'} value={formData.postalCode} />
                        <ViewText label={'IBAN'} value={formData.iban} />
                    </div>
                    <div className="row">
                        <ViewText label={'Plaats'} value={formData.city} />
                        <ViewText label={'IBAN t.n.v.'} value={formData.ibanAttn} />
                    </div>
                    <div className="row">
                        <ViewText label={'Email'} value={formData.email} />
                        <ViewText label={'Website'} value={formData.website} />
                    </div>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Hoom gegevens</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Hoom link'} value={formData.hoomLink} />
                        <ViewText label={'Hoom key'} value={formData.hoomKey} />
                    </div>
                    <div className="row">
                        <ViewText label={'Hoom bewoner/coach link'} value={formData.hoomConnectCoachLink} />
                        <ViewText label={'Hoom groep'} value={formData.hoomGroup && formData.hoomGroup.name} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Hoom e-mail template'}
                            value={formData.hoomEmailTemplate && formData.hoomEmailTemplate.name}
                        />

                        <ViewText label={'Hoom mailbox'} value={formData.hoomMailbox && formData.hoomMailbox.name} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Stuurt e-mail bij nieuw Hoomdossier'}
                            value={formData.sendEmail ? 'Ja' : 'Nee'}
                        />
                    </div>
                    <HoomCampaigns
                        cooperationId={formData.id}
                        showEditCooperation={false}
                        hoomCampaigns={formData.hoomCampaigns}
                    />
                </PanelBody>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Laposta gegevens</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Gebruik Laposta'} value={formData.useLaposta ? 'Ja' : 'Nee'} />
                        <ViewText label={'Laposta key'} value={formData.lapostaKey} />
                    </div>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Twee factor authenticatie</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Verplichten voor alle gebruikers'}
                            value={formData.requireTwoFactorAuthentication ? 'Ja' : 'Nee'}
                            size={'col-sm-5'}
                            textToolTip="Je kan voor individuele gebruikers 2 factor authenticatie afdwingen via instellingen > gebruikers"
                        />
                    </div>
                </PanelBody>
            </Panel>
            {(meDetails.email === 'support@econobis.nl' || meDetails.email === 'software@xaris.nl') && (
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Contactgroep/contact koppelingen </span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <ViewText
                                label={'Vullen report tabel (tbv Power BI)'}
                                value={formData.createContactsForReportTable ? 'Ja' : 'Nee'}
                                size={'col-sm-5'}
                                name={'createContactsForReportTable'}
                                textToolTip={`Hiermee wordt er een tabel gevuld met alle contactgroep/contact koppelingen tbv Power BI.`}
                            />
                            {formData.createContactsForReportTable == true && (
                                <ViewText
                                    label={'Email bij problemen vullen report tabel'}
                                    value={formData.emailReportTableProblems}
                                />
                            )}
                            {formData.createContactsForReportTable == true && (
                                <ViewText
                                    label={'Datum laatste keer gevuld'}
                                    value={
                                        formData.createContactsForReportTableLastCreated
                                            ? moment(formData.createContactsForReportTableLastCreated).format('L')
                                            : ''
                                    }
                                />
                            )}
                        </div>
                    </PanelBody>
                </Panel>
            )}
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">E-mail opmaak</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Lettertype'} value={formData.fontFamilyDefault} />
                        <ViewText label={'Lettergrootte'} value={formData.fontSizeDefault} />
                    </div>
                    <div className="row">
                        <ViewText label={'Letterkleur'} value={formData.fontColorDefault} />
                    </div>
                </PanelBody>
            </Panel>

            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Items opschonen</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Nota’s - Datum verstuurd'} value={formData.cleanupYearsInvoicesDateSend + ' jaar'} />
                        <ViewText label={'Eenmalige orders - Ingangsdatum'} value={formData.cleanupYearsOneoffOrdersStartDate + ' jaar'} />
                    </div>
                    <div className="row">
                        <ViewText label={'Periodieke orders - Beëindigingsdatum'} value={formData.cleanupYearsPeriodicOrdersTerminationDate + ' jaar'} />
                        <ViewText label={'Intakes – Mutatiedatum'} value={formData.cleanupYearsIntakesMutationDate + ' jaar'} />
                    </div>
                    <div className="row">
                        <ViewText label={'Kansen – Mutatiedatum'} value={formData.cleanupYearsOpportunitiesMutationDate + ' jaar'} />
                        <ViewText label={'Deelnames met status Interesse, Ingeschreven of toegekend – Mutatiedatum'} value={formData.cleanupYearsParticipationsChangeDate + ' jaar'} />
                    </div>
                    <div className="row">
                        <ViewText label={'Deelnames met status Beëindigd – Beëindigingsdatum'} value={formData.cleanupYearsParticipationsTerminationDate + ' jaar'} />
                    </div>
                </PanelBody>
            </Panel>

            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">E-mail opschonen</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Wil je de e-mailcorrespondentie van contacten die geen order, nota, deelname, intake of kans hebben naar de e-mailarchief map verplaatsen?'} value={formData.cleanupEmail ? 'Ja' : 'Nee'} />
                    </div>
                    {formData.cleanupEmail == true && (
                        <div className="row">
                            <ViewText label={'Verplaats binnengekomen e-mailcorrespondentie naar de e-mailarchief map indien deze ouder is dan'} value={formData.cleanupYearsEmailIncoming + ' jaar'} />
                            <ViewText label={'Verplaats uitgaande e-mailcorrespondentie naar de e-mailarchief map indien deze ouder is dan'} value={formData.cleanupYearsEmailOutgoing + ' jaar'} />
                        </div>
                    )}
                </PanelBody>
            </Panel>

            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Overig</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Gebruik export energieverbruik tarieven en verbruik'}
                            value={formData.useExportAddressConsumption ? 'Ja' : 'Nee'}
                            name={'useExportAddressConsumption'}
                            size={'col-sm-5'}
                            textToolTip={`Met deze knop krijg je de optie om op de Contacten pagina een download te maken van energie verbruik en tarief voorstellen.<br/>
Deze tarieven kunnen voorals nog alleen via de API worden ingeschoten met waardes:<br/>
{verbruik_gas_begindatum}<br/>
{verbruik_gas_einddatum}<br/>
{verbruik_gas_verbruik_m3}<br/>
{verbruik_gas_voorgesteld_tarief_vast}<br/>
{verbruik_gas_voorgesteld_tarief_variabel}<br/>
{verbruik_gas_variabele_kosten}<br/>
{verbruik_gas_vaste_kosten}<br/>
<br/>
{verbruik_electriciteit_begindatum}<br/>
{verbruik_electriciteit_einddatum}<br/>
{verbruik_electriciteit_verbruik_hoog}<br/>
{verbruik_electriciteit_verbruik_laag}<br/>
{verbruik_electriciteit_terug_hoog}<br/>
{verbruik_electriciteit_terug_laag}<br/>
{verbruik_electriciteit_voorgesteld_tarief_variabel_hoog<br/>
{verbruik_electriciteit_voorgesteld_tarief_variabel_laag}<br/>
{verbruik_electriciteit_voorgesteld_tarief_vast_hoog}<br/>
{verbruik_electriciteit_voorgesteld_tarief_vast_laag}<br/>
{verbruik_electriciteit_variabele_kosten_hoog}<br/>
{verbruik_electriciteit_variabele_kosten_laag}<br/>
{verbruik_electriciteit_vaste_kosten_hoog}<br/>
{verbruik_electriciteit_vaste_kosten_laag}`}
                        />

                        <ViewText
                            label={'Gebruik dongel registratie functionaliteit'}
                            value={formData.useDongleRegistration ? 'Ja' : 'Nee'}
                            name={'useDongleRegistration'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Gebruik URL externe contacten pagina'}
                            value={formData.showExternalUrlForContacts ? 'Ja' : 'Nee'}
                            name={'showExternalUrlForContacts'}
                            size={'col-sm-5'}
                            textToolTip={`Met deze knop krijg je de optie om op de Contacten pagina via een button naar een externe
                             contactpagina te gaan zoals econobisbuurtaanpak.nl`}
                        />
                    </div>
                    {formData.showExternalUrlForContacts ? (
                        <>
                            <div className="row">
                                <ViewText
                                    label={'Externe contacten pagina URL'}
                                    value={formData.externalUrlContacts}
                                    name={'externalUrlContacts'}
                                />
                                <ViewText
                                    label={'Externe contacten pagina button tekst'}
                                    value={formData.externalUrlContactsButtonText}
                                    name={'externalUrlContactsButtonText'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Externe URL openen in een nieuw venster?'}
                                    value={formData.externalUrlContactsOnNewPage ? 'Ja' : 'Nee'}
                                    name={'externalUrlContactsOnNewPage'}
                                />
                            </div>
                        </>
                    ) : null}
                </PanelBody>
            </Panel>
        </section>
    );
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps, null)(CooperationDetailsFormView);
