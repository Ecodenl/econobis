import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputSelectGroup from '../../../components/form/InputSelectGroup';

export default function EmailSplitViewFiltersPanel({ filters, setFilters, activeMailboxes }) {
    const statuses = useSelector(state => state.systemData.emailStatuses);
    const teams = useSelector(state => state.systemData.teams);
    const users = useSelector(state => state.systemData.users);
    const [responsibleUserId, setResponsibleUserId] = useState('');
    const [responsibleTeamId, setResponsibleTeamId] = useState('');

    const setResponsibleValue = val => {
        setResponsibleUserId('');
        setResponsibleTeamId('');

        if (val.indexOf('user') !== 0 && val.indexOf('team') !== 0) {
            setFilters({
                ...filters,
                responsibleUserId: '',
                responsibleTeamId: '',
                fetch: true,
            });
        }
        if (val.indexOf('user') === 0) {
            setResponsibleUserId(val.replace('user', ''));
            setFilters({
                ...filters,
                responsibleUserId: val.replace('user', ''),
                responsibleTeamId: '',
                fetch: true,
            });
        }

        if (val.indexOf('team') === 0) {
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
        if (responsibleUserId) {
            return 'user' + responsibleUserId;
        }
        if (responsibleTeamId) {
            return 'team' + responsibleTeamId;
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
                                        Onderwerp
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
                                        Aan
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
                                            {statuses.map(status => (
                                                <option key={status.id} value={status.id}>
                                                    {status.name}
                                                </option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            className="form-control input-sm"
                                            name={'responsible'}
                                            value={getResponsibleValue()}
                                            onChange={e => setResponsibleValue(e.target.value)}
                                        >
                                            <option value=""></option>
                                            <optgroup key={1} label={'Gebruikers'}>
                                                {users.map(user => {
                                                    return (
                                                        <option key={user.id} value={'user' + user.id}>
                                                            {user['fullName']}
                                                        </option>
                                                    );
                                                })}
                                            </optgroup>
                                            <optgroup key={1} label={'Teams'}>
                                                {teams.map(team => {
                                                    return (
                                                        <option key={team.id} value={'team' + team.id}>
                                                            {team['name']}
                                                        </option>
                                                    );
                                                })}
                                            </optgroup>
                                        </select>
                                    </th>
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
