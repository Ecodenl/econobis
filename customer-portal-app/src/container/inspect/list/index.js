import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import LoadingView from '../../../components/general/LoadingView';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowDown } from 'react-icons/all';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestAPI';

function Inspectlist(props) {
    const [quotationRequestsArray, setQuotationRequestsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statuses, setStatuses] = useState([]);
    const [contactFullNameFilter, setContactFullNameFilter] = useState('');
    const [measureFilter, setMeasureFilter] = useState('');
    const [streetPostalCodeCityFilter, setStreetPostalCodeCityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [datePlannedFromFilter, setDatePlannedFromFilter] = useState('');
    const [datePlannedToFilter, setDatePlannedToFilter] = useState('');
    const [dateRecordedFromFilter, setDateRecordedFromFilter] = useState('');
    const [dateRecordedToFilter, setDateRecordedToFilter] = useState('');
    const [dateApprovedProjectManagerFromFilter, setDateApprovedProjectManagerFromFilter] = useState('');
    const [dateApprovedProjectManagerToFilter, setDateApprovedProjectManagerToFilter] = useState('');
    const [dateReleasedFromFilter, setDateReleasedFromFilter] = useState('');
    const [dateReleasedToFilter, setDateReleasedToFilter] = useState('');
    const [dateApprovedClientFromFilter, setDateApprovedClientFromFilter] = useState('');
    const [dateApprovedClientToFilter, setDateApprovedClientToFilter] = useState('');
    const [dateApprovedExternalFromFilter, setDateApprovedExternalFromFilter] = useState('');
    const [dateApprovedExternalToFilter, setDateApprovedExternalToFilter] = useState('');
    const [sortOn, setSortOn] = useState({ col: 'contactFullName', desc: false });

    useEffect(() => {
        QuotationRequestAPI.fetchAllQuotationRequestStatus().then(payload => {
            setStatuses(payload.data.data);
        });

        QuotationRequestAPI.fetchAll(props.match.params.campaignId).then(response => {
            setQuotationRequestsArray(response.data);
            setIsLoading(false);
        });
    }, []);

    const getFilteredQuotationRequests = () => {
        let varQuotationRequestsArray = quotationRequestsArray;
        if (contactFullNameFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return quotationRequest.contactFullName.toUpperCase().includes(contactFullNameFilter.toUpperCase());
            });
        }
        if (streetPostalCodeCityFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return quotationRequest.streetPostalCodeCity
                    .toUpperCase()
                    .includes(streetPostalCodeCityFilter.toUpperCase());
            });
        }
        if (statusFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return quotationRequest.status.id === parseInt(statusFilter);
            });
        }
        if (datePlannedFromFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    quotationRequest.datePlanned != '' &&
                    moment(quotationRequest.datePlanned).format('YYYY-MM-DD') >=
                        moment(datePlannedFromFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (datePlannedToFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    moment(quotationRequest.datePlanned).format('YYYY-MM-DD') <=
                    moment(datePlannedToFilter).format('YYYY-MM-DD')
                );
            });
        }

        if (dateRecordedFromFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    quotationRequest.dateRecorded != '' &&
                    moment(quotationRequest.dateRecorded).format('YYYY-MM-DD') >=
                        moment(dateRecordedFromFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateRecordedToFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    moment(quotationRequest.dateRecorded).format('YYYY-MM-DD') <=
                    moment(dateRecordedToFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateApprovedProjectManagerFromFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    quotationRequest.dateApprovedProjectManager != '' &&
                    moment(quotationRequest.dateApprovedProjectManager).format('YYYY-MM-DD') >=
                        moment(dateApprovedProjectManagerFromFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateApprovedProjectManagerToFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    moment(quotationRequest.dateApprovedProjectManager).format('YYYY-MM-DD') <=
                    moment(dateApprovedProjectManagerToFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateReleasedFromFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    quotationRequest.dateReleased != '' &&
                    moment(quotationRequest.dateReleased).format('YYYY-MM-DD') >=
                        moment(dateReleasedFromFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateReleasedToFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    moment(quotationRequest.dateReleased).format('YYYY-MM-DD') <=
                    moment(dateReleasedToFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateApprovedClientFromFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    quotationRequest.dateApprovedClient != '' &&
                    moment(quotationRequest.dateApprovedClient).format('YYYY-MM-DD') >=
                        moment(dateApprovedClientFromFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateApprovedClientToFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    moment(quotationRequest.dateApprovedClient).format('YYYY-MM-DD') <=
                    moment(dateApprovedClientToFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateApprovedExternalFromFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    quotationRequest.dateApprovedExternal != '' &&
                    moment(quotationRequest.dateApprovedExternal).format('YYYY-MM-DD') >=
                        moment(dateApprovedExternalFromFilter).format('YYYY-MM-DD')
                );
            });
        }
        if (dateApprovedExternalToFilter) {
            varQuotationRequestsArray = varQuotationRequestsArray.filter(quotationRequest => {
                return (
                    moment(quotationRequest.dateApprovedExternal).format('YYYY-MM-DD') <=
                    moment(dateApprovedExternalToFilter).format('YYYY-MM-DD')
                );
            });
        }

        return sortOn.desc
            ? varQuotationRequestsArray.sort((a, b) => (a[sortOn.col] < b[sortOn.col] ? 1 : -1))
            : varQuotationRequestsArray.sort((a, b) => (a[sortOn.col] > b[sortOn.col] ? 1 : -1));
    };

    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                <Row>
                    <Col>
                        <h1 className="content-heading">Overzicht buurtaanpak</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {isLoading ? (
                            <LoadingView />
                        ) : quotationRequestsArray.length === 0 ? (
                            'Geen gegevens beschikbaar.'
                        ) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>
                                            Naam
                                            <br />
                                            <FiArrowUp
                                                onClick={() => setSortOn({ col: 'contactFullName', desc: false })}
                                            />
                                            <FiArrowDown
                                                onClick={() => setSortOn({ col: 'contactFullName', desc: true })}
                                            />
                                        </th>
                                        <th>
                                            Adres
                                            <br />
                                            <FiArrowUp
                                                onClick={() =>
                                                    setSortOn({
                                                        col: 'streetPostalCodeCity',
                                                        desc: false,
                                                    })
                                                }
                                            />
                                            <FiArrowDown
                                                onClick={() =>
                                                    setSortOn({
                                                        col: 'streetPostalCodeCity',
                                                        desc: true,
                                                    })
                                                }
                                            />
                                        </th>
                                        <th>Maatregel specifiek</th>
                                        <th>
                                            Status
                                            <br />
                                            <FiArrowUp onClick={() => setSortOn({ col: 'statusOrder', desc: false })} />
                                            <FiArrowDown
                                                onClick={() => setSortOn({ col: 'statusOrder', desc: true })}
                                            />
                                        </th>
                                        <th>
                                            Datum afspraak
                                            <br />
                                            <FiArrowUp onClick={() => setSortOn({ col: 'datePlanned', desc: false })} />
                                            <FiArrowDown
                                                onClick={() => setSortOn({ col: 'datePlanned', desc: true })}
                                            />
                                        </th>
                                        <th>
                                            Afspraak gedaan op
                                            <br />
                                            <FiArrowUp
                                                onClick={() => setSortOn({ col: 'dateRecorded', desc: false })}
                                            />
                                            <FiArrowDown
                                                onClick={() => setSortOn({ col: 'dateRecorded', desc: true })}
                                            />
                                        </th>
                                        <th>
                                            Datum akkoord projectleider
                                            <br />
                                            <FiArrowUp
                                                onClick={() =>
                                                    setSortOn({ col: 'dateApprovedProjectManager', desc: false })
                                                }
                                            />
                                            <FiArrowDown
                                                onClick={() =>
                                                    setSortOn({ col: 'dateApprovedProjectManager', desc: true })
                                                }
                                            />
                                        </th>
                                        <th>
                                            Datum uitgebracht
                                            <br />
                                            <FiArrowUp
                                                onClick={() => setSortOn({ col: 'dateReleased', desc: false })}
                                            />
                                            <FiArrowDown
                                                onClick={() => setSortOn({ col: 'dateReleased', desc: true })}
                                            />
                                        </th>
                                        <th>
                                            Datum akkoord bewoner
                                            <br />
                                            <FiArrowUp
                                                onClick={() => setSortOn({ col: 'dateApprovedClient', desc: false })}
                                            />
                                            <FiArrowDown
                                                onClick={() => setSortOn({ col: 'dateApprovedClient', desc: true })}
                                            />
                                        </th>
                                        <th>
                                            Datum akkoord toekenning
                                            <br />
                                            <FiArrowUp
                                                onClick={() => setSortOn({ col: 'dateApprovedExternal', desc: false })}
                                            />
                                            <FiArrowDown
                                                onClick={() => setSortOn({ col: 'dateApprovedExternal', desc: true })}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type="text"
                                                className={`text-input w-input content`}
                                                value={contactFullNameFilter}
                                                onChange={e => setContactFullNameFilter(e.target.value)}
                                                style={{ width: '100px' }}
                                                title={'Filter op naam'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type="text"
                                                className={`text-input w-input content`}
                                                value={streetPostalCodeCityFilter}
                                                onChange={e => setStreetPostalCodeCityFilter(e.target.value)}
                                                style={{ width: '100px' }}
                                                title={'Filter op adres'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type="text"
                                                className={`text-input w-input content`}
                                                value={measureFilter}
                                                onChange={e => setMeasureFilter(e.target.value)}
                                                style={{ width: '100px' }}
                                                title={'Filter op maatregel specifiek'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <select
                                                className="select-field w-select content"
                                                value={statusFilter}
                                                onChange={e => setStatusFilter(e.target.value)}
                                                style={{ width: '100px' }}
                                                title={'Filter op status'}
                                            >
                                                <option />
                                                {statuses.map(option => {
                                                    return (
                                                        <option key={option.id} value={option.id}>
                                                            {option.opportunityActionName} - {option.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={datePlannedFromFilter}
                                                onChange={e => setDatePlannedFromFilter(e.target.value)}
                                                title={'Filter op datum afspraak vanaf'}
                                            />
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={datePlannedToFilter}
                                                onChange={e => setDatePlannedToFilter(e.target.value)}
                                                title={'Filter op datum afspraak t/m'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateRecordedFromFilter}
                                                onChange={e => setDateRecordedFromFilter(e.target.value)}
                                                title={'Filter op datum opname vanaf'}
                                            />
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateRecordedToFilter}
                                                onChange={e => setDateRecordedToFilter(e.target.value)}
                                                title={'Filter op datum opname t/m'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateApprovedProjectManagerFromFilter}
                                                onChange={e => setDateApprovedProjectManagerFromFilter(e.target.value)}
                                                title={'Filter op datum akkoord projectleider vanaf'}
                                            />
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateApprovedProjectManagerToFilter}
                                                onChange={e => setDateApprovedProjectManagerToFilter(e.target.value)}
                                                title={'Filter op datum akkoord projectleider t/m'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateReleasedFromFilter}
                                                onChange={e => setDateReleasedFromFilter(e.target.value)}
                                                title={'Filter op datum uitgebracht vanaf'}
                                            />
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateReleasedToFilter}
                                                onChange={e => setDateReleasedToFilter(e.target.value)}
                                                title={'Filter op datum uitgebracht t/m'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateApprovedClientFromFilter}
                                                onChange={e => setDateApprovedClientFromFilter(e.target.value)}
                                                title={'Filter op datum akkoord bewoner vanaf'}
                                            />
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateApprovedClientToFilter}
                                                onChange={e => setDateApprovedClientToFilter(e.target.value)}
                                                title={'Filter op datum akkoord bewoner t/m'}
                                            />
                                        </th>
                                        <th style={{ verticalAlign: ' top' }}>
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateApprovedExternalFromFilter}
                                                onChange={e => setDateApprovedExternalFromFilter(e.target.value)}
                                                title={'Filter op datum akkoord toekenning vanaf'}
                                            />
                                            <input
                                                type={'date'}
                                                className={`text-input w-input content`}
                                                value={dateApprovedExternalToFilter}
                                                onChange={e => setDateApprovedExternalToFilter(e.target.value)}
                                                title={'Filter op datum akkoord toekenning t/m'}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredQuotationRequests().map(quotationRequest => (
                                        <tr key={quotationRequest.id}>
                                            <td>{quotationRequest.contactFullName}</td>
                                            <td>
                                                {props.match.params.campaignId ? (
                                                    <Link
                                                        to={`/schouwen/campagne/${props.match.params.campaignId}/${quotationRequest.id}`}
                                                    >
                                                        {quotationRequest.streetPostalCodeCity}
                                                    </Link>
                                                ) : (
                                                    <Link to={`/schouwen/${quotationRequest.id}`}>
                                                        {quotationRequest.streetPostalCodeCity}
                                                    </Link>
                                                )}
                                            </td>
                                            <td>{quotationRequest.measureNames}</td>
                                            <td>
                                                {quotationRequest.opportunityAction.name +
                                                    ' - ' +
                                                    quotationRequest.status.name}
                                            </td>
                                            <td>
                                                {quotationRequest.datePlanned && quotationRequest.datePlanned != ''
                                                    ? moment(quotationRequest.datePlanned).format('L HH:mm')
                                                    : ''}
                                            </td>
                                            <td>
                                                {quotationRequest.dateRecorded && quotationRequest.dateRecorded != ''
                                                    ? moment(quotationRequest.dateRecorded).format('L HH:mm')
                                                    : ''}
                                            </td>
                                            <td>
                                                {quotationRequest.dateApprovedProjectManager &&
                                                quotationRequest.dateApprovedProjectManager != ''
                                                    ? moment(quotationRequest.dateApprovedProjectManager).format('L')
                                                    : ''}
                                            </td>
                                            <td>
                                                {quotationRequest.dateReleased && quotationRequest.dateReleased != ''
                                                    ? moment(quotationRequest.dateReleased).format('L HH:mm')
                                                    : ''}
                                            </td>
                                            <td>
                                                {quotationRequest.dateApprovedClient &&
                                                quotationRequest.dateApprovedClient != ''
                                                    ? moment(quotationRequest.dateApprovedClient).format('L')
                                                    : ''}
                                            </td>
                                            <td>
                                                {quotationRequest.dateApprovedExternal &&
                                                quotationRequest.dateApprovedExternal != ''
                                                    ? moment(quotationRequest.dateApprovedExternal).format('L')
                                                    : ''}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default function InspectlistWithContext(props) {
    return <PortalUserConsumer>{({ user }) => <Inspectlist {...props} user={user} />}</PortalUserConsumer>;
}
