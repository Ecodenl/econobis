import React, { useEffect } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputText from '../../../components/form/InputText';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonText from '../../../components/button/ButtonText';
import InputSelect from '../../../components/form/InputSelect';
import InputToggle from '../../../components/form/InputToggle';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';

export default function DistrictGeneralEditForm({ initialValues, onSubmit, cancelAction }) {
    const [emailTemplates, setEmailTemplates] = React.useState([]);
    const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Verplicht'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            onSubmit(values, setSubmitting);
        },
    });

    const durationOptions = [];
    for (let i = 30; i <= 60 * 5; i += 30) {
        durationOptions.push({ id: i, name: i + ' minuten' });
    }

    useEffect(() => {
        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            setEmailTemplates(payload);
        });
    }, []);

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label="Weergavenaam"
                            name={'name'}
                            value={values.name}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                            required={'required'}
                            error={errors.name && touched.name}
                            errorMessage={errors.name}
                        />
                        <InputSelect
                            label="Standaard duur afspraak"
                            name={'defaultDurationMinutes'}
                            value={values.defaultDurationMinutes}
                            options={durationOptions}
                            onChangeAction={handleChange}
                            emptyOption={false}
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label="Verstuur automatisch e-mail aan bewoner bij maken afspraak"
                            name={'sendEmailToContactWhenPlanned'}
                            value={values.sendEmailToContactWhenPlanned}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            size={'col-sm-5'}
                            textToolTip={`Deze e-mails worden verstuurd vanaf het primaire e-mail adres.`}
                        />
                        {values.sendEmailToContactWhenPlanned && (
                            <InputSelect
                                label="E-mail template"
                                name={'emailToContactTemplateId'}
                                value={values.emailToContactTemplateId}
                                options={emailTemplates}
                                onChangeAction={handleChange}
                            />
                        )}
                    </div>
                    <div className="row">
                        <InputToggle
                            label="Verstuur automatisch e-mail aan coach bij maken afspraak"
                            name={'sendEmailToCoachWhenPlanned'}
                            value={values.sendEmailToCoachWhenPlanned}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                            size={'col-sm-5'}
                            textToolTip={`Deze e-mails worden verstuurd vanaf het primaire e-mail adres.`}
                        />
                        {values.sendEmailToCoachWhenPlanned && (
                            <InputSelect
                                label="E-mail template"
                                name={'emailToCoachTemplateId'}
                                value={values.emailToCoachTemplateId}
                                options={emailTemplates}
                                onChangeAction={handleChange}
                            />
                        )}
                    </div>
                    <div className="row">
                        <InputToggle
                            label={'Gesloten'}
                            name={'closed'}
                            value={values.closed}
                            onChangeAction={event => {
                                event.persist();
                                setFieldValue(event.target.name, event.target.checked);
                            }}
                        />
                    </div>
                </PanelBody>

                <PanelBody>
                    <div className="pull-right btn-group" role="group">
                        {cancelAction && (
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={cancelAction}
                            />
                        )}
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                            loading={isSubmitting}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
}
