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

function CooperationDetailsFormEdit({ formData, toggleEdit, updateResult }) {
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [staticContactGroups, setStaticContactGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const formik = useFormik({
        initialValues: formData,

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
        // Process to formdata

        let send = null;
        if (values.id === null) send = CooperationDetailsAPI.create(values);
        else send = CooperationDetailsAPI.update(values);

        send.then(payload => {
            updateResult(payload.data.data);
            toggleEdit();
        }).catch(error => {
            alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
        });
    }

    return (
        <section className={'panel-hover'}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label="Naam"
                            name={'name'}
                            value={formik.values.name}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                        <InputText
                            label="KvK"
                            name={'kvkNumber'}
                            value={formik.values.kvkNumber}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            label="Adres"
                            name={'address'}
                            value={formik.values.address}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                        <InputText
                            label="Btw nummer"
                            name={'btwNumber'}
                            value={formik.values.btwNumber}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            label="Postcode"
                            name={'postalCode'}
                            value={formik.values.postalCode}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                        <InputText
                            label="IBAN"
                            name={'iban'}
                            value={formik.values.iban}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            label="Plaats"
                            name={'city'}
                            value={formik.values.city}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />

                        <InputText
                            label="IBAN t.n.v."
                            name={'ibanAttn'}
                            value={formik.values.ibanAttn}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            label="Email"
                            name={'email'}
                            value={formik.values.email}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                        <InputText
                            label="Website"
                            name={'website'}
                            value={formik.values.website}
                            onChangeAction={formik.handleChange}
                            required={'required'}
                            error={''}
                        />
                    </div>
                    <div className="row">
                        <ViewText label={'Logo'} value={formData.logoName} />
                        {/*<ViewText*/}
                        {/*    label={'Logo'}*/}
                        {/*    divSize={'col-sm-8'}*/}
                        {/*    value={'logo.png'}*/}
                        {/*    className={'col-sm-8 form-group'}*/}
                        {/*/>*/}
                        {/*<Image*/}
                        {/*    src={`${URL_API}/portal/images/logo.png?${imageHash}`}*/}
                        {/*    style={{*/}
                        {/*        backgroundColor: backgroundImageColor,*/}
                        {/*        color: backgroundImageTextColor,*/}
                        {/*        border: '1px solid #999',*/}
                        {/*        display: 'inline-block',*/}
                        {/*        padding: '1px',*/}
                        {/*        borderRadius: '1px',*/}
                        {/*        height: '50px',*/}
                        {/*        boxShadow: '0 0 0 1px #fff inset',*/}
                        {/*    }}*/}
                        {/*/>*/}
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
                            value={formik.values.hoomLink}
                            onChangeAction={formik.handleChange}
                            error={''}
                        />
                        <InputText
                            label="Hoom key"
                            name={'hoomKey'}
                            value={formik.values.hoomKey}
                            onChangeAction={formik.handleChange}
                            error={''}
                        />
                    </div>
                    <div className="row">
                        <InputReactSelect
                            label={'Hoom e-mail template'}
                            name={'hoomEmailTemplateId'}
                            options={emailTemplates}
                            value={formik.values.hoomEmailTemplateId}
                            onChangeAction={(value, name) => formik.setFieldValue(name, value)}
                            isLoading={isLoading}
                            multi={false}
                        />
                        <InputReactSelect
                            label={'Hoom groep'}
                            name={'hoomGroupId'}
                            options={staticContactGroups}
                            value={formik.values.hoomGroupId}
                            onChangeAction={(value, name) => formik.setFieldValue(name, value)}
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
                            onClickAction={formik.handleSubmit}
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
