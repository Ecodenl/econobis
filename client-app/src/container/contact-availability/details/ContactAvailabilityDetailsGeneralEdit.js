import React from 'react';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";
import InputText from "../../../components/form/InputText";
import ButtonText from "../../../components/button/ButtonText";
import {useFormik} from "formik";
import ContactDetailsAPI from "../../../api/contact/ContactDetailsAPI";

export default function ContactAvailabilityDetailsGeneralEdit({contact, switchToView, onSave}) {
    const {values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting} = useFormik({
        initialValues: contact,
        onSubmit: (values, {setSubmitting}) => {
            ContactDetailsAPI.updateCoachAttributes(values)
                .then(() => {
                    switchToView();
                    onSave();
                    setSubmitting(false);
                })
                .catch(() => {
                    setSubmitting(false);
                    alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
                });
        },
    });

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <InputText
                            type="number"
                            label="Max afspraken per week"
                            name={'coachMaxAppointmentsPerWeek'}
                            value={values.coachMaxAppointmentsPerWeek}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                            required={'required'}
                            error={errors.coachMaxAppointmentsPerWeek && touched.coachMaxAppointmentsPerWeek}
                            errorMessage={errors.coachMaxAppointmentsPerWeek}
                        />
                        <InputText
                            type="number"
                            label="Min tijd tussen afspraken (minuten)"
                            name={'coachMinMinutesBetweenAppointments'}
                            value={values.coachMinMinutesBetweenAppointments}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                            required={'required'}
                            error={errors.coachMinMinutesBetweenAppointments && touched.coachMinMinutesBetweenAppointments}
                            errorMessage={errors.coachMinMinutesBetweenAppointments}
                        />
                    </div>
                </PanelBody>

                <PanelBody>
                    <div className="pull-right btn-group" role="group">
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
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
}