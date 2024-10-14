import React, { useEffect, useState } from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import axios from 'axios';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputToggle from '../../../../components/form/InputToggle';

function CampaignDetailsWorkflowEdit({ campaignWorkflow, cancelEdit, fetchCampaignData }) {
    const [emailTemplatedIdWf, setEmailTemplateIdWf] = useState(campaignWorkflow.emailTemplateWorkflow.id);
    const [numberOfDaysToSendEmail, setNumberOfDaysToSendEmail] = useState(campaignWorkflow.numberOfDaysToSendEmail);
    const [mailCcToCoachWf, setMailCcToCoachWf] = useState(campaignWorkflow.mailCcToCoachWf);
    const [mailToContactWf, setMailToContactWf] = useState(campaignWorkflow.mailToContactWf);
    const [isActive, setIsActive] = useState(campaignWorkflow.isActive);
    const [errors, setErrors] = useState({
        emailTemplatedIdWf: false,
        numberOfDaysToSendEmail: false,
        mailCcToCoachWfOrMailToContactWf: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        emailTemplatedIdWf: '',
        numberOfDaysToSendEmail: '',
        mailCcToCoachWfOrMailToContactWf: '',
    });

    function handleChangeEmailTemplateChange(event) {
        setEmailTemplateIdWf(event.target.value);
    }

    function handleNumberOfDaysToSendEmailChange(event) {
        setNumberOfDaysToSendEmail(event.target.value);
    }

    function handleIsActiveChange(event) {
        setIsActive(event.target.checked);
    }

    function handleMailCcToCoachWfChange(event) {
        setMailCcToCoachWf(event.target.checked);
    }

    function handleMailToContactWfChange(event) {
        setMailToContactWf(event.target.checked);
    }

    const [emailtemplates, setEmailtemplates] = useState([]);

    useEffect(function() {
        axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek()]).then(
            axios.spread((emailtemplates, mailboxAddresses) => {
                setEmailtemplates(emailtemplates);
            })
        );
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        let errors = {
            emailTemplatedIdWf: false,
            numberOfDaysToSendEmail: false,
            mailCcToCoachWfOrMailToContactWf: false,
        };
        let errorMessages = {
            emailTemplatedIdWf: '',
            numberOfDaysToSendEmail: '',
            mailCcToCoachWfOrMailToContactWf: '',
        };
        let hasErrors = false;

        if (!emailTemplatedIdWf) {
            errors.emailTemplatedIdWf = true;
            errorMessages.emailTemplatedIdWf = 'E-email template is verplicht.';
            hasErrors = true;
        }

        if (numberOfDaysToSendEmail === null || numberOfDaysToSendEmail === '') {
            errors.numberOfDaysToSendEmail = true;
            errorMessages.numberOfDaysToSendEmail = 'Aantal dagen e-mail na deze status is verplicht';
            hasErrors = true;
        } else {
            console.log('numberOfDaysToSendEmail');
            console.log(numberOfDaysToSendEmail);
        }
        if (numberOfDaysToSendEmail < 0) {
            errors.numberOfDaysToSendEmail = true;
            errorMessages.numberOfDaysToSendEmail = 'Aantal dagen e-mail na deze status mag niet negatief zijn';
            hasErrors = true;
        }
        if (mailCcToCoachWf == 0 && mailToContactWf == 0) {
            errors.mailCcToCoachWfOrMailToContactWf = true;
            errorMessages.mailCcToCoachWfOrMailToContactWf =
                'Minimaal één van de volgende opties is verplicht: Email cc naar coach en/of Email naar bewoner';
            hasErrors = true;
        }

        if (!hasErrors) {
            try {
                const data = new FormData();
                data.append('emailTemplatedIdWf', emailTemplatedIdWf);
                data.append('numberOfDaysToSendEmail', numberOfDaysToSendEmail);
                data.append('isActive', isActive == 1 ? 1 : 0);
                data.append('mailCcToCoachWf', mailCcToCoachWf == 1 ? 1 : 0);
                data.append('mailToContactWf', mailToContactWf == 1 ? 1 : 0);

                await CampaignDetailsAPI.editCampaignWorkflow(campaignWorkflow.id, data);

                fetchCampaignData();
                cancelEdit(true);
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
                            label={'E-email template'}
                            size={'col-sm-6'}
                            name={'emailTemplatedWfId'}
                            options={emailtemplates}
                            value={emailTemplatedIdWf}
                            required={'required'}
                            onChangeAction={handleChangeEmailTemplateChange}
                            error={errors.emailTemplatedIdWf}
                            errorMessage={errorMessages.emailTemplatedIdWf}
                        />

                        <InputText
                            label={'Aantal dagen e-mail na deze status'}
                            divSize={'col-sm-6'}
                            type={'number'}
                            id={'numberOfDaysToSendEmail'}
                            name={'numberOfDaysToSendEmail'}
                            value={numberOfDaysToSendEmail}
                            allowZero={true}
                            onChangeAction={handleNumberOfDaysToSendEmailChange}
                            required={'required'}
                            min={0}
                            error={errors.numberOfDaysToSendEmail}
                            errorMessage={errorMessages.numberOfDaysToSendEmail}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Actief'}
                            name={'isActive'}
                            value={Boolean(isActive)}
                            onChangeAction={handleIsActiveChange}
                        />
                        {campaignWorkflow.workflowForType === 'quotationrequest' ? (
                            <InputToggle
                                label={'Email cc naar coach'}
                                name={'mailCcToCoachWf'}
                                value={Boolean(mailCcToCoachWf)}
                                onChangeAction={handleMailCcToCoachWfChange}
                            />
                        ) : null}
                    </div>

                    <div className="row">
                        <div class="form-group col-sm-6 "></div>

                        {campaignWorkflow.workflowForType === 'quotationrequest' ? (
                            <InputToggle
                                label={'Email naar bewoner'}
                                name={'mailToContactWf'}
                                value={Boolean(mailToContactWf)}
                                onChangeAction={handleMailToContactWfChange}
                            />
                        ) : null}
                    </div>

                    {errors.mailCcToCoachWfOrMailToContactWf && (
                        <div className={'row'}>
                            <div className="form-group col-sm-6"></div>
                            <div className="col-sm-6 has-error-message">
                                {errorMessages.mailCcToCoachWfOrMailToContactWf}
                            </div>
                        </div>
                    )}

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
