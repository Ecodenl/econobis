import React, { useEffect, useState } from 'react';

import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { useFormik } from 'formik';
import CooperationDetailsAPI from '../../../../api/cooperation/CooperationDetailsAPI';

function CleanupItemEdit({ cleanupItem, cancelEdit, updateResult }) {
    const formData = {
        name: cleanupItem.name,
        dateRef: cleanupItem.dateRef,
        yearsForDelete: cleanupItem.yearsForDelete,
        hasRetentionPeriod: cleanupItem.hasRetentionPeriod,
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: formData,
        onSubmit: values => {
            processSubmit(values);
        },
    });

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
        CooperationDetailsAPI.updateCleanupItem(cleanupItem.id, formData)
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
                        <InputSelect
                            label={'Ouder dan'}
                            size={'col-sm-6'}
                            name={'yearsForDelete'}
                            options={[
                                { id: 1, name: '1' },
                                { id: 2, name: '2' },
                                { id: 3, name: '3' },
                                { id: 4, name: '4' },
                                { id: 5, name: '5' },
                                { id: 6, name: '6' },
                                { id: 7, name: '7' },
                                { id: 8, name: '8' },
                                { id: 9, name: '9' },
                                { id: 10, name: '10' },
                                { id: 99, name: '99' },
                            ]}
                            emptyOption={false}
                            value={values.yearsForDelete}
                            onChangeAction={handleChange}
                            readOnly={values.hasRetentionPeriod}
                        />
                        {values.hasRetentionPeriod ? <div style={{ color: 'red' }}>Heeft bewaarplicht</div> : null}
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

export default CleanupItemEdit;
