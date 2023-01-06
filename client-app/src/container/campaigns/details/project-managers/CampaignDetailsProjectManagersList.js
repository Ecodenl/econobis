import React from 'react';
import CampaignDetailsProjectManagerItem from './CampaignDetailsProjectManagerItem';

const CampaignDetailsProjectManagersList = ({ projectManagers, campaignId, fetchCampaignData }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Nummer</div>
                <div className="col-sm-4">Projectmanager</div>
                <div className="col-sm-4">Plaats</div>
                <div className="col-sm-1" />
            </div>
            {projectManagers.length > 0 ? (
                projectManagers.map(projectManager => {
                    return (
                        <CampaignDetailsProjectManagerItem
                            key={projectManager.id}
                            projectManager={projectManager}
                            campaignId={campaignId}
                            fetchCampaignData={fetchCampaignData}
                        />
                    );
                })
            ) : (
                <div>Geen betrokken projectmanagers bekend.</div>
            )}
        </div>
    );
};

export default CampaignDetailsProjectManagersList;
