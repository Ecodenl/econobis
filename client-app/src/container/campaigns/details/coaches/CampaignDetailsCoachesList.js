import React from 'react';
import CampaignDetailsCoachItem from './CampaignDetailsCoachItem';

const CampaignDetailsCoachesList = ({ coaches, campaignId, fetchCampaignData }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Nummer</div>
                <div className="col-sm-4">Coach</div>
                <div className="col-sm-4">Plaats</div>
                <div className="col-sm-1" />
            </div>
            {coaches.length > 0 ? (
                coaches.map(coach => {
                    return (
                        <CampaignDetailsCoachItem
                            key={coach.id}
                            coach={coach}
                            campaignId={campaignId}
                            fetchCampaignData={fetchCampaignData}
                        />
                    );
                })
            ) : (
                <div>Geen betrokken coaches bekend.</div>
            )}
        </div>
    );
};

export default CampaignDetailsCoachesList;
