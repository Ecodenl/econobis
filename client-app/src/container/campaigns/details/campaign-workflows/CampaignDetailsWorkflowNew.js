import React, { useEffect, useState } from 'react';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import axios from 'axios';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputToggle from '../../../../components/form/InputToggle';

function CampaignDetailsWorkflowNew({ campaignId, toggleShowNew, workflowType, fetchCampaignData }) {
    const [statusId, setStatusId] = useState('');
    const [emailTemplatedIdWf, setEmailTemplateIdWf] = useState('');
    const [numberOfDaysToSendEmail, setNumberOfDaysToSendEmail] = useState('');
    const [mailCcToCoachWf, setMailCcToCoachWf] = useState(workflowType === 'opportunity' ? false : true);
    const [isActive, setIsActive] = useState(true);
    const [errors, setErrors] = useState({
        statusId: false,
        emailTemplatedIdWf: false,
        numberOfDaysToSendEmail: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        statusId: '',
        emailTemplatedIdWf: '',
        numberOfDaysToSendEmail: '',
    });

    const [emailtemplates, setEmailtemplates] = useState([]);
    const [statusesToSelect, setStatusesToSelect] = useState([]);

    useEffect(
        function() {
            axios
                .all([
                    EmailTemplateAPI.fetchEmailTemplatesPeek(),
                    CampaignDetailsAPI.fetchCampaignWorkflowStatuses({ campaignId, workflowType }),
                ])
                .then(
                    axios.spread((emailtemplates, statusesToSelect) => {
                        setEmailtemplates(emailtemplates);
                        setStatusesToSelect(statusesToSelect.data.data);
                    })
                );
        },
        [campaignId, workflowType]
    );
    // useEffect(function() {
    //     axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek()]).then(
    //         axios.spread((emailtemplates, mailboxAddresses) => {
    //             setEmailtemplates(emailtemplates);
    //         })
    //     );
    // }, []);

    function handleIsActiveChange(event) {
        setIsActive(event.target.value);
    }

    function handleMailCcToCoachWfChange(event) {
        setMailCcToCoachWf(event.target.value);
    }

    function handleStatusChange(event) {
        setStatusId(event.target.value);
    }

    function handleChangeEmailTemplateChange(event) {
        setEmailTemplateIdWf(event.target.value);
    }

    function handleNumberOfDaysToSendEmailChange(event) {
        setNumberOfDaysToSendEmail(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let errors = {
            statusId: false,
            emailTemplatedIdWf: false,
            numberOfDaysToSendEmail: false,
        };
        let errorMessages = {
            statusId: '',
            emailTemplatedIdWf: '',
            numberOfDaysToSendEmail: '',
        };
        let hasErrors = false;

        if (!statusId) {
            errors.statusId = true;
            errorMessages.statusId = 'Status is verplicht.';
            hasErrors = true;
        }

        if (!emailTemplatedIdWf) {
            errors.emailTemplatedIdWf = true;
            errorMessages.emailTemplatedIdWf = 'E-email template is verplicht.';
            hasErrors = true;
        }

        if (!numberOfDaysToSendEmail) {
            errors.numberOfDaysToSendEmail = true;
            errorMessages.numberOfDaysToSendEmail = 'Aantal dagen e-mail na deze status is verplicht';
            hasErrors = true;
        }

        if (!hasErrors) {
            const data = new FormData();
            data.append('statusId', statusId);
            data.append('emailTemplatedIdWf', emailTemplatedIdWf);
            data.append('numberOfDaysToSendEmail', numberOfDaysToSendEmail);
            data.append('workflowForType', workflowType);
            data.append('campaignId', campaignId);
            data.append('isActive', isActive == 1 ? 1 : 0);
            data.append('mailCcToCoachWf', mailCcToCoachWf == 1 ? 1 : 0);

            try {
                await CampaignDetailsAPI.addCampaignWorkflow(data);

                fetchCampaignData();
                toggleShowNew();
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de status. Herlaad de pagina en probeer het nogmaals.'
                );
            }
        } else {
            setErrors(errors);
            setErrorMessages(errorMessages);
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
                            error={errors.statusId}
                            errorMessage={errorMessages.statusId}
                        />
                        <InputSelect
                            label={'E-email template'}
                            size={'col-sm-6'}
                            name={'emailTemplatedIdWf'}
                            options={emailtemplates}
                            value={emailTemplatedIdWf}
                            required={'required'}
                            onChangeAction={handleChangeEmailTemplateChange}
                            error={errors.emailTemplatedIdWf}
                            errorMessage={errorMessages.emailTemplatedIdWf}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label={'Aantal dagen e-mail na deze status'}
                            divSize={'col-sm-6'}
                            type={'number'}
                            id={'numberOfDaysToSendEmail'}
                            name={'numberOfDaysToSendEmail'}
                            value={numberOfDaysToSendEmail}
                            onChangeAction={handleNumberOfDaysToSendEmailChange}
                            required={'required'}
                            min={0}
                            error={errors.numberOfDaysToSendEmail}
                            errorMessage={errorMessages.numberOfDaysToSendEmail}
                        />
                        {workflowType === 'quotationrequest' ? (
                            <InputToggle
                                label={'Email cc naar coach'}
                                name={'mailCcToCoachWf'}
                                value={Boolean(mailCcToCoachWf)}
                                onChangeAction={handleMailCcToCoachWfChange}
                            />
                        ) : null}
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Actief'}
                            name={'isActive'}
                            value={Boolean(isActive)}
                            onChangeAction={handleIsActiveChange}
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
