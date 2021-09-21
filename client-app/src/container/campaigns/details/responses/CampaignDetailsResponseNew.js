import React, { useEffect, useState } from 'react';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ContactsAPI from '../../../../api/contact/ContactsAPI';

function CampaignDetailsResponseNew({ campaignId, campaignName, fetchCampaignData, toggleShowNew }) {
    const [contacts, setContacts] = useState([]);
    const [contactId, setOrganisationId] = useState('');
    const [errors, setErrors] = useState({
        contact: false,
        hasErrors: false,
    });

    useEffect(function() {
        (async function fetchOrganisation() {
            try {
                const response = await ContactsAPI.getContactsPeek();

                setContacts(response);
            } catch (error) {
                alert('Er is iets misgegaan met ophalen van de contacten. Herlaad de pagina en probeer het nogmaals.');
            }
        })();
    }, []);

    function handleOrganisationChange(event) {
        setOrganisationId(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!contactId) {
            setErrors({
                contact: true,
                hasErrors: true,
            });
        }

        if (!errors.hasErrors) {
            try {
                await CampaignDetailsAPI.attachResponse(campaignId, contactId);

                fetchCampaignData();
                toggleShowNew();
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de organisatie! Herlaad de pagina en probeer het nogmaals.'
                );
            }
        }
    }

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText label={'Campagne'} name={'campaign'} value={campaignName} readOnly={true} />
                        <InputSelect
                            label={'Contact'}
                            size={'col-sm-6'}
                            name={'contactId'}
                            options={contacts}
                            value={contactId}
                            onChangeAction={handleOrganisationChange}
                            required={'required'}
                            optionName={'fullName'}
                            error={errors.contact}
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

export default CampaignDetailsResponseNew;
