import React from 'react';

function ContactsInGroupListFilter({ filter, handleChangeFilter, isUsedInLaposta }) {
    return (
        <tr className="thead-filter">
            <th />
            <th />
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.fullName}
                    onChange={e => handleChangeFilter('fullName', e.target.value)}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.emailAddress}
                    onChange={e => handleChangeFilter('emailAddress', e.target.value)}
                />
            </th>
            {isUsedInLaposta ? <th /> : null}
            <th />
            <th />
        </tr>
    );
}

export default ContactsInGroupListFilter;
