import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputText from "../../../components/form/InputText";
import {useFormik} from "formik";
import * as Yup from "yup";
import ButtonText from "../../../components/button/ButtonText";

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
                        <div className="col-md-3"/>
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
