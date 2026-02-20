import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../../components/form/InputText';
import InputSelect from '../../../../../components/form/InputSelect';
import InputToggle from '../../../../../components/form/InputToggle';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import Panel from '../../../../../components/panel/Panel';
import { useFormik } from 'formik';
import { MailboxValidation } from './Validation';
import { MailboxValidationImap } from './Validation';
import { MailboxValidationSmtp } from './Validation';
import { MailboxValidationPassword } from './Validation';
import { MailboxValidationMailgun } from './Validation';
import { MailboxValidationMsOauth } from './Validation';
import { MailboxValidationClientSecret } from './Validation';
import ViewText from '../../../../../components/form/ViewText';
import moment from 'moment';
import MailboxDefaultFormGeneralMsOauthApiSettings from './MsOauthApiSettings';

function MailboxDefaultFormGeneral({
    initialValues,
    processSubmit,
    mailgunDomain,
    mailboxServerTypes,
    meDetails,
    switchToView,
    isNew,
}) {
    const [currentOnlyOutgoingMailbox, setCurrentOnlyOutgoingMailbox] = useState(initialValues.onlyOutgoingMailbox);
    const [currentIncomingServerType, setCurrentIncomingServerType] = useState(initialValues.incomingServerType);
    const [currentOutgoingServerType, setCurrentOutgoingServerType] = useState(initialValues.outgoingServerType);

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur, isSubmitting } = useFormik({
        initialValues: initialValues,
        validationSchema: getValidationSchema(),
        onSubmit: (values, { setSubmitting }) => {
            processSubmit(values, setSubmitting);
        },
    });

    const manageSystemMailbox =
        meDetails.email == 'support@econobis.nl' || meDetails.email == 'software@xaris.nl'
            ? // meDetails.email == 'bar@mossy.nl'
              true
            : false;

    useEffect(() => {
        if (values.incomingServerType !== undefined) {
            setCurrentIncomingServerType(values.incomingServerType);
        }
        if (values.outgoingServerType !== undefined) {
            setCurrentOutgoingServerType(values.outgoingServerType);
        }
        if (values.onlyOutgoingMailbox !== undefined) {
            setCurrentOnlyOutgoingMailbox(values.onlyOutgoingMailbox);
        }
    }, [values.incomingServerType, values.outgoingServerType, values.onlyOutgoingMailbox]);

    function getValidationSchema() {
        let validationSchema = MailboxValidation;
        if (currentIncomingServerType === 'imap' && !currentOnlyOutgoingMailbox) {
            validationSchema = validationSchema.concat(MailboxValidationImap);
            if (isNew) {
                validationSchema = validationSchema.concat(MailboxValidationPassword);
            }
        }
        if (currentOutgoingServerType === 'smtp') {
            validationSchema = validationSchema.concat(MailboxValidationSmtp);
            if (isNew) {
                validationSchema = validationSchema.concat(MailboxValidationPassword);
            }
        }
        if (currentOutgoingServerType === 'mailgun') {
            validationSchema = validationSchema.concat(MailboxValidationMailgun);
        }
        if (currentIncomingServerType === 'ms-oauth' || currentOutgoingServerType === 'ms-oauth') {
            validationSchema = validationSchema.concat(MailboxValidationMsOauth);
            if (isNew) {
                validationSchema = validationSchema.concat(MailboxValidationClientSecret);
            }
        }
        return validationSchema;
    }

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label="Weergave Naam"
                            name={'name'}
                            value={values.name}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                            required={'required'}
                            error={errors.name && touched.name}
                            errorMessage={errors.name}
                            disabled={!manageSystemMailbox && values.isSystemMailbox}
                        />
                        <InputText
                            label={'E-mail'}
                            name={'email'}
                            value={values.email}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                            required={'required'}
                            error={errors.email && touched.email}
                            errorMessage={errors.email}
                            disabled={!manageSystemMailbox && values.isSystemMailbox}
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label={'Mailbox voor alleen uitgaande emails'}
                            name={'onlyOutgoingMailbox'}
                            value={values.onlyOutgoingMailbox}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            size={'col-sm-5'}
                            textToolTip={`Indien dit aangezet wordt, dan kan je met deze mailbox alleen emails verzenden, niet ontvangen.`}
                            disabled={!manageSystemMailbox && values.isSystemMailbox}
                        />
                        <InputToggle
                            label={'Markeer als systeem mailbox'}
                            name={'isSystemMailbox'}
                            value={values.isSystemMailbox}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            size={'col-sm-5'}
                            textToolTip={`Een systeem mailbox is alleen voor support gebruiker en is vooral bedoeld voor initiele mailbox
                                 bij het opzetten van een nieuwe cooperatie. Mailgun logs en bounches zullen niet opgehaald worden 
                                 bij systeem mailboxen.`}
                            disabled={!manageSystemMailbox}
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label="Actief"
                            name={'isActive'}
                            value={values.isActive}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            disabled={values.primary || (!manageSystemMailbox && values.isSystemMailbox)}
                        />
                        <InputToggle
                            label="Primair (verzend wachtwoord mails)"
                            name={'primary'}
                            value={values.primary}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            disabled={
                                !values.isActive ||
                                initialValues.primary ||
                                (!manageSystemMailbox && values.isSystemMailbox)
                            }
                            size={'col-sm-5'}
                            textToolTip={
                                initialValues.primary &&
                                `Switchen van primaire mailbox is alleen mogelijk door een andere mailbox op primair te zetten.`
                            }
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label={
                                <span>
                                    Koppel contact op email <u>aan</u> adres
                                    <br />
                                    <small style={{ color: '#ccc', fontWeight: 'normal' }}>
                                        Koppeling contact standaard op email <u>afzender</u> adres
                                    </small>
                                </span>
                            }
                            name={'linkContactFromEmailToAddress'}
                            value={values.linkContactFromEmailToAddress}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            disabled={!manageSystemMailbox && values.isSystemMailbox}
                        />
                    </div>
                </PanelBody>

                <PanelHeader>
                    <span className="h5">
                        <strong>Servergegevens</strong>
                    </span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        {currentOnlyOutgoingMailbox ? (
                            <ViewText
                                className={'form-group col-md-6'}
                                label={'Inkomende mail type'}
                                value={'N.v.t.'}
                                textToolTip={'Deze mailbox staat nu ingesteld voor alleen uitgaande emails.'}
                            />
                        ) : (
                            <InputSelect
                                label="Inkomende mail type"
                                name={'incomingServerType'}
                                value={values.incomingServerType}
                                options={mailboxServerTypes.incomingServerTypes}
                                onChangeAction={handleChange}
                                emptyOption={false}
                                required={'required'}
                                readOnly={!manageSystemMailbox && values.isSystemMailbox}
                            />
                        )}
                        <InputSelect
                            label="Uitgaande mail type"
                            name={'outgoingServerType'}
                            value={values.outgoingServerType}
                            options={mailboxServerTypes.outgoingServerTypes}
                            onChangeAction={handleChange}
                            emptyOption={false}
                            required={'required'}
                            readOnly={!manageSystemMailbox && values.isSystemMailbox}
                        />
                    </div>
                    <div className="row">
                        {values.incomingServerType === 'imap' ? (
                            currentOnlyOutgoingMailbox ? (
                                <ViewText
                                    className={'form-group col-md-6'}
                                    label={'Inkomende IMAP host'}
                                    value={'N.v.t.'}
                                    textToolTip={'Deze mailbox staat nu ingesteld voor alleen uitgaande emails.'}
                                />
                            ) : (
                                <InputText
                                    label="Inkomende IMAP host"
                                    name={'imapHost'}
                                    value={values.imapHost}
                                    onChangeAction={handleChange}
                                    onBlurAction={handleBlur}
                                    required={'required'}
                                    error={errors.imapHost && touched.imapHost}
                                    errorMessage={errors.imapHost}
                                    disabled={!manageSystemMailbox && values.isSystemMailbox}
                                />
                            )
                        ) : (
                            <div className="form-group col-sm-6" />
                        )}

                        {values.outgoingServerType === 'smtp' ? (
                            <InputText
                                label="Uitgaande SMTP host"
                                name={'smtpHost'}
                                value={values.smtpHost}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                required={'required'}
                                error={errors.smtpHost && touched.smtpHost}
                                errorMessage={errors.smtpHost}
                                disabled={!manageSystemMailbox && values.isSystemMailbox}
                            />
                        ) : null}

                        {values.outgoingServerType === 'mailgun' ? (
                            <InputSelect
                                label="Uitgaand Mailgun domein"
                                name={'mailgunDomainId'}
                                value={values.mailgunDomainId}
                                options={mailgunDomain}
                                optionName={'domain'}
                                onChangeAction={handleChange}
                                required={'required'}
                                error={errors.mailgunDomainId && touched.mailgunDomainId}
                                errorMessage={errors.mailgunDomainId}
                                readOnly={!manageSystemMailbox && values.isSystemMailbox}
                            />
                        ) : null}
                    </div>
                </PanelBody>

                {(values.incomingServerType === 'imap' || values.outgoingServerType === 'smtp') && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Instellingen</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <InputText
                                    label="Gebruikersnaam"
                                    name={'username'}
                                    value={values.username}
                                    onChangeAction={handleChange}
                                    onBlurAction={handleBlur}
                                    required={'required'}
                                    error={errors.username && touched.username}
                                    errorMessage={errors.username}
                                    disabled={!manageSystemMailbox && values.isSystemMailbox}
                                />
                                <InputText
                                    type={'text'}
                                    label={'Wachtwoord'}
                                    name={'password'}
                                    value={values.password}
                                    className={'numeric-password'}
                                    placeholder="**********"
                                    onChangeAction={handleChange}
                                    onBlurAction={handleBlur}
                                    required={'required'}
                                    error={errors.password && touched.password}
                                    errorMessage={errors.password}
                                    disabled={!manageSystemMailbox && values.isSystemMailbox}
                                />
                            </div>
                            <div className="row">
                                {values.incomingServerType === 'imap' ? (
                                    currentOnlyOutgoingMailbox ? (
                                        <ViewText
                                            className={'form-group col-md-6'}
                                            label={'Imap poort'}
                                            value={'N.v.t.'}
                                            textToolTip={
                                                'Deze mailbox staat nu ingesteld voor alleen uitgaande emails.'
                                            }
                                        />
                                    ) : (
                                        <InputText
                                            label={'Imap poort'}
                                            name={'imapPort'}
                                            value={values.imapPort}
                                            onChangeAction={handleChange}
                                            onBlurAction={handleBlur}
                                            required={'required'}
                                            error={errors.imapPort && touched.imapPort}
                                            errorMessage={errors.imapPort}
                                            disabled={!manageSystemMailbox && values.isSystemMailbox}
                                        />
                                    )
                                ) : (
                                    <div className="form-group col-sm-6" />
                                )}
                                {values.outgoingServerType === 'smtp' && (
                                    <InputText
                                        label={'Smtp poort'}
                                        name={'smtpPort'}
                                        value={values.smtpPort}
                                        onChangeAction={handleChange}
                                        onBlurAction={handleBlur}
                                        required={'required'}
                                        error={errors.smtpPort && touched.smtpPort}
                                        errorMessage={errors.smtpPort}
                                        disabled={!manageSystemMailbox && values.isSystemMailbox}
                                    />
                                )}
                            </div>
                            <div className="row">
                                {values.incomingServerType === 'imap' ? (
                                    currentOnlyOutgoingMailbox ? (
                                        <ViewText
                                            className={'form-group col-md-6'}
                                            label={'Imap versleutelde verbinding'}
                                            value={'N.v.t.'}
                                            textToolTip={
                                                'Deze mailbox staat nu ingesteld voor alleen uitgaande emails.'
                                            }
                                        />
                                    ) : (
                                        <InputSelect
                                            label="Imap versleutelde verbinding"
                                            name={'imapEncryption'}
                                            value={values.imapEncryption}
                                            options={[
                                                { id: 'ssl', name: 'SSL' },
                                                { id: 'ssl/novalidate-cert', name: 'SSL - self-signed certificate' },
                                                { id: 'tls', name: 'TLS' },
                                            ]}
                                            onChangeAction={handleChange}
                                            readOnly={!manageSystemMailbox && values.isSystemMailbox}
                                        />
                                    )
                                ) : (
                                    <div className="form-group col-sm-6" />
                                )}

                                {values.outgoingServerType === 'smtp' && (
                                    <InputSelect
                                        label="Smtp versleutelde verbinding"
                                        name={'smtpEncryption'}
                                        value={values.smtpEncryption}
                                        options={[
                                            { id: 'ssl', name: 'SSL' },
                                            { id: 'tls', name: 'TLS' },
                                        ]}
                                        onChangeAction={handleChange}
                                        readOnly={!manageSystemMailbox && values.isSystemMailbox}
                                    />
                                )}
                            </div>

                            {values.incomingServerType === 'imap' ? (
                                <>
                                    <div className="row">
                                        {currentOnlyOutgoingMailbox ? (
                                            <ViewText
                                                className={'form-group col-md-6'}
                                                label={'Inbox prefix'}
                                                value={'N.v.t.'}
                                                textToolTip={
                                                    'Deze mailbox staat nu ingesteld voor alleen uitgaande emails.'
                                                }
                                            />
                                        ) : (
                                            <InputText
                                                label={'Inbox prefix'}
                                                name={'imapInboxPrefix'}
                                                value={values.imapInboxPrefix}
                                                onChangeAction={handleChange}
                                                onBlurAction={handleBlur}
                                                error={errors.imapInboxPrefix && touched.imapInboxPrefix}
                                                errorMessage={errors.imapInboxPrefix}
                                                disabled={!manageSystemMailbox && values.isSystemMailbox}
                                            />
                                        )}
                                    </div>
                                    <div className="row">
                                        {currentOnlyOutgoingMailbox ? (
                                            <ViewText
                                                className={'form-group col-md-6'}
                                                label={'Zet email als gelezen op server'}
                                                value={'N.v.t.'}
                                                textToolTip={
                                                    'Deze mailbox staat nu ingesteld voor alleen uitgaande emails.'
                                                }
                                            />
                                        ) : (
                                            <InputToggle
                                                label={'Zet email als gelezen op server'}
                                                name={'emailMarkAsSeen'}
                                                value={values.emailMarkAsSeen}
                                                onChangeAction={event => {
                                                    event.persist();
                                                    setFieldValue(event.target.name, event.target.checked);
                                                }}
                                                disabled={!manageSystemMailbox && values.isSystemMailbox}
                                            />
                                        )}
                                    </div>
                                </>
                            ) : null}
                        </PanelBody>
                    </>
                )}

                {(values.incomingServerType === 'ms-oauth' || values.outgoingServerType === 'ms-oauth') && (
                    <MailboxDefaultFormGeneralMsOauthApiSettings
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                )}

                {values.incomingServerType === 'mailgun' && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Mailgun instellingen</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <ViewText
                                    className={'form-group col-sm-12'}
                                    labelSize={'col-sm-3'}
                                    valueSize={'col-sm-9'}
                                    label={'Forward email'}
                                    value={values.inboundMailgunEmail ? values.inboundMailgunEmail : 'Nog niet bepaald'}
                                    textToolTip={
                                        'Forward email ' +
                                        values.email +
                                        ' naar ' +
                                        (values.inboundMailgunEmail ? values.inboundMailgunEmail : 'Nog niet bepaald') +
                                        ' om deze in Econobis te ontvangen.'
                                    }
                                />
                            </div>
                        </PanelBody>
                    </>
                )}

                {values.id && (
                    <>
                        <PanelHeader>
                            <span className="h5">
                                <strong>Log</strong>
                            </span>
                        </PanelHeader>
                        <PanelBody>
                            <div className="row">
                                <ViewText
                                    label={'Datum email laatst opgehaald'}
                                    value={
                                        values.dateLastFetched
                                            ? moment(values.dateLastFetched).format('L HH:mm:ss')
                                            : 'Nog niet bepaald'
                                    }
                                    className={'form-group col-sm-6'}
                                />
                                <ViewText
                                    label={'UID email laatst opgehaald'}
                                    value={values.imapIdLastFetched}
                                    className={'form-group col-sm-6'}
                                />
                            </div>
                        </PanelBody>
                    </>
                )}

                <PanelBody>
                    <div className="pull-right btn-group" role="group">
                        {values.id ? (
                            <>
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Sluiten'}
                                    onClickAction={switchToView}
                                />
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    onClickAction={handleSubmit}
                                    type={'submit'}
                                    value={'Submit'}
                                    loading={isSubmitting}
                                />
                            </>
                        ) : (
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                                loading={isSubmitting}
                            />
                        )}
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
}

const mapStateToProps = state => {
    return {
        mailboxServerTypes: state.systemData.mailboxServerTypes,
        mailgunDomain: state.systemData.mailgunDomain,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(MailboxDefaultFormGeneral);
