import React, { useEffect, useState } from 'react';

import DataCleanupItemsToolbar from './DataCleanupItemsToolbar';
import DataCleanupItemsList from './DataCleanupItemsList';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import Modal from '../../../components/modal/Modal';

import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';

export default function DataCleanupItemsApp() {
    const [isLoading, setIsLoading] = useState(true);
    const [cleanupData, setCleanupData] = useState([]);
    const [globalAlert, setGlobalAlert] = useState(null);
    const [cleanupErrorsByItemId, setCleanupErrorsByItemId] = useState({});

    const [showCleanupAllModal, setShowCleanupAllModal] = useState(false);
    const [cleanupAllBusy, setCleanupAllBusy] = useState(false);

    const [hasDeterminedItems, setHasDeterminedItems] = useState(false);
    const [softDeletedContactsCount, setSoftDeletedContactsCount] = useState(null);
    const [showForceDeleteContactsModal, setShowForceDeleteContactsModal] = useState(false);
    const [forceDeleteBusy, setForceDeleteBusy] = useState(false);

    const isBusyUpdateItem = isBusyItem => {
        setCleanupData(prev =>
            prev.map(item => (item.id === isBusyItem.id ? { ...item, dateDetermined: 'Bezig...' } : item))
        );
    };
    const isBusyCleanupItem = isBusyItem => {
        setCleanupData(prev =>
            prev.map(item => (item.id === isBusyItem.id ? { ...item, dateCleanedUp: 'Bezig...' } : item))
        );
    };
    const clearCleanupItem = isBusyItem => {
        setCleanupData(prev => prev.map(item => (item.id === isBusyItem.id ? { ...item, dateCleanedUp: '' } : item)));
    };
    const replaceCleanupItem = updatedItem => {
        setCleanupData(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    };
    const setErrorsForItem = (id, errors) => {
        setCleanupErrorsByItemId(prev => ({ ...prev, [id]: errors || [] }));
    };

    const getErrorsForItem = id => cleanupErrorsByItemId[id] || [];

    useEffect(() => {
        fetchCleanupData();
        fetchForceDeleteContactsStats();
    }, []);
    useEffect(() => {
        setHasDeterminedItems((cleanupData || []).some(i => (i?.determinedCount ?? 0) > 0));
    }, [cleanupData]);

    const fetchCleanupData = () => {
        setIsLoading(true);

        DataCleanupAPI.getCleanupItems()
            .then(payload => {
                setGlobalAlert(null);
                setCleanupData(payload ?? []);
                setIsLoading(false);
            })
            .catch(() => {
                setGlobalAlert({
                    type: 'danger',
                    text: 'Er is iets misgegaan met ophalen van de opschoon gegevens.',
                });
                setIsLoading(false);
            });
    };

    const fetchForceDeleteContactsStats = () => {
        DataCleanupAPI.getForceDeleteContactsStats()
            .then(payload => {
                setSoftDeletedContactsCount(payload?.softDeletedContactsCount ?? 0);
            })
            .catch(() => {
                // stil falen is ok; dan toon je geen count
                setSoftDeletedContactsCount(null);
            });
    };

    const handleDataCleanupUpdateItemsAll = () => {
        setIsLoading(true);

        setGlobalAlert({
            type: 'info',
            text: 'Herberekenen alles wordt uitgevoerd…',
        });

        DataCleanupAPI.updateItemsAll()
            .then(payload => {
                setCleanupData(payload ?? []);
                setCleanupErrorsByItemId({});

                setGlobalAlert({
                    type: 'success',
                    text: 'Herberekenen alles is uitgevoerd.',
                });
                setIsLoading(false);
            })
            .catch(() => {
                setGlobalAlert({
                    type: 'danger',
                    text: 'Er is iets misgegaan met herberekenen van alle opschoon items.',
                });
                setIsLoading(false);
            });
    };

    const handleDataCleanupUpdateItem = cleanupItem => {
        isBusyUpdateItem(cleanupItem);
        return DataCleanupAPI.updateItem(cleanupItem.codeRef)
            .then(updatedItem => {
                setGlobalAlert(null);

                if (updatedItem) {
                    replaceCleanupItem(updatedItem);
                    setErrorsForItem(updatedItem.id, []);
                }
                return updatedItem;
            })
            .catch(err => {
                setGlobalAlert({
                    type: 'danger',
                    text: `Er is iets misgegaan met herberekenen van onderdeel ${cleanupItem.name}.`,
                });
                throw err;
            });
    };

    const handleDataCleanupCleanupItemsAll = () => {
        const hasWork = (cleanupData || []).some(i => (i?.determinedCount ?? 0) > 0);

        if (!hasWork) {
            setGlobalAlert({
                type: 'info',
                text:
                    'Er zijn geen items om op te schonen. Herbereken eerst (Herbereken alles) als je een nieuwe selectie wilt maken.',
            });
            return;
        }

        setShowCleanupAllModal(true);
    };

    const onConfirmCleanupAll = () => {
        setCleanupAllBusy(true);

        setGlobalAlert({
            type: 'info',
            text: 'Opschonen alles wordt uitgevoerd…',
        });

        DataCleanupAPI.cleanupItemsAll()
            .then(results => {
                setGlobalAlert(null);

                (results || []).forEach(r => {
                    if (r?.item) replaceCleanupItem(r.item);
                    if (r?.item?.id) setErrorsForItem(r.item.id, r.errors || []);
                });

                const failed = (results || []).filter(r => r?.statusCode >= 400);
                if (failed.length) {
                    setGlobalAlert({
                        type: 'danger',
                        text: `Opschonen alles uitgevoerd, maar ${failed.length} item(s) hadden fouten. Klik op het waarschuwing-icoon per item voor details.`,
                    });
                } else {
                    setGlobalAlert({
                        type: 'success',
                        text: 'Opschonen alles is uitgevoerd.',
                    });
                }

                setCleanupAllBusy(false);
                setShowCleanupAllModal(false);
            })
            .catch(err => {
                const results = err?.response?.data?.data?.results ?? [];
                const backendMessage = err?.response?.data?.message;

                (results || []).forEach(r => {
                    if (r?.item) replaceCleanupItem(r.item);
                    if (r?.item?.id) setErrorsForItem(r.item.id, r.errors || []);
                });

                const failed = (results || []).filter(r => (r?.statusCode ?? 0) >= 400);

                const text =
                    failed.length > 0
                        ? `Opschonen alles uitgevoerd, maar ${failed.length} item(s) hadden fouten. Klik op het waarschuwing-icoon per item voor details.`
                        : backendMessage || 'Er is iets misgegaan met opschonen van alle items.';

                setGlobalAlert({
                    type: 'danger',
                    text,
                });

                setCleanupAllBusy(false);
                setShowCleanupAllModal(false);
            });
    };

    const confirmCleanup = cleanupItem => {
        isBusyCleanupItem(cleanupItem);

        return DataCleanupAPI.executeCleanupItem(cleanupItem.codeRef)
            .then(res => {
                const updatedItem = res?.data;
                const message = res?.message;

                if (message) {
                    setGlobalAlert({ type: 'info', text: message });
                } else {
                    setGlobalAlert(null);
                }

                if (updatedItem) {
                    replaceCleanupItem(updatedItem);
                    setErrorsForItem(updatedItem.id, []);
                }
                return updatedItem;
            })

            .catch(err => {
                const updatedItem = err?.response?.data?.data;
                if (updatedItem) {
                    replaceCleanupItem(updatedItem);
                } else {
                    clearCleanupItem(cleanupItem);
                }

                setGlobalAlert({
                    type: 'danger',
                    text: `Er is iets misgegaan met opschonen van de gegevens van onderdeel ${cleanupItem.name}.`,
                });

                throw err;
            });
    };

    const handleForceDeleteContacts = () => {
        setShowForceDeleteContactsModal(true);
    };

    const onConfirmForceDeleteContacts = () => {
        setForceDeleteBusy(true);

        setGlobalAlert({ type: 'info', text: 'Hard verwijderen van soft-verwijderde contacten wordt uitgevoerd…' });

        DataCleanupAPI.forceDeleteContacts()
            .then(res => {
                const results = res?.data?.results ?? [];
                const msg = res?.message;

                const failed = results.filter(r => (r?.statusCode ?? 0) >= 400);

                if (failed.length) {
                    setGlobalAlert({
                        type: 'danger',
                        text:
                            msg ||
                            `Hard verwijderen uitgevoerd, maar ${failed.length} contact(en) konden niet worden verwijderd.`,
                    });
                    // todo optioneel: toon details in console of maak een “details modal”
                    console.log(failed);
                } else {
                    setGlobalAlert({ type: 'success', text: msg || 'Hard verwijderen is uitgevoerd.' });
                }

                setForceDeleteBusy(false);
                setShowForceDeleteContactsModal(false);

                // todo optioneel: refresh data / counters / lijst
                fetchCleanupData();
                fetchForceDeleteContactsStats();
            })
            .catch(err => {
                const backendMessage = err?.response?.data?.message;
                setGlobalAlert({
                    type: 'danger',
                    text: backendMessage || 'Er is iets misgegaan bij hard verwijderen.',
                });

                setForceDeleteBusy(false);
                setShowForceDeleteContactsModal(false);
            });
    };

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupItemsToolbar
                        fetchCleanupData={fetchCleanupData}
                        handleDataCleanupUpdateItemsAll={handleDataCleanupUpdateItemsAll}
                        handleDataCleanupCleanupItemsAll={handleDataCleanupCleanupItemsAll}
                        handleForceDeleteContacts={handleForceDeleteContacts}
                        softDeletedContactsCount={softDeletedContactsCount}
                        isBusy={isLoading || cleanupAllBusy || forceDeleteBusy}
                        hasDeterminedItems={hasDeterminedItems}
                    />
                </div>

                {globalAlert ? (
                    <div className="col-md-12 margin-10-top">
                        <div className={`alert alert-${globalAlert.type}`} style={{ position: 'relative' }}>
                            <button
                                type="button"
                                onClick={() => setGlobalAlert(null)}
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 6,
                                    border: 0,
                                    background: 'transparent',
                                    fontSize: 18,
                                    lineHeight: '18px',
                                    cursor: 'pointer',
                                }}
                                aria-label="Sluiten"
                                title="Sluiten"
                            >
                                ×
                            </button>
                            {globalAlert.text}
                        </div>
                    </div>
                ) : null}

                <div className="col-md-12 margin-10-top">
                    <DataCleanupItemsList
                        cleanupData={cleanupData}
                        handleDataCleanupUpdateItem={handleDataCleanupUpdateItem}
                        confirmCleanup={confirmCleanup}
                        isLoading={isLoading}
                        getErrorsForItem={getErrorsForItem}
                        setErrorsForItem={setErrorsForItem}
                    />
                </div>

                {showCleanupAllModal ? (
                    <Modal
                        closeModal={() => !cleanupAllBusy && setShowCleanupAllModal(false)}
                        confirmAction={onConfirmCleanupAll}
                        buttonConfirmText="Opschonen alles"
                        buttonClassName={'btn-danger'}
                        title="Bevestig opschonen van alle items"
                        loading={cleanupAllBusy}
                    >
                        <div>
                            Weet u zeker dat u <strong>alle</strong> opschoon-items wilt uitvoeren?
                            <br />
                            <br />
                            Deze verwijderactie is niet terug te draaien.
                        </div>
                    </Modal>
                ) : null}

                {showForceDeleteContactsModal ? (
                    <Modal
                        closeModal={() => !forceDeleteBusy && setShowForceDeleteContactsModal(false)}
                        confirmAction={onConfirmForceDeleteContacts}
                        buttonConfirmText="Contacten hard verwijderen"
                        buttonClassName={'btn-danger'}
                        title="Bevestig hard verwijderen"
                        loading={forceDeleteBusy}
                    >
                        <div>
                            Weet u zeker dat u <strong>alle</strong> soft-verwijderde contacten hard wilt verwijderen?
                            <br />
                            <br />
                            Deze actie is niet terug te draaien.
                        </div>
                    </Modal>
                ) : null}
            </PanelBody>
        </Panel>
    );
}
