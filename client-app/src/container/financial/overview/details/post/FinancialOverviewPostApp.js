import React, { useEffect, useState } from 'react';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import FinancialOverviewPostList from './FinancialOverviewPostList';
import axios from 'axios';
import FinancialOverviewPostAPI from '../../../../../api/financial/overview/FinancialOverviewPostAPI';

function FinancialOverviewPostApp({ financialOverview }) {
    const [financialOverviewPosts, setFinancialOverviewPosts] = useState([]);
    const [meta, setMetaData] = useState({ total: 0 });
    const [isLoading, setLoading] = useState(true);

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchFinancialOverviewPosts();
        },
        [financialOverview.id]
    );

    function fetchFinancialOverviewPosts() {
        setLoading(true);
        setFinancialOverviewPosts([]);

        axios
            .all([FinancialOverviewPostAPI.fetchFinancialOverviewPosts(financialOverview.id)])
            .then(
                axios.spread(payloadFinancialOverviewPosts => {
                    setFinancialOverviewPosts(payloadFinancialOverviewPosts.data.data);
                    setMetaData(payloadFinancialOverviewPosts.data.meta);
                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function refreshFinancialOverviewPosts() {
        fetchFinancialOverviewPosts();
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Bestanden waardestaten post</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <FinancialOverviewPostList
                        financialOverviewPosts={financialOverviewPosts}
                        meta={meta}
                        isLoading={isLoading}
                        refreshFinancialOverviewPosts={refreshFinancialOverviewPosts}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default FinancialOverviewPostApp;
