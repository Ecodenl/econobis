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
                <th />
            </tr>
        </>
    );
    return tr;
}

export default PortalFreeFieldsPageListFilter;
