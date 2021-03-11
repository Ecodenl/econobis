import React, { useEffect, useState } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ViewText from '../../../components/form/ViewText';
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
import CooperationUploadLogo from './UploadLogo';

function CooperationDetailsFormEdit({ formData, toggleEdit, updateResult }) {
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [staticContactGroups, setStaticContactGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showUploadLogo, setShowUploadLogo] = useState(false);
    const [attachment, setAttachment] = useState(null);

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } = useFormik({
        initialValues: formData,
        validationSchema: CooperationValidation,
        onSubmit: values => {
            processSubmit(values);
        },
    });

    useEffect(function() {
        axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek(), ContactGroupAPI.peekStaticContactGroups()]).then(
            axios.spread((emailTemplates, staticContactGroups) => {
                setEmailTemplates(emailTemplates);
                setStaticContactGroups(staticContactGroups);
                setIsLoading(false);
            })
        );
    }, []);

    function processSubmit(values) {
        // Cleanup value data
        const cleanUpFormFields = [
            'hoomGroup',
            'hoomEmailTemplate',
            'createdAt',
            'createdBy',
            'createdById',
            'updatedAt',
            'updatedById',
            'updatedBy',
        ];
        for (const item of cleanUpFormFields) {
            delete values[item];
        }

        // Process to formdata
        let formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }

        if (attachment) {
            formData.append('attachment', attachment);
        }

        // Send form data
        let request = null;
        if (values.id === null) request = CooperationDetailsAPI.create(formData);
        else request = CooperationDetailsAPI.update(values.id, formData);

        request
            .then(payload => {
                updateResult(payload.data.data);
                toggleEdit();
            })
            .catch(error => {
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    }

    function toggleShowUploadLogo() {
        setShowUploadLogo(!showUploadLogo);
    }

    return (
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
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label className="col-sm-6">Kies logo</label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control input-sm col-sm-6"
                                    value={attachment ? attachment.name : values.logoName}
                                    onClick={toggleShowUploadLogo}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        {showUploadLogo ? (
                            <CooperationUploadLogo
                                addAttachment={setAttachment}
                                toggleShowUploadLogo={toggleShowUploadLogo}
                            />
                        ) : null}
                    </div>
                </PanelBody>
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
                        <InputReactSelect
                            label={'Hoom e-mail template'}
                            name={'hoomEmailTemplateId'}
                            options={emailTemplates}
                            value={values.hoomEmailTemplateId}
                            onChangeAction={(value, name) => setFieldValue(name, value)}
                            isLoading={isLoading}
                            multi={false}
                        />
                        <InputReactSelect
                            label={'Hoom groep'}
                            name={'hoomGroupId'}
                            options={staticContactGroups}
                            value={values.hoomGroupId}
                            onChangeAction={(value, name) => setFieldValue(name, value)}
                            isLoading={isLoading}
                            multi={false}
                        />
                    </div>
                </PanelBody>

                <PanelBody>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={'btn-default'} buttonText={'Sluiten'} onClickAction={toggleEdit} />
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
    );
}
export default CooperationDetailsFormEdit;
