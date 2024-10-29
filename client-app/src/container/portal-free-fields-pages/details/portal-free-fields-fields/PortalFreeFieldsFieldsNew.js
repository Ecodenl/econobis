import React, { useEffect, useState } from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PortalFreeFieldsPageAPI from '../../../../api/portal-free-fields/PortalFreeFieldsPageAPI';
import { useFormik } from 'formik';
import { CreatePortalFreeFieldsFieldValidation } from '../Validation';
import axios from 'axios';
import FreeFieldsAPI from '../../../../api/free-fields/FreeFieldsAPI';
import InputToggle from '../../../../components/form/InputToggle';

function PortalFreeFieldsFieldsNew({ pageId, toggleShowNew, addResult }) {
    const [freeFieldsContacts, setFreeFieldsContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const formData = {
        pageId: pageId,
        fieldId: '',
        changePortal: false,
    };

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } = useFormik({
        initialValues: formData,
        validationSchema: CreatePortalFreeFieldsFieldValidation,
        onSubmit: values => {
            processSubmit(values);
        },
    });

    useEffect(function() {
        axios.all([FreeFieldsAPI.peekFreeFieldsContacts()]).then(
            axios.spread(payloadFreeFieldsContacts => {
                setFreeFieldsContacts(payloadFreeFieldsContacts.data.data);
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
        PortalFreeFieldsPageAPI.createPortalFreeFieldsField(formData)
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
                            label={'Vrij veld'}
                            size={'col-sm-6'}
                            name={'fieldId'}
                            options={freeFieldsContacts}
                            value={values.fieldId}
                            onChangeAction={handleChange}
                            required={'required'}
                            error={errors.fieldId && touched.fieldId}
                            errorMessage={errors.fieldId}
                        />
                        <InputToggle
                            label={'Aanpasbaar'}
                            size={'col-sm-6'}
                            name={'changePortal'}
                            value={Boolean(values.changePortal)}
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

export default PortalFreeFieldsFieldsNew;
