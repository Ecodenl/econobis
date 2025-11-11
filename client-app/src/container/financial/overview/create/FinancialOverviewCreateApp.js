import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewCreateList from './FinancialOverviewCreateList';
import FinancialOverviewContactsAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import FinancialOverviewCreateViewPdf from './FinancialOverviewCreateViewPdf';
import FinancialOverviewCreateViewEmail from './FinancialOverviewCreateViewEmail';
import FinancialOverviewCreateToolbar from './FinancialOverviewCreateToolbar';

export default function FinancialOverviewCreateApp() {
    // let op: we verwachten nu óók een optionele param
    // route: /waardestaat/:id/aanmaken/:type/:financialOverviewContactId ==> single contact voor interim!
    // route: /waardestaat/:id/aanmaken/:type                             ==> bulk contacten voor regulier!
    //        hier komt de lijst uit Redux:  useSelector(state => state.financialOverviewPreview.selectedIds)
    const { id, type, financialOverviewContactId } = useParams();
    const selectedIds = useSelector(state => state.financialOverviewPreview.selectedIds);

    const [financialOverviewContacts, setFinancialOverviewContacts] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isSingleMode = !!financialOverviewContactId;

    // bulk-mode fetch
    const fetchBulk = useCallback(() => {
        setIsLoading(true);

        FinancialOverviewContactsAPI.getFinancialOverviewContactsForSending(id, selectedIds, type)
            .then(payload => {
                const contacts = payload?.data?.data ?? [];
                setFinancialOverviewContacts(contacts);

                // eventueel eerste selecteren
                if (contacts.length > 0) {
                    setSelectedContactId(contacts[0].id);
                } else {
                    setSelectedContactId('');
                }

                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [id, type, selectedIds]);

    // single-mode fetch
    const fetchSingle = useCallback(() => {
        if (!financialOverviewContactId) return;

        setIsLoading(true);

        // je had al een endpoint voor "interim" / "1 contact"
        FinancialOverviewContactsAPI.fetchFinancialOverviewContactForInterim(financialOverviewContactId)
            .then(payload => {
                const contact = payload?.data?.data ?? null;
                if (contact) {
                    // we stoppen 'm in een array zodat de rest van de UI gelijk kan blijven
                    setFinancialOverviewContacts(contact ? [contact] : []);
                    setSelectedContactId(contact ? contact.id : '');
                } else {
                    setFinancialOverviewContacts([]);
                    setSelectedContactId('');
                }
                setIsLoading(false);
            })
            .catch(() => {
                setFinancialOverviewContacts([]);
                setSelectedContactId('');
                setIsLoading(false);
            });
    }, [financialOverviewContactId]);

    // kies welke fetch we doen
    useEffect(() => {
        if (isSingleMode) {
            fetchSingle();
        } else {
            fetchBulk();
        }
    }, [isSingleMode, fetchSingle, fetchBulk]);

    const changeFinancialOverviewContact = id => {
        setSelectedContactId(id);
    };

    const amountOfContacts = financialOverviewContacts ? financialOverviewContacts.length : 0;

    return (
        <div>
            {/* toolbar */}
            <div className="row">
                <div className="col-md-12 margin-10-top">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <FinancialOverviewCreateToolbar
                                    type={type}
                                    selectedIds={isSingleMode ? [financialOverviewContactId] : selectedIds}
                                    amountOfFinancialOverviewContacts={amountOfContacts}
                                    financialOverviewId={id}
                                />
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="row">
                {/* lijst links */}
                <div className="col-md-2">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-financial-overview-contacts-list'}>
                                <FinancialOverviewCreateList
                                    financialOverviewContacts={financialOverviewContacts}
                                    isLoading={isLoading}
                                    changeFinancialOverviewContact={changeFinancialOverviewContact}
                                />
                            </PanelBody>
                        </Panel>
                    </div>
                </div>

                {/* rechts afhankelijk van type */}
                {type === 'email' ? (
                    <>
                        <div className="col-md-5">
                            <div className="col-md-12 margin-10-top">
                                <Panel>
                                    <PanelBody>
                                        <FinancialOverviewCreateViewPdf
                                            financialOverviewContactId={selectedContactId}
                                            isLoading={isLoading}
                                            amountOfFinancialOverviewContacts={amountOfContacts || -1}
                                        />
                                    </PanelBody>
                                </Panel>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="col-md-12 margin-10-top">
                                <Panel>
                                    <PanelBody>
                                        <FinancialOverviewCreateViewEmail
                                            financialOverviewContactId={selectedContactId}
                                            isLoading={isLoading}
                                            amountOfFinancialOverviewContacts={amountOfContacts || -1}
                                        />
                                    </PanelBody>
                                </Panel>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="col-md-6">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <FinancialOverviewCreateViewPdf financialOverviewContactId={selectedContactId} />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
