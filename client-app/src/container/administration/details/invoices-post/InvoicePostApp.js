import React, { useEffect, useState } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import InvoicePostList from './InvoicePostList';
import axios from 'axios';
import InvoicePostAPI from '../../../../api/invoice/InvoicePostAPI';

function InvoicePostApp({ administrationId }) {
    const [invoicePosts, setInvoicePosts] = useState([]);
    const [meta, setMetaData] = useState({ total: 0 });
    const [isLoading, setLoading] = useState(true);

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchInvoicePosts();
        },
        [administrationId]
    );

    function fetchInvoicePosts() {
        setLoading(true);
        setInvoicePosts([]);

        axios
            .all([InvoicePostAPI.fetchInvoicePosts(administrationId)])
            .then(
                axios.spread(payloadInvoicePosts => {
                    setInvoicePosts(payloadInvoicePosts.data.data);
                    setMetaData(payloadInvoicePosts.data.meta);
                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function refreshInvoicePosts() {
        fetchInvoicePosts();
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Bestanden nota's post</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <InvoicePostList
                        invoicePosts={invoicePosts}
                        meta={meta}
                        isLoading={isLoading}
                        refreshInvoicePosts={refreshInvoicePosts}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default InvoicePostApp;
