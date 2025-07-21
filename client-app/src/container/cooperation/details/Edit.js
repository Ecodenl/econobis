import React, { useEffect, useState } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from '../../../components/panel/PanelHeader';
import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import { useFormik } from 'formik';
import axios from 'axios';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import InputReactSelect from '../../../components/form/InputReactSelect';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import CooperationDetailsAPI from '../../../api/cooperation/CooperationDetailsAPI';
import { CooperationValidation } from './Validation';
import InputToggle from '../../../components/form/InputToggle';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import { connect } from 'react-redux';
import Modal from '../../../components/modal/Modal';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import ViewText from '../../../components/form/ViewText';
import moment from 'moment';
import InputTextColorPicker from '../../../components/form/InputTextColorPicker';
import HoomCampaigns from './hoom-campaigns/HoomCampaigns';
import CleanupContactsExcludedGroups from './cleanup-contacts-excluded-groups/CleanupContactsExcludedGroups';
import CleanupItems from './cleanup-items/CleanupItems';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';

function CooperationDetailsFormEdit({ formData, toggleEdit, updateResult, fetchSystemData, meDetails, handleRefresh }) {
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [staticContactGroups, setStaticContactGroups] = useState([]);
    const [mailboxAddresses, setMailboxAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showActivateTwoFactorWarning, setShowActivateTwoFactorWarning] = useState(false);

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } = useFormik({
        initialValues: formData,
        validationSchema: CooperationValidation,
        onSubmit: values => {
            processSubmit(values);
        },
    });

    useEffect(function() {
        axios
            .all([
                EmailTemplateAPI.fetchEmailTemplatesPeek(),
                MailboxAPI.fetchMailboxesLoggedInUserPeek(),
                ContactGroupAPI.peekStaticContactGroups(),
            ])
            .then(
                axios.spread((emailTemplates, mailboxAddresses, staticContactGroups) => {
                    setMailboxAddresses(mailboxAddresses.data.data);
                    setEmailTemplates(emailTemplates);
                    setStaticContactGroups(staticContactGroups);
                    setIsLoading(false);
                })
            );
    }, []);

    function processSubmit(values) {
        // Cleanup value data. Data don't needed for update.
        const cleanUpFormFields = [
            'hoomGroup',
            'hoomEmailTemplate',
            'hoomCampaigns',
            'cleanupContactsExcludedGroups',
            'createdAt',
            'createdBy',
            'createdById',
            'updatedAt',
            'updatedById',
            'updatedBy',
            'cleanupItems',
        ];
        for (const item of cleanUpFormFields) {
            delete values[item];
        }

        // Process to formdata
        let formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }

        // Send form data
        let request = null;
        if (values.id === null) request = CooperationDetailsAPI.create(formData);
        else request = CooperationDetailsAPI.update(values.id, formData);

        request
            .then(payload => {
                updateResult(payload.data.data);
                toggleEdit();
                fetchSystemData();
            })
            .catch(error => {
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    }

    function handleRequireTwoFactorChange(e) {
        setFieldValue('requireTwoFactorAuthentication', e.target.checked);

        if (e.target.checked) {
            setShowActivateTwoFactorWarning(true);
        }
    }

    return (
        <div>
            <section className={'panel-hover'}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Naam"
                                name={'name'}
                                value={values.name}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                required={'required'}
                                error={errors.name && touched.name}
                                errorMessage={errors.name}
                            />
                            <InputText
                                label="KvK"
                                name={'kvkNumber'}
                                value={values.kvkNumber}
                                onChangeAction={handleChange}
                                error={errors.kvkNumber && touched.kvkNumber}
                                errorMessage={errors.kvkNumber}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Adres"
                                name={'address'}
                                value={values.address}
                                onChangeAction={handleChange}
                            />
                            <InputText
                                label="Btw nummer"
                                name={'btwNumber'}
                                value={values.btwNumber}
                                onChangeAction={handleChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Postcode"
                                name={'postalCode'}
                                value={values.postalCode}
                                onChangeAction={handleChange}
                            />
                            <InputText
                                label="IBAN"
                                name={'iban'}
                                value={values.iban}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                error={errors.iban && touched.iban}
                                errorMessage={errors.iban}
                            />
                        </div>
                        <div className="row">
                            <InputText label="Plaats" name={'city'} value={values.city} onChangeAction={handleChange} />

                            <InputText
                                label="IBAN t.n.v."
                                name={'ibanAttn'}
                                value={values.ibanAttn}
                                onChangeAction={handleChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Email"
                                name={'email'}
                                value={values.email}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                error={errors.email && touched.email}
                                errorMessage={errors.email}
                            />
                            <InputText
                                label="Website"
                                name={'website'}
                                value={values.website}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                error={errors.website && touched.website}
                                errorMessage={errors.website}
                            />
                        </div>
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Hoom gegevens</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Hoom link"
                                name={'hoomLink'}
                                value={values.hoomLink}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                error={errors.hoomLink && touched.hoomLink}
                                errorMessage={errors.hoomLink}
                            />
                            <InputText
                                label="Hoom key"
                                name={'hoomKey'}
                                value={values.hoomKey}
                                onChangeAction={handleChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Hoom bewoner/coach link"
                                name={'hoomConnectCoachLink'}
                                value={values.hoomConnectCoachLink}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                error={errors.hoomConnectCoachLink && touched.hoomConnectCoachLink}
                                errorMessage={errors.hoomConnectCoachLink}
                            />
                            <InputReactSelect
                                label={'Hoom groep'}
                                name={'hoomGroupId'}
                                options={staticContactGroups}
                                value={values.hoomGroupId}
                                onChangeAction={(value, name) => setFieldValue(name, value)}
                                isLoading={isLoading}
                                clearable={true}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label={'Hoom e-mail template'}
                                name={'hoomEmailTemplateId'}
                                options={emailTemplates}
                                value={values.hoomEmailTemplateId}
                                onChangeAction={(value, name) => setFieldValue(name, value)}
                                isLoading={isLoading}
                                clearable={true}
                            />
                            <InputReactSelect
                                label={'Hoom mailbox'}
                                name={'hoomMailboxId'}
                                options={mailboxAddresses}
                                optionName={'name'}
                                value={values.hoomMailboxId}
                                onChangeAction={(value, name) => setFieldValue(name, value)}
                                isLoading={isLoading}
                                clearable={true}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Stuur e-mail bij nieuw Hoomdossier'}
                                name={'sendEmail'}
                                value={!!values.sendEmail}
                                onChangeAction={event => {
                                    event.persist();
                                    setFieldValue(event.target.name, event.target.checked);
                                }}
                            />
                        </div>
                        <HoomCampaigns
                            cooperationId={formData.id}
                            showEditCooperation={true}
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
                            <InputToggle
                                label="Gebruik Laposta"
                                name={'useLaposta'}
                                value={values.useLaposta}
                                onChangeAction={e => setFieldValue('useLaposta', e.target.checked)}
                            />
                            <InputText
                                label="Laposta key"
                                name={'lapostaKey'}
                                value={values.lapostaKey}
                                onChangeAction={handleChange}
                            />
                        </div>
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Twee factor authenticatie</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputToggle
                                label="Verplichten voor alle gebruikers"
                                name={'requireTwoFactorAuthentication'}
                                value={values.requireTwoFactorAuthentication}
                                onChangeAction={handleRequireTwoFactorChange}
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
                                <InputToggle
                                    label={
                                        <span>
                                            Vullen report tabel (tbv Power BI)
                                            {values.createContactsForReportTable ? (
                                                <>
                                                    <br />
                                                    <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                        Wanneer je dit uitzet wordt de report tabel geleegd.
                                                    </small>
                                                </>
                                            ) : null}
                                        </span>
                                    }
                                    name={'createContactsForReportTable'}
                                    value={!!values.createContactsForReportTable}
                                    onChangeAction={e =>
                                        setFieldValue('createContactsForReportTable', e.target.checked)
                                    }
                                    size={'col-sm-5'}
                                    textToolTip={`Hiermee wordt er een tabel gevuld met alle contactgroep/contact koppelingen tbv Power BI.`}
                                />
                                {values.createContactsForReportTable == true && (
                                    <InputText
                                        label="Email bij problemen vullen report tabel"
                                        name={'emailReportTableProblems'}
                                        value={values.emailReportTableProblems}
                                        onChangeAction={handleChange}
                                        onBlurAction={handleBlur}
                                        error={errors.emailReportTableProblems && touched.emailReportTableProblems}
                                        errorMessage={errors.emailReportTableProblems}
                                    />
                                )}
                            </div>
                            <div className="row">
                                {values.createContactsForReportTable == true && (
                                    <ViewText
                                        label={'Datum laatste keer gevuld'}
                                        value={
                                            values.createContactsForReportTableLastCreated
                                                ? moment(values.createContactsForReportTableLastCreated).format('L')
                                                : ''
                                        }
                                    />
                                )}
                                {values.createContactsForReportTableInProgress == true && (
                                    <span class="form-group col-sm-6">
                                        <span class="form-group col-sm-12" style={{ color: '#e64a4a' }}>
                                            Report tabel wordt momenteel bijgewerkt…
                                        </span>
                                    </span>
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
                            <InputReactSelect
                                label={'Lettertype'}
                                name={'fontFamilyDefault'}
                                options={[
                                    { id: 'Helvetica', name: 'Helvetica' },
                                    { id: 'Arial', name: 'Arial' },
                                    { id: 'Arial Black', name: 'Arial Black' },
                                    { id: 'Verdana', name: 'Verdana' },
                                    { id: 'Tahoma', name: 'Tahoma' },
                                    { id: 'Trebuchet MS', name: 'Trebuchet MS' },
                                    { id: 'Impact', name: 'Impact' },
                                    { id: 'Gill Sans', name: 'Gill Sans' },
                                    { id: 'Times New Roman', name: 'Times New Roman' },
                                    { id: 'Georgia', name: 'Georgia' },
                                    { id: 'Palatino', name: 'Palatino' },
                                    { id: 'Baskerville', name: 'Baskerville' },
                                    { id: 'Andalé Mono', name: 'Andalé Mono' },
                                    { id: 'Courier', name: 'Courier' },
                                    { id: 'Lucida', name: 'Lucida' },
                                    { id: 'Monaco', name: 'Monaco' },
                                    { id: 'Bradley Hand', name: 'Bradley Hand' },
                                    { id: 'Brush Script MT', name: 'Brush Script MT' },
                                    { id: 'Luminari', name: 'Luminari' },
                                    { id: 'Comic Sans MS', name: 'Comic Sans MS' },
                                    { id: 'Maven Pro', name: 'Maven Pro' },
                                ]}
                                value={values.fontFamilyDefault}
                                onChangeAction={(value, name) => setFieldValue(name, value)}
                                clearable={true}
                            />
                            <InputText
                                label="Lettergrootte"
                                name={'fontSizeDefault'}
                                value={values.fontSizeDefault}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                type={'number'}
                            />
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="Letterkleur"
                                name={'fontColorDefault'}
                                value={values.fontColorDefault}
                                onChangeAction={handleChange}
                                cpSize={'col-sm-2'}
                                divSize={'col-sm-6'}
                                size={'col-sm-4'}
                            />
                        </div>
                    </PanelBody>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Opschonen</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputToggle
                                label="Wil je de e-mailcorrespondentie van contacten die geen order, nota, deelname, intake of kans hebben naar de e-mailarchief map verplaatsen?"
                                name={'cleanupEmail'}
                                value={values.cleanupEmail}
                                onChangeAction={e => setFieldValue('cleanupEmail', e.target.checked)}
                            />
                            <span className="form-group col-sm-6">
                                <span className="form-group col-sm-12">
                                    <a role="button" onClick={handleRefresh} title={`herbereken alle op te schonen`}>
                                        <Icon size={14} icon={refresh} />
                                    </a>
                                </span>
                            </span>
                        </div>
                        <CleanupItems
                            cooperationId={formData.id}
                            showEditCooperation={false}
                            cleanupItems={formData.cleanupItems}
                        />
                        <CleanupContactsExcludedGroups
                            cooperationId={formData.id}
                            showEditCooperation={true}
                            cleanupContactsExcludedGroups={formData.cleanupContactsExcludedGroups}
                        />
                    </PanelBody>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Overig</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="row">
                            <InputToggle
                                label="Gebruik export energieverbruik tarieven en verbruik"
                                name={'useExportAddressConsumption'}
                                value={values.useExportAddressConsumption}
                                onChangeAction={e => setFieldValue('useExportAddressConsumption', e.target.checked)}
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

                            <InputToggle
                                label="Gebruik dongel registratie functionaliteit"
                                name={'useDongleRegistration'}
                                value={values.useDongleRegistration}
                                onChangeAction={e => setFieldValue('useDongleRegistration', e.target.checked)}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Gebruik URL externe contacten pagina'}
                                name={'showExternalUrlForContacts'}
                                value={values.showExternalUrlForContacts}
                                onChangeAction={e => setFieldValue('showExternalUrlForContacts', e.target.checked)}
                                size={'col-sm-5'}
                                textToolTip={`Met deze knop krijg je de optie om op de Contacten pagina via een button naar een externe
                             contactpagina te gaan zoals econobisbuurtaanpak.nl`}
                            />
                        </div>
                        {values.showExternalUrlForContacts ? (
                            <>
                                <div className="row">
                                    <InputText
                                        label={'Externe contacten pagina URL'}
                                        name={'externalUrlContacts'}
                                        value={values.externalUrlContacts}
                                        onChangeAction={handleChange}
                                        onBlurAction={handleBlur}
                                        error={errors.externalUrlContacts && touched.externalUrlContacts}
                                        errorMessage={errors.externalUrlContacts}
                                    />
                                    <InputText
                                        label={'Externe contacten pagina button tekst'}
                                        name={'externalUrlContactsButtonText'}
                                        value={values.externalUrlContactsButtonText}
                                        onChangeAction={handleChange}
                                        onBlurAction={handleBlur}
                                        error={
                                            errors.externalUrlContactsButtonText &&
                                            touched.externalUrlContactsButtonText
                                        }
                                        errorMessage={errors.externalUrlContactsButtonText}
                                    />
                                </div>
                                <div className="row">
                                    <InputToggle
                                        label={'Externe URL openen in een nieuw venster?'}
                                        name={'externalUrlContactsOnNewPage'}
                                        value={values.externalUrlContactsOnNewPage}
                                        onChangeAction={e =>
                                            setFieldValue('externalUrlContactsOnNewPage', e.target.checked)
                                        }
                                    />
                                </div>
                            </>
                        ) : null}
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={toggleEdit}
                            />
                            <ButtonText
                                loading={false}
                                loadText={'laden'}
                                buttonText={'Opslaan'}
                                onClickAction={handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </section>
            {showActivateTwoFactorWarning && (
                <Modal
                    showConfirmAction={false}
                    buttonCancelText={'Sluiten'}
                    closeModal={() => setShowActivateTwoFactorWarning(false)}
                    title="Waarschuwing"
                >
                    Bij het activeren van twee factor authenticatie voor de gehele coöperatie worden alle gebruikers per
                    direct verplicht om twee factor authenticatie in te stellen.
                    <br />
                    <br />
                    Dit geldt ook voor gebruikers die op dit moment in het programma actief zijn.
                </Modal>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CooperationDetailsFormEdit);
