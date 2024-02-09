import React, { useEffect, useState } from 'react';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import axios from 'axios';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import MailboxAPI from '../../../../api/mailbox/MailboxAPI';

function CampaignDetailsWorkflowNew({ campaignId, toggleShowNew, addResult }) {
    const [statusesToSelect, setStatusesToSelect] = useState([]);
    const [statusId, setStatusId] = useState('');
    const [emailTemplatedIdWf, setEmailTemplateIdWf] = useState('');
    const [numberOfDaysToSendEmail, setNumberOfDaysToSendEmail] = useState('');
    const [errors, setErrors] = useState({
        status: false,
        hasErrors: false,
    });

    const [emailtemplates, setEmailtemplates] = useState([]);

    useEffect(function() {
        axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek()]).then(
            axios.spread((emailtemplates, mailboxAddresses) => {
                setEmailtemplates(emailtemplates);
            })
        );
    }, []);

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
                            options={emailtemplates}
                            value={emailTemplatedIdWf}
                            onChangeAction={handleChangeEmailTemplateChange}
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
