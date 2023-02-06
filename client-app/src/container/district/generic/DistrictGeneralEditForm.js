import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputText from "../../../components/form/InputText";
import {useFormik} from "formik";
import * as Yup from "yup";
import ButtonText from "../../../components/button/ButtonText";
import InputSelect from "../../../components/form/InputSelect";

export default function DistrictGeneralEditForm({initialValues, onSubmit, cancelAction}) {
    const {values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting} = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Verplicht'),
        }),
        onSubmit: (values, {setSubmitting}) => {
            onSubmit(values, setSubmitting);
        },
    });

    const durationOptions = [];

    for (let i = 30; i <= (60 * 3); i += 15) {
        durationOptions.push({id: i, name: i + ' minuten'});
    }

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
};
