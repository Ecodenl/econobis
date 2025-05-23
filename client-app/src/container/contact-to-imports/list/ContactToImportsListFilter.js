import React from 'react';
import ContactToImportsAPI from '../../../api/contact-to-imports/ContactToImportsAPI';

function ContactToImportsListFilter({ filter, handleChangeFilter }) {
    let tr = (
        <>
            <tr className="thead-filter">
                <th />
                <th />
                <th />
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.initials}
                        onChange={e => handleChangeFilter('initials', e.target.value)}
                    />
                </th>
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.firstName}
                        onChange={e => handleChangeFilter('firstName', e.target.value)}
                    />
                </th>
                <th />
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.lastName}
                        onChange={e => handleChangeFilter('lastName', e.target.value)}
                    />
                </th>
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.street}
                        onChange={e => handleChangeFilter('street', e.target.value)}
                    />
                </th>
                <th />
                <th />
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.postal_code}
                        onChange={e => handleChangeFilter('postal_code', e.target.value)}
                    />
                </th>
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.city}
                        onChange={e => handleChangeFilter('city', e.target.value)}
                    />
                </th>
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.emailContact}
                        onChange={e => handleChangeFilter('emailContact', e.target.value)}
                    />
                </th>
                <th />
                <th />
                <th />
                <th />
                <th />
            </tr>
        </>
    );
    return tr;
}

export default ContactToImportsListFilter;
