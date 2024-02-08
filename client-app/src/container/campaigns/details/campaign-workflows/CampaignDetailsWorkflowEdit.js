import React, { useEffect, useState } from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

function CampaignDetailsWorkflowEdit({ campaignDetailsWorkflow, cancelEdit, updateResult }) {
    const [isLoading, setIsLoading] = useState(true);

    const formData = {
        campaignName: campaignDetailsWorkflow.campaignName,
        measureId: campaignDetailsWorkflow.measureId,
    };

    useEffect(function() {
        (async function fetchStatus() {
            try {
                const response = await CampaignDetailsAPI.getStatusPeek();

                setStatuses(response);
            } catch (error) {
                alert('Er is iets misgegaan met ophalen van de statussen! Herlaad de pagina en probeer het nogmaals.');
            }
        })();
    }, []);

    function handleStatusChange(event) {
        setStatusId(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!statusId) {
            setErrors({
                status: true,
                hasErrors: true,
            });
        }

        if (!errors.hasErrors) {
            try {
                await CampaignDetailsAPI.editCampaignWorkflow(campaignWorkflow);

                fetchCampaignData();
                toggleShowNew();
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de status. Herlaad de pagina en probeer het nogmaals.'
                );
            }
        }
    }

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputSelect
                            label={'Status'}
                            size={'col-sm-6'}
                            name={'statusId'}
                            options={statuses}
                            value={values.statusId}
                            onChangeAction={handleChange}
                            required={'required'}
                            error={errors.statusId && touched.statusId}
                            errorMessage={errors.status}
                        />
                        <InputSelect
                            label={'E-email template'}
                            size={'col-sm-6'}
                            name={'emailTemplatedWfId'}
                            options={emailTemplates}
                            value={values.emailTemplatedWfId}
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
        </form>
    );
}

export default CampaignDetailsWorkflowEdit;
