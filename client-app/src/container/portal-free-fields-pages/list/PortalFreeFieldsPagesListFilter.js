import React from 'react';
import PortalFreeFieldsAPI from '../../../api/portal-free-fields/PortalFreeFieldsPageAPI';

function PortalFreeFieldsPageListFilter({ filter, handleChangeFilter }) {
    let tr = (
        <>
            <tr className="thead-filter">
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={filter.name}
                        onChange={e => handleChangeFilter('name', e.target.value)}
                    />
                </th>
                <th>
                    <select
                        className="form-control input-sm"
                        value={filter.isActive}
                        onChange={e => handleChangeFilter('isActive', e.target.value)}
                    >
                        <option />
                        <option key={1} value={1}>
                            Ja
                        </option>
                        <option key={0} value={0}>
                            Nee
                        </option>
                    </select>
                </th>
                <th />
            </tr>
        </>
    );
    return tr;
}

export default PortalFreeFieldsPageListFilter;
