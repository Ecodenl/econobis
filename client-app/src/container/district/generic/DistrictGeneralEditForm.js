import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputText from "../../../components/form/InputText";
import {useFormik} from "formik";
import * as Yup from "yup";
import ButtonText from "../../../components/button/ButtonText";
import ViewText from "../../../components/form/ViewText";

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
                            label="Weergavenaam"
                            name={'name'}
                            value={values.name}
                            onChangeAction={handleChange}
                            onBlurAction={handleBlur}
                            required={'required'}
                            error={errors.name && touched.name}
                            errorMessage={errors.name}
                        />
                        {/* Standaardtijd voor nu hardcoded, deze staat nu ook hardcoded in QuotationRequestPlanNewPlanningPanel en wordt later misschien nog dynamisch */}
                        <ViewText label={'Standaard duur afspraak'} value="90 minuten"/>
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
