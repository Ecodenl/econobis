import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ViewText from '../../../components/form/ViewText';
import PanelHeader from '../../../components/panel/PanelHeader';

function CooperationDetailsFormView({ formData, toggleEdit }) {
    return (
        <section className={'panel-hover'} onClick={toggleEdit}>
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
                    <div className="row">
                        <ViewText label={'Logo'} value={formData.logoName} />
                    </div>
                </PanelBody>
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
                        <ViewText label={'Hoom campagne'} value={formData.hoomCampaign && formData.hoomCampaign.name} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Hoom e-mail template'}
                            value={formData.hoomEmailTemplate && formData.hoomEmailTemplate.name}
                        />
                        <ViewText label={'Hoom groep'} value={formData.hoomGroup && formData.hoomGroup.name} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Stuurt e-mail bij nieuw Hoomdossier'}
                            value={formData.sendEmail ? 'Ja' : 'Nee'}
                        />
                    </div>
                </PanelBody>
                <PanelHeader>
                    <span className="h5 text-bold">Laposta gegevens</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Gebruik Laposta'} value={formData.useLaposta ? 'Ja' : 'Nee'} />
                        <ViewText label={'Laposta key'} value={formData.lapostaKey} />
                    </div>
                </PanelBody>
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
                <PanelHeader>
                    <span className="h5 text-bold">Buurtaanpak</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Buurtaanpak afspraak e-mail template'}
                            value={
                                formData.inspectionPlannedEmailTemplate && formData.inspectionPlannedEmailTemplate.name
                            }
                        />
                        <ViewText
                            label={'Mailbox buurtaanpak e-mail bevestigingen'}
                            value={formData.inspectionPlannedMailbox && formData.inspectionPlannedMailbox.name}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Buurtaanpak opname e-mail template'}
                            value={
                                formData.inspectionRecordedEmailTemplate &&
                                formData.inspectionRecordedEmailTemplate.name
                            }
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Buurtaanpak uitgebracht e-mail template'}
                            value={
                                formData.inspectionReleasedEmailTemplate &&
                                formData.inspectionReleasedEmailTemplate.name
                            }
                        />
                    </div>
                </PanelBody>
                <PanelHeader>
                    <span className="h5 text-bold">Overig</span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Gebruik export energieverbruik tarieven en verbruik'}
                            value={formData.useExportAddressConsumption ? 'Ja' : 'Nee'}
                            size={'col-sm-5'}
                            name={'useExportAddressConsumption'}
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
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Vullen contactgroep/contact koppelingen report tabel (tbv Power BI)'}
                            value={formData.createContactsForReportTable ? 'Ja' : 'Nee'}
                            size={'col-sm-5'}
                            name={'createContactsForReportTable'}
                            textToolTip={`Hiermee wordt er een tabel gevuld met alle contactgroep/contact koppelingen tbv Power BI.`}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </section>
    );
}

export default CooperationDetailsFormView;
