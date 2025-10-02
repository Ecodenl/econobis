import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

export default function EmailSplitViewFiltersPanel({ filters, setFilters, activeMailboxes, eigenOpenstaand }) {
    const statuses = useSelector(state => state.systemData.emailStatuses);
    const teams = useSelector(state => state.systemData.teams);
    const users = useSelector(state => state.systemData.users);
    const [responsibleUserId, setResponsibleUserId] = useState(
        filters.responsibleUserId ? filters.responsibleUserId : ''
    );
    const [responsibleTeamId, setResponsibleTeamId] = useState(
        filters.responsibleTeamId ? filters.responsibleTeamId : ''
    );

    const setResponsibleValue = val => {
        setResponsibleUserId('');
        setResponsibleTeamId('');

        if (val === 'noResponsible') {
            setFilters({
                ...filters,
                responsibleUserId: 'noResponsible',
                responsibleTeamId: '',
                fetch: true,
            });
        }

        if (val !== 'noResponsible' && val.indexOf('user') !== 0 && val.indexOf('team') !== 0) {
            setFilters({
                ...filters,
                responsibleUserId: '',
                responsibleTeamId: '',
                fetch: true,
            });
        }
        if (val !== 'noResponsible' && val.indexOf('user') === 0) {
            setResponsibleUserId(val.replace('user', ''));
            setFilters({
                ...filters,
                responsibleUserId: val.replace('user', ''),
                responsibleTeamId: '',
                fetch: true,
            });
        }

        if (val !== 'noResponsible' && val.indexOf('team') === 0) {
            setResponsibleTeamId(val.replace('team', ''));
            setFilters({
                ...filters,
                responsibleUserId: '',
                responsibleTeamId: val.replace('team', ''),
                fetch: true,
            });
        }
    };

    const getResponsibleValue = () => {
        if (filters.responsibleUserId === 'noResponsible') {
            return 'noResponsible';
        }
        if (filters.responsibleUserId) {
            return 'user' + filters.responsibleUserId;
        }
        if (filters.responsibleTeamId) {
            return 'team' + filters.responsibleTeamId;
        }

        return ''; // Geen
    };

    return (
        <div className="panel panel-default">
            <div className="panel-body panel-small">
                <div className="row">
                    <div className="col-md-12">
                        <table
                            className="table table-condensed table-hover table-striped col-xs-12"
                            style={{ marginBottom: '0px' }}
                        >
                            <thead>
                                <tr className="thead-title">
                                    <th className="" width="10%">
                                        Van e-mail
                                    </th>
                                    <th className="" width="10%">
                                        Gekoppeld contact
                                    </th>
                                    <th className="" width="15%">
                                        Onderwerp{' '}
                                        <span>
                                            <FaInfoCircle
                                                color={'white'}
                                                size={'15px'}
                                                data-tip={
                                                    'Er wordt hier alleen gezocht in de eerste 150 tekens van het onderwerp.'
                                                }
                                                data-for={`tooltip-subject-filter`}
                                            />
                                            <ReactTooltip
                                                id={`tooltip-subject-filter`}
                                                effect="float"
                                                place="right"
                                                multiline={true}
                                                aria-haspopup="true"
                                            />
                                        </span>
                                    </th>
                                    <th className="" width="7%">
                                        Van
                                    </th>
                                    <th className="" width="7%">
                                        T/m
                                    </th>
                                    <th className="" width="10%">
                                        Status
                                    </th>
                                    <th className="" width="10%">
                                        Verantwoordelijke
                                    </th>
                                    <th className="" width="11%">
                                        Mailbox
                                    </th>
                                    <th className="" width="10%">
                                        Aan{' '}
                                        <span>
                                            <FaInfoCircle
                                                color={'white'}
                                                size={'15px'}
                                                data-tip={'Bij veel emails kan deze filter lang duren.'}
                                                data-for={`tooltip-to-filter`}
                                            />
                                            <ReactTooltip
                                                id={`tooltip-to-filter`}
                                                effect="float"
                                                place="right"
                                                multiline={true}
                                                aria-haspopup="true"
                                            />
                                        </span>
                                    </th>
                                    <th className="" width="5%">
                                        Bijlage
                                    </th>
                                </tr>
                                <tr className="thead-filter">
                                    <th>
                                        <input
                                            type="text"
                                            className="form-control input-sm"
                                            value={filters.from}
                                            onChange={e => {
                                                setFilters({ ...filters, from: e.target.value });
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            className="form-control input-sm"
                                            value={filters.contact}
                                            onChange={e => {
                                                setFilters({ ...filters, contact: e.target.value });
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            className="form-control input-sm"
                                            value={filters.subject}
                                            onChange={e => {
                                                setFilters({ ...filters, subject: e.target.value });
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="date"
                                            className="form-control input-sm"
                                            value={filters.dateSentStart}
                                            onChange={e => {
                                                setFilters({ ...filters, dateSentStart: e.target.value, fetch: true });
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="date"
                                            className="form-control input-sm"
                                            value={filters.dateSentEnd}
                                            onChange={e => {
                                                setFilters({ ...filters, dateSentEnd: e.target.value, fetch: true });
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <select
                                            className="form-control input-sm"
                                            value={filters.status}
                                            onChange={e => {
                                                setFilters({ ...filters, status: e.target.value, fetch: true });
                                            }}
                                        >
                                            <option></option>
                                            {statuses
                                                .filter(status => {
                                                    if (!eigenOpenstaand || status.id !== 'closed') {
                                                        return true;
                                                    }
                                                })
                                                .map(status => (
                                                    <option key={status.id} value={status.id}>
                                                        {status.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </th>

                                    {eigenOpenstaand ? (
                                        <th style={{ color: 'red', verticalAlign: 'middle' }}>
                                            <span>Eigen</span>
                                        </th>
                                    ) : (
                                        <th>
                                            <select
                                                className="form-control input-sm"
                                                name={'responsible'}
                                                value={getResponsibleValue()}
                                                onChange={e => setResponsibleValue(e.target.value)}
                                            >
                                                <option value=""></option>
                                                <option style={{ fontWeight: 'normal' }} value="noResponsible">
                                                    Zonder verantwoordelijke
                                                </option>
                                                <optgroup label={'Gebruikers'}>
                                                    {users.map(user => {
                                                        return (
                                                            <option value={'user' + user.id}>{user['fullName']}</option>
                                                        );
                                                    })}
                                                </optgroup>
                                                <optgroup label={'Teams'}>
                                                    {teams.map(team => {
                                                        return <option value={'team' + team.id}>{team['name']}</option>;
                                                    })}
                                                </optgroup>
                                            </select>
                                        </th>
                                    )}
                                    <th>
                                        <select
                                            className="form-control input-sm"
                                            value={filters.mailbox}
                                            onChange={e => {
                                                setFilters({ ...filters, mailbox: e.target.value, fetch: true });
                                            }}
                                        >
                                            <option></option>
                                            {activeMailboxes.map(mailbox => (
                                                <option key={mailbox.id} value={mailbox.id}>
                                                    {mailbox.name}
                                                </option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            className="form-control input-sm"
                                            value={filters.to}
                                            onChange={e => {
                                                setFilters({ ...filters, to: e.target.value });
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <select
                                            className="form-control input-sm"
                                            value={filters.attachment}
                                            onChange={e => {
                                                setFilters({ ...filters, attachment: e.target.value, fetch: true });
                                            }}
                                        >
                                            <option></option>
                                            <option value={1}>Ja</option>
                                        </select>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
