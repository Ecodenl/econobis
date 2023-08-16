import React, { useEffect, useState } from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CooperationDetailsAPI from '../../../../api/cooperation/CooperationDetailsAPI';
import { useFormik } from 'formik';
import { CreateCooperationHoomCampaignValidation } from '../Validation';
import axios from 'axios';
import CampaignsAPI from '../../../../api/campaign/CampaignsAPI';
import MeasureAPI from '../../../../api/measure/MeasureAPI';

function HoomCampaignsNew({ cooperationId, toggleShowNew, addResult }) {
    const [campaigns, setCampaigns] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const formData = {
        cooperationId: cooperationId,
        campaignId: '',
        measureId: '',
    };

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } = useFormik({
        initialValues: formData,
        validationSchema: CreateCooperationHoomCampaignValidation,
        onSubmit: values => {
            processSubmit(values);
        },
    });

    useEffect(function() {
        axios.all([CampaignsAPI.peekCampaigns(), MeasureAPI.peekMeasures()]).then(
            axios.spread((campaigns, measures) => {
                setCampaigns(campaigns);
                setMeasures(measures);
                setIsLoading(false);
            })
        );
    }, []);

    function processSubmit(values) {
        // Cleanup value data. Data don't needed for update.
        // const cleanUpFormFields = [
        //     'createdAt',
        //     'updatedAt',
        // ];
        // for (const item of cleanUpFormFields) {
        //     delete values[item];
        // }
        //

        // Process to formdata
        let formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }

        // Send form data
        CooperationDetailsAPI.createHoomCampaign(formData)
            .then(payload => {
                addResult(payload.data.data);
                toggleShowNew();
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
                        <InputSelect
                            label={'Campagne'}
                            size={'col-sm-6'}
                            name={'campaignId'}
                            options={campaigns}
                            value={values.campaignId}
                            onChangeAction={handleChange}
                            required={'required'}
                            error={errors.campaignId && touched.campaignId}
                            errorMessage={errors.campaignId}
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
                            onClickAction={toggleShowNew}
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

export default HoomCampaignsNew;
