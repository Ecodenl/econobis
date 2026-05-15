import React, { useEffect, useState } from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CooperationDetailsAPI from '../../../../api/cooperation/CooperationDetailsAPI';
import { useFormik } from 'formik';
import { CreateCooperationCleanupContactsExcludedGroupValidation } from '../Validation';
import axios from 'axios';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';

function CleanupContactsExcludedGroupNew({ cooperationId, toggleShowNew, addResult }) {
    const [contactGroups, setContactGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const formData = {
        cooperationId: cooperationId,
        contactGroupId: '',
    };

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } = useFormik({
        initialValues: formData,
        validationSchema: CreateCooperationCleanupContactsExcludedGroupValidation,
        onSubmit: values => {
            processSubmit(values);
        },
    });

    useEffect(function() {
        axios.all([ContactGroupAPI.peekContactGroups()]).then(
            axios.spread(contactGroups => {
                setContactGroups(contactGroups);
                setIsLoading(false);
            })
        );
    }, []);

    function processSubmit(values) {
        // Process to formdata
        let formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }

        // Send form data
        CooperationDetailsAPI.createCleanupContactsExcludedGroup(formData)
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
                            label={'Uitzonderingsgroep'}
                            size={'col-sm-11'}
                            name={'contactGroupId'}
                            options={contactGroups}
                            value={values.contactGroupId}
                            onChangeAction={handleChange}
                            required={'required'}
                            error={errors.contactGroupId && touched.contactGroupId}
                            errorMessage={errors.contactGroupId}
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

export default CleanupContactsExcludedGroupNew;
