import React, { useEffect, useState } from 'react';
import moment from 'moment';

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import axios from 'axios';
import MailboxAPI from '../../../../api/mailbox/MailboxAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';

moment.locale('nl');

function CampaignWorkflowSettingFormEdit({ campaign, fetchCampaignData, switchToView }) {
    const [formState, setFormState] = useState({
        ...campaign,
        defaultWorkflowMailboxId: campaign.defaultWorkflowMailbox?.id || null,
    });
    const [errors, setErrors] = useState({
        defaultWorkflowMailbox: false,
    });

    const [mailboxAddresses, setMailboxAddresses] = useState([]);

    useEffect(function() {
        axios.all([MailboxAPI.fetchMailboxesLoggedInUserPeek()]).then(
            axios.spread(mailboxAddresses => {
                setMailboxAddresses(mailboxAddresses.data.data);
            })
        );
    }, []);

    function setFieldValue(name, value) {
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let errorsObj = {};
        let hasErrors = false;

        setErrors(errorsObj);

        if (!hasErrors) {
            try {
                await CampaignDetailsAPI.updateCampaignWorkflowSetting(formState.id, formState);

                fetchCampaignData();
                switchToView();
            } catch (error) {
                alert('Er is iets misgegaan met het opslaan van de gegevens!');
            }
        }
    }

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                {/*<ViewText*/}
                {/*    label={'Standaard mailbox'}*/}
                {/*    value={formState.defaultWorkflowMailbox && formState.defaultWorkflowMailbox.name}*/}
                {/*/>*/}
                <InputReactSelect
                    label={'Standaard mailbox'}
                    name={'defaultWorkflowMailboxId'}
                    options={mailboxAddresses}
                    optionName={'email'}
                    value={formState.defaultWorkflowMailboxId}
                    onChangeAction={(value, name) => setFieldValue(name, value)}
                    clearable={true}
                />
            </div>
            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={switchToView} />
                    <ButtonText buttonText={'Opslaan'} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
                </div>
            </PanelFooter>
        </form>
    );
}

export default CampaignWorkflowSettingFormEdit;
