import React, { useEffect, useState } from 'react';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

function CampaignDetailsWorkflowNew({ campaignId, toggleShowNew, addResult }) {
    const [statusesToSelect, setStatusesToSelect] = useState([]);
    const [statusId, setStatusId] = useState('');
    const [emailTemplatedIdWf, setEmailTemplateId] = useState('');
    const [errors, setErrors] = useState({
        status: false,
        hasErrors: false,
    });

    useEffect(function() {
        (async function fetchStatus() {
            try {
                const response = await CampaignDetailsAPI.getStatusPeek();

                setStatusesToSelect(response);
            } catch (error) {
                alert('Er is iets misgegaan met ophalen van de statussen! Herlaad de pagina en probeer het nogmaals.');
            }
        })();
    }, []);

    function handleStatusChange(event) {
        setStatusId(event.target.value);
    }

    function handleEmailTemplateChange(event) {
        setEmailTemplateId(event.target.value);
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
                await CampaignDetailsAPI.addCampaignWorkflow(campaignWorkflow);

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
                            options={statusesToSelect}
                            value={statusId}
                            onChangeAction={handleStatusChange}
                            required={'required'}
                            error={errors.statusId && touched.statusId}
                            errorMessage={errors.status}
                        />
                        <InputSelect
                            label={'E-email template'}
                            size={'col-sm-6'}
                            name={'emailTemplatedIdWf'}
                            options={emailTemplates}
                            value={emailTemplatedIdWf}
                            onChangeAction={handleChangeEmailTemplateChange}
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
        </form>
    );
}

export default CampaignDetailsWorkflowNew;
