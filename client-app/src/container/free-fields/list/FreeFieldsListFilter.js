import React from 'react';

function FreeFieldsListFilter({ filter, handleChangeFilter }) {
    return (
        <tr className="thead-filter">
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.tableName}
                    onChange={e => handleChangeFilter('tableName', e.target.value)}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.fieldName}
                    onChange={e => handleChangeFilter('fieldName', e.target.value)}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.fieldFormatName}
                    onChange={e => handleChangeFilter('fieldFormatName', e.target.value)}
                />
            </th>
        </tr>
    );
}

export default FreeFieldsListFilter;
