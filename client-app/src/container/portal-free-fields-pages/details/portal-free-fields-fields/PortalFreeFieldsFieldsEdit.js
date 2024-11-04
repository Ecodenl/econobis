import React, { useEffect, useState } from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PortalFreeFieldsPageAPI from '../../../../api/portal-free-fields/PortalFreeFieldsPageAPI';
import { useFormik } from 'formik';
import { UpdatePortalFreeFieldsFieldValidation } from '../Validation';
import axios from 'axios';
// import FreeFieldsAPI from '../../../../api/free-fields/FreeFieldsAPI';
import InputToggle from '../../../../components/form/InputToggle';
import ViewText from '../../../../components/form/ViewText';

function PortalFreeFieldsFieldsEdit({ portalFreeFieldsField, cancelEdit, updateResult }) {
    // const [isLoading, setIsLoading] = useState(true);

    const formData = {
        fieldName:
            portalFreeFieldsField && portalFreeFieldsField.freeFieldsField
                ? portalFreeFieldsField.freeFieldsField.fieldName
                : 'Onbekend',
        changePortal: portalFreeFieldsField ? portalFreeFieldsField.changePortal : false,
    };

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } = useFormik({
        initialValues: formData,
        validationSchema: UpdatePortalFreeFieldsFieldValidation,
        onSubmit: values => {
            processSubmit(values);
        },
    });

    // useEffect(function() {
    //     axios.all([FreeFieldsAPI.peekFreeFieldsContacts()]).then(
    //         axios.spread((payloadFreeFieldsContacts) => {
    //             console.log(payloadFreeFieldsContacts.data.data);
    //             setFreeFieldsContacts(payloadFreeFieldsContacts.data.data);
    //             setIsLoading(false);
    //         })
    //     );
    // }, []);

    function processSubmit(values) {
        // Cleanup value data. Data don't needed for update.
        // const cleanUpFormFields = [
        //     'pageId',
        //     'fieldId',
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
        PortalFreeFieldsPageAPI.updatePortalFreeFieldsField(portalFreeFieldsField.id, formData)
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
                        <ViewText label={'Vrij veld'} size={'col-sm-6'} name={'fieldName'} value={values.fieldName} />
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

export default PortalFreeFieldsFieldsEdit;
