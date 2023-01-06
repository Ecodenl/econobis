import React, { useEffect, useState } from 'react';
import InspectionPersonAPI from '../../../../api/contact/InspectionPersonAPI';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

function CampaignDetailsCoachNew({ campaignId, campaignName, fetchCampaignData, toggleShowNew }) {
    const [coaches, setCoaches] = useState([]);
    const [coachId, setCoachId] = useState('');
    const [errors, setErrors] = useState({
        coach: false,
        hasErrors: false,
    });

    useEffect(function() {
        (async function fetchCoach() {
            try {
                const response = await InspectionPersonAPI.getCoachPeek();

                setCoaches(response);
            } catch (error) {
                alert('Er is iets misgegaan met ophalen van de coaches! Herlaad de pagina en probeer het nogmaals.');
            }
        })();
    }, []);

    function handleCoachChange(event) {
        setCoachId(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!coachId) {
            setErrors({
                coach: true,
                hasErrors: true,
            });
        }

        if (!errors.hasErrors) {
            try {
                await CampaignDetailsAPI.attachCoach(campaignId, coachId);

                fetchCampaignData();
                toggleShowNew();
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de coach. Herlaad de pagina en probeer het nogmaals.'
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
                            label={'Coach'}
                            size={'col-sm-6'}
                            name={'coachId'}
                            options={coaches}
                            value={coachId}
                            onChangeAction={handleCoachChange}
                            required={'required'}
                            error={errors.coach}
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

export default CampaignDetailsCoachNew;
