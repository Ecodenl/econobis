import React, { useEffect, useState } from 'react';

import CampaignDetailsIntakesList from './CampaignDetailsIntakesList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

function CampaignDetailsIntakes({ campaignId }) {
    const [data, setData] = useState({ data: [], meta: {} });
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchCampaignIntakes();
    }, [page]);

    async function fetchCampaignIntakes() {
        try {
            // page +1 (frontend pagination starts with 0, backend pagination starts with 1)
            const response = await CampaignDetailsAPI.fetchCampaignIntakes({ id: campaignId, page: page + 1 });

            setData(response.data);
            setLoading(false);
        } catch (error) {
            alert('Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina.');
            setLoading(false);
        }
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Gerelateerde intakes</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <CampaignDetailsIntakesList {...data} isLoading={isLoading} page={page} setPage={setPage} />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default CampaignDetailsIntakes;
