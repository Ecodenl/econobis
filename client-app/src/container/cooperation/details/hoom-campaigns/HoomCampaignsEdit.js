import React, { useEffect, useState } from 'react';

import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { useFormik } from 'formik';
import { UpdateCooperationHoomCampaignValidation } from '../Validation';
import axios from 'axios';
import MeasureAPI from '../../../../api/measure/MeasureAPI';
import CooperationDetailsAPI from '../../../../api/cooperation/CooperationDetailsAPI';
import InputText from '../../../../components/form/InputText';

function HoomCampaignsEdit({ hoomCampaign, cancelEdit, updateResult }) {
    const [measures, setMeasures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const formData = {
        campaignName: hoomCampaign.campaignName,
        measureId: hoomCampaign.measureId,
    };

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } = useFormik({
        initialValues: formData,
        validationSchema: UpdateCooperationHoomCampaignValidation,
        onSubmit: values => {
            processSubmit(values);
        },
    });

    useEffect(function() {
        axios.all([MeasureAPI.peekMeasures()]).then(
            axios.spread(measures => {
                setMeasures(measures);
                setIsLoading(false);
            })
        );
    }, []);

    function processSubmit(values) {
        // Cleanup value data. Data don't needed for update.
        const cleanUpFormFields = ['campaignName'];
        for (const item of cleanUpFormFields) {
            delete values[item];
        }

        // Process to formdata
        let formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }

        // Send form data
        CooperationDetailsAPI.updateHoomCampaign(hoomCampaign.id, formData)
            .then(payload => {
                updateResult(payload.data.data);
            })
            .catch(error => {
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    }
    return (
        <div>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={'Campagne'}
                            size={'col-sm-6'}
                            name={'campaignName'}
                            value={values.campaignName}
                            readOnly={true}
                        />
                        <InputSelect
                            label={'Maatregel specifiek'}
                            size={'col-sm-6'}
                            name={'measureId'}
                            options={measures}
                            value={values.measureId}
                            onChangeAction={handleChange}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={cancelEdit}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
}

export default HoomCampaignsEdit;
