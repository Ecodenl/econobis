import React, { useState } from 'react';
import CampaignDetailsResponseView from './CampaignDetailsResponseView';
import CampaignDetailsResponseItemDelete from './CampaignDetailsReponseItemDelete';

function CampaignDetailsResponseItem({ response, campaignId, fetchCampaignData }) {
    const [state, setState] = useState({
        showActionButtons: false,
        highlightLine: '',
        showDelete: false,
    });

    function onLineEnter() {
        setState({
            ...state,
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    }

    function onLineLeave() {
        setState({
            ...state,
            showActionButtons: false,
            highlightLine: '',
        });
    }

    function toggleDelete() {
        setState({ showDelete: !state.showDelete });
    }

    return (
        <div>
            <CampaignDetailsResponseView
                highlightLine={state.highlightLine}
                showActionButtons={state.showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                toggleDelete={toggleDelete}
                response={response}
            />
            {state.showDelete && (
                <CampaignDetailsResponseItemDelete
                    toggleDelete={toggleDelete}
                    contactId={response.contact.id}
                    campaignId={campaignId}
                    fetchCampaignData={fetchCampaignData}
                />
            )}
        </div>
    );
}

export default CampaignDetailsResponseItem;
