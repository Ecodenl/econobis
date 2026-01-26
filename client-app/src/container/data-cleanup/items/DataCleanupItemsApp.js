import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DataCleanupItemsToolbar from './DataCleanupItemsToolbar';
import DataCleanupItemsList from './DataCleanupItemsList';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';

export default function DataCleanupItemsApp() {
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true);
    const [cleanupData, setCleanupData] = useState([]);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        fetchCleanupData();
    }, []);

    const fetchCleanupData = () => {
        setLoading(true);

        DataCleanupAPI.getCleanupItems()
            .then(data => {
                setCleanupData(data);
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met ophalen van de opschoon gegevens.');
                setLoading(false);
            });
    };

    const handleDataCleanupUpdateItems = cleanupType => {
        console.log('cleanupType');
        console.log(cleanupType);
        setLoading(true);

        DataCleanupAPI.updateItems(cleanupType)
            .then(data => {
                fetchCleanupData();
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met herberekenen van de opschoon gegevens.');
                setLoading(false);
            });
    };
    const confirmCleanup = cleanupType => {
        setLoading(true);

        DataCleanupAPI.executeCleanupItems(cleanupType)
            .then(data => {
                fetchCleanupData();
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met opschonen van de gegevens.');
                setLoading(false);
            });
    };

    const loadingText = () => {
        if (errorText) {
            return errorText;
        }

        if (isLoading) {
            return 'Gegevens aan het laden.';
        }

        if (cleanupData.length === 0) {
            return 'Geen opschoon gegevens gevonden!';
        }

        return '';
    };

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupItemsToolbar
                        setLoading={setLoading}
                        fetchCleanupData={fetchCleanupData}
                        handleDataCleanupUpdateItems={handleDataCleanupUpdateItems}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupItemsList
                        cleanupData={cleanupData}
                        handleDataCleanupUpdateItems={handleDataCleanupUpdateItems}
                        confirmCleanup={confirmCleanup}
                        isLoading={isLoading}
                        loadingText={loadingText}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}
