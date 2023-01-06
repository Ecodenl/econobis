import React, { useEffect, useState } from 'react';
import InspectionPersonAPI from '../../../../api/contact/InspectionPersonAPI';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

function CampaignDetailsExternalPartyNew({ campaignId, campaignName, fetchCampaignData, toggleShowNew }) {
    const [externalParties, setExternalParties] = useState([]);
    const [externalPartyId, setExternalPartyId] = useState('');
    const [errors, setErrors] = useState({
        externalParty: false,
        hasErrors: false,
    });

    useEffect(function() {
        (async function fetchExternalParty() {
            try {
                const response = await InspectionPersonAPI.getExternalPartyPeek();

                setExternalParties(response);
            } catch (error) {
                alert(
                    'Er is iets misgegaan met ophalen van de externe partijen! Herlaad de pagina en probeer het nogmaals.'
                );
            }
        })();
    }, []);

    function handleExternalPartyChange(event) {
        setExternalPartyId(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!externalPartyId) {
            setErrors({
                externalParty: true,
                hasErrors: true,
            });
        }

        if (!errors.hasErrors) {
            try {
                await CampaignDetailsAPI.attachExternalParty(campaignId, externalPartyId);

                fetchCampaignData();
                toggleShowNew();
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de externe partij. Herlaad de pagina en probeer het nogmaals.'
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
                            label={'Externe partij'}
                            size={'col-sm-6'}
                            name={'externalPartyId'}
                            options={externalParties}
                            value={externalPartyId}
                            onChangeAction={handleExternalPartyChange}
                            required={'required'}
                            error={errors.externalParty}
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

export default CampaignDetailsExternalPartyNew;
