import React, { useEffect, useState } from 'react';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

function CampaignDetailsOrganisationNew({ campaignId, campaignName, fetchCampaignData, toggleShowNew }) {
    const [organisations, setOrganisations] = useState([]);
    const [organisationId, setOrganisationId] = useState('');
    const [errors, setErrors] = useState({
        organisation: false,
        hasErrors: false,
    });

    useEffect(function() {
        (async function fetchOrganisation() {
            try {
                const response = await OrganisationAPI.getOrganisationPeek();

                setOrganisations(response);
            } catch (error) {
                alert(
                    'Er is iets misgegaan met ophalen van de organisaties! Herlaad de pagina en probeer het nogmaals.'
                );
            }
        })();
    }, []);

    function handleOrganisationChange(event) {
        setOrganisationId(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!organisationId) {
            setErrors({
                organisation: true,
                hasErrors: true,
            });
        }

        if (!errors.hasErrors) {
            try {
                await CampaignDetailsAPI.attachOrganisation(campaignId, organisationId);

                fetchCampaignData();
                toggleShowNew();
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de organisatie. Herlaad de pagina en probeer het nogmaals.'
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
                            label={'Organisatie'}
                            size={'col-sm-6'}
                            name={'organisationId'}
                            options={organisations}
                            value={organisationId}
                            onChangeAction={handleOrganisationChange}
                            required={'required'}
                            error={errors.organisation}
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

export default CampaignDetailsOrganisationNew;
