import React, { useEffect, useState } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import MailgunEventListItem from './MailgunEventListItem';
import axiosInstance from '../../../api/default-setup/AxiosInstance';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

export default function MailgunEventListApp() {
    const perPage = 100;
    const errorEvents = ['rejected', 'failed_temporary', 'failed_permanent', 'complained', 'unsubscribed'];

    const [isLoading, setLoading] = useState(true);
    const [mailgunEvents, setMailgunEvents] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(0);
    const [errorText, setErrorText] = useState('');
    const [eventFilter, setEventFilter] = useState('all-error');
    const [domains, setDomains] = useState([]);
    const [domainFilter, setDomainFilter] = useState('');

    useEffect(() => {
        fetch();
        fetchMeta();
    }, []);

    useEffect(() => {
        fetch();
    }, [page, domainFilter, eventFilter]);

    const fetch = () => {
        setLoading(true);

        return axiosInstance
            .get('jory/mailgun-event', {
                params: {
                    jory: getFetchJory(),
                    meta: ['total'],
                },
            })
            .then(response => {
                setMailgunEvents(response.data.data);
                setTotalRecords(response.data.meta.total);
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met ophalen van de mailgun logs.');
                setLoading(false);
            });
    };

    const fetchFromMailgun = () => {
        setLoading(true);

        return axiosInstance
            .post('mailgun-event/fetch-from-mailgun')
            .then(() => {
                fetch();
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met ophalen van de mailgun logs bij mailgun.');
                setLoading(false);
            });
    };

    const fetchMeta = () => {
        return axiosInstance
            .get('jory/mailgun-domain', {
                params: {
                    jory: {
                        fld: ['id', 'domain'],
                        srt: ['domain'],
                    },
                },
            })
            .then(response => {
                setDomains(response.data.data);
            });
    };

    const loadingText = () => {
        if (errorText) {
            return errorText;
        }

        if (isLoading) {
            return 'Gegevens aan het laden.';
        }

        if (mailgunEvents.length === 0) {
            return 'Geen mailgun logs gevonden, kies een domein en type.';
        }

        return '';
    };

    const getFetchJory = () => {
        return {
            fld: ['id', 'event', 'recipient', 'subject', 'eventDate', 'deliveryStatus'],
            rlt: {
                domain: {
                    fld: ['domain'],
                },
            },
            srt: ['-eventDate'],
            flt: getFetchJoryFilter(),
            lmt: perPage,
            ofs: page * perPage,
        };
    };

    const getFetchJoryFilter = () => {
        let filter = {
            and: [],
        };

        if (domainFilter) {
            filter.and.push({
                f: 'mailgunDomainId',
                d: domainFilter,
            });
        }

        if (eventFilter) {
            if (eventFilter === 'all-error') {
                filter.and.push({
                    f: 'event',
                    o: 'in',
                    d: errorEvents,
                });
            } else {
                filter.and.push({
                    f: 'event',
                    d: eventFilter,
                });
            }
        }

        return filter;
    };

    return (
        <Panel className="col-md-12">
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={'refresh'} onClickAction={fetchFromMailgun} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3 className="text-center table-title">
                                Mailgun logs&nbsp;
                                <FaInfoCircle
                                    color={'blue'}
                                    size={'15px'}
                                    data-tip={
                                        'De mailgun logs worden elke nacht opgehaald,<br>je kan op het ververs icoontje klikken om direct de meest recente logs op te halen'
                                    }
                                    data-for={`tooltip-note`}
                                />
                                <ReactTooltip
                                    id={`tooltip-note`}
                                    effect="float"
                                    place="right"
                                    multiline={true}
                                    aria-haspopup="true"
                                />
                                &nbsp;
                                <FaQuestionCircle
                                    color={'blue'}
                                    size={'15px'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        window.open(
                                            'https://help.mailgun.com/hc/en-us/articles/203661564-What-do-each-of-the-event-filter-types-mean',
                                            '_blank'
                                        )
                                    }
                                />
                            </h3>
                        </div>
                        <div className="col-md-4">
                            <div className="pull-right">Resultaten: {totalRecords}</div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 margin-10-top">
                    <DataTable>
                        <DataTableHead>
                            <tr className="thead-title">
                                <DataTableHeadTitle title={'Datum'} width={'10%'} />
                                <DataTableHeadTitle title={'Domein'} width={'20%'} />
                                <DataTableHeadTitle title={'Type'} width={'10%'} />
                                <DataTableHeadTitle title={'Status'} width={'20%'} />
                                <DataTableHeadTitle title={'Aan'} width={'20%'} />
                                <DataTableHeadTitle title={'Onderwerp'} width={'20%'} />
                            </tr>
                        </DataTableHead>
                        <DataTableBody>
                            <tr className="thead-filter">
                                <th />
                                <th>
                                    <select
                                        className="form-control input-sm"
                                        value={domainFilter}
                                        onChange={e => setDomainFilter(e.target.value)}
                                    >
                                        <option />
                                        {domains.map(domain => (
                                            <option key={domain.id} value={domain.id}>
                                                {domain.domain}
                                            </option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <select
                                        className="form-control input-sm"
                                        value={eventFilter}
                                        onChange={e => setEventFilter(e.target.value)}
                                    >
                                        <option />
                                        <option key={'all-error'} value={'all-error'}>
                                            - alle fouten -
                                        </option>
                                        {[
                                            'accepted',
                                            'rejected',
                                            'delivered',
                                            'failed_temporary',
                                            'failed_permanent',
                                            'opened',
                                            'clicked',
                                            'unsubscribed',
                                            'complained',
                                            'stored',
                                        ].map(event => (
                                            <option key={event} value={event}>
                                                {event}
                                            </option>
                                        ))}
                                    </select>
                                </th>
                                <th />
                                <th />
                                <th />
                            </tr>

                            {loadingText() ? (
                                <tr>
                                    <td colSpan={6}>{loadingText()}</td>
                                </tr>
                            ) : (
                                mailgunEvents.map(mailgunLog => {
                                    return (
                                        <MailgunEventListItem
                                            key={mailgunLog.id}
                                            mailgunLog={mailgunLog}
                                            hasError={errorEvents.includes(mailgunLog.event)}
                                        />
                                    );
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                </div>
                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={p => setPage(p.selected)}
                        totalRecords={totalRecords}
                        initialPage={0}
                        recordsPerPage={perPage}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}
