import React, { useEffect, useState } from 'react';
import InspectionPersonAPI from '../../../../api/contact/InspectionPersonAPI';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

function CampaignDetailsProjectManagerNew({ campaignId, campaignName, fetchCampaignData, toggleShowNew }) {
    const [projectManagers, setProjectManagers] = useState([]);
    const [projectManagerId, setProjectManagerId] = useState('');
    const [errors, setErrors] = useState({
        projectManager: false,
        hasErrors: false,
    });

    useEffect(function() {
        (async function fetchProjectManager() {
            try {
                const response = await InspectionPersonAPI.getProjectManagerPeek();

                setProjectManagers(response);
            } catch (error) {
                alert(
                    'Er is iets misgegaan met ophalen van de projectmanagers! Herlaad de pagina en probeer het nogmaals.'
                );
            }
        })();
    }, []);

    function handleProjectManagerChange(event) {
        setProjectManagerId(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!projectManagerId) {
            setErrors({
                projectManager: true,
                hasErrors: true,
            });
        }

        if (!errors.hasErrors) {
            try {
                await CampaignDetailsAPI.attachProjectManager(campaignId, projectManagerId);

                fetchCampaignData();
                toggleShowNew();
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de projectmanager. Herlaad de pagina en probeer het nogmaals.'
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
                            label={'Projectmanager'}
                            size={'col-sm-6'}
                            name={'projectManagerId'}
                            options={projectManagers}
                            value={projectManagerId}
                            onChangeAction={handleProjectManagerChange}
                            required={'required'}
                            error={errors.projectManager}
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

export default CampaignDetailsProjectManagerNew;
