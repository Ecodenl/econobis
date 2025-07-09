import React, { useEffect, useReducer } from 'react';
import CampaignDetailsToolbar from './CampaignDetailsToolbar';
import CampaignDetailsForm from './CampaignDetailsForm';
import CampaignDetailsHarmonica from './CampaignDetailsHarmonica';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import CampaignDetailsAPI from '../../../api/campaign/CampaignDetailsAPI';
import { INITIAL_STATE, reducer } from './CampaignReducer';
import { useParams } from 'react-router-dom';

function CampaignDetailsApp() {
    const params = useParams();

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        fetchCampaignData();
    }, []);

    async function fetchCampaignData() {
        try {
            const response = await CampaignDetailsAPI.fetchCampaign({ id: params.id });

            updateResult(response.data.data);
        } catch (error) {
            setHasErrors(true);
            alert('Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina.');
        }
        setIsLoading(false);
    }

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    function updateResult(payload) {
        dispatch({
            type: 'updateResult',
            payload: payload,
        });
    }

    function setHasErrors(hasErrors) {
        dispatch({
            type: 'updateHasErrors',
            payload: hasErrors,
        });
    }

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12">
                    <CampaignDetailsToolbar campaign={state.result} />
                </div>

                <div className="col-md-12">
                    <CampaignDetailsForm
                        campaign={state.result}
                        isLoading={state.isLoading}
                        hasError={state.hasError}
                        fetchCampaignData={fetchCampaignData}
                    />
                </div>
            </div>
            <Panel className="col-md-3 harmonica">
                <PanelBody>
                    <CampaignDetailsHarmonica campaign={state.result} />
                </PanelBody>
            </Panel>
        </div>
    );
}

export default CampaignDetailsApp;
