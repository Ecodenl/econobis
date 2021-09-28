import React from 'react';
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
import MailboxDefaultFormGeneralGmailApiSettings from './GmailApiSettings';
import ViewText from '../../../../../components/form/ViewText';
import moment from 'moment';

function MailboxDefaultFormGeneral({ initialValues, processSubmit, mailgunDomain, mailboxServerTypes, switchToView }) {
    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur, isSubmitting } = useFormik({
        initialValues: initialValues,
        validationSchema: MailboxValidation,
        onSubmit: (values, { setSubmitting }) => {
            processSubmit(values, setSubmitting);
        },
    });

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
                            disabled={values.primary}
                        />
                        <InputToggle
                            label="Primair (verzend wachtwoord mails)"
                            name={'primary'}
                            value={values.primary}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            disabled={!values.isActive}
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
                        <InputSelect
                            label="Inkomende mail type"
                            name={'incomingServerType'}
                            value={values.incomingServerType}
                            options={mailboxServerTypes.incomingServerTypes}
                            onChangeAction={handleChange}
                            emptyOption={false}
                        />
                        <InputSelect
                            label="Uitgaande mail type"
                            name={'outgoingServerType'}
                            value={values.outgoingServerType}
                            options={mailboxServerTypes.outgoingServerTypes}
                            onChangeAction={handleChange}
                            emptyOption={false}
                        />
                    </div>
                    <div className="row">
                        {values.incomingServerType === 'imap' ? (
                            <InputText
                                label="Inkomend"
                                name={'imapHost'}
                                value={values.imapHost}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                error={errors.imapHost && touched.imapHost}
                                errorMessage={errors.imapHost}
                            />
                        ) : (
                            <div className="form-group col-sm-6" />
                        )}

                        {values.outgoingServerType === 'smtp' ? (
                            <InputText
                                label="Uitgaand"
                                name={'smtpHost'}
                                value={values.smtpHost}
                                onChangeAction={handleChange}
                                onBlurAction={handleBlur}
                                error={errors.smtpHost && touched.smtpHost}
                                errorMessage={errors.smtpHost}
                            />
                        ) : null}

                        {values.outgoingServerType === 'mailgun' ? (
                            <InputSelect
                                label="Uitgaand"
                                name={'mailgunDomainId'}
                                value={values.mailgunDomainId}
                                options={mailgunDomain}
                                optionName={'domain'}
                                onChangeAction={handleChange}
                                error={errors.mailgunDomainId && touched.mailgunDomainId}
                                errorMessage={errors.mailgunDomainId}
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
                            {values.incomingServerType === 'imap' && (
                                <>
                                    <div className="row">
                                        <InputText
                                            label="Imap Gebruikersnaam"
                                            name={'username'}
                                            value={values.username}
                                            onChangeAction={handleChange}
                                            onBlurAction={handleBlur}
                                            error={errors.username && touched.username}
                                            errorMessage={errors.username}
                                        />
                                    </div>
                                    <div className="row">
                                        <InputText
                                            label={'Imap Wachtwoord'}
                                            name={'password'}
                                            value={values.password}
                                            onChangeAction={handleChange}
                                            onBlurAction={handleBlur}
                                            error={errors.password && touched.password}
                                            errorMessage={errors.password}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="row">
                                {values.incomingServerType === 'imap' ? (
                                    <InputText
                                        label={'Imap poort'}
                                        name={'imapPort'}
                                        value={values.imapPort}
                                        onChangeAction={handleChange}
                                        onBlurAction={handleBlur}
                                        error={errors.imapPort && touched.imapPort}
                                        errorMessage={errors.imapPort}
                                    />
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
                                        error={errors.smtpPort && touched.smtpPort}
                                        errorMessage={errors.smtpPort}
                                    />
                                )}
                            </div>
                            <div className="row">
                                {values.incomingServerType === 'imap' ? (
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
                                    />
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
                                    />
                                )}
                            </div>
                        </PanelBody>
                    </>
                )}

                {(values.incomingServerType === 'gmail' || values.outgoingServerType === 'gmail') && (
                    <MailboxDefaultFormGeneralGmailApiSettings
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                )}

                <PanelHeader>
                    <span className="h5">
                        <strong>Extra instellingen</strong>
                    </span>
                </PanelHeader>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={'Inbox prefix'}
                            name={'imapInboxPrefix'}
                            value={values.imapInboxPrefix}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                            error={errors.imapInboxPrefix && touched.imapInboxPrefix}
                            errorMessage={errors.imapInboxPrefix}
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label={'Zet email als gelezen op server'}
                            name={'emailMarkAsSeen'}
                            value={values.emailMarkAsSeen}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                        />
                    </div>
                </PanelBody>

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
    };
};

export default connect(mapStateToProps)(MailboxDefaultFormGeneral);
