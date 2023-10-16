import React from 'react';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';

function FreeFieldsListFilter({ filter, handleChangeFilter, freeFieldsTables, freeFieldsFieldFormats }) {
    let tr = (
        <>
            <tr className="thead-filter">
                <th>
                    <select
                        className="form-control input-sm"
                        value={filter.tableName}
                        onChange={e => handleChangeFilter('tableName', e.target.value)}
                    >
                        <option />
                        {freeFieldsTables.map(model => {
                            return (
                                <option key={model.id} value={model.name}>
                                    {model.name}
                                </option>
                            );
                        })}
                    </select>
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
                    <select
                        className="form-control input-sm"
                        value={filter.formatName}
                        onChange={e => handleChangeFilter('fieldFormatName', e.target.value)}
                    >
                        <option />
                        {freeFieldsFieldFormats.map(model => {
                            return (
                                <option key={model.id} value={model.name}>
                                    {model.name}
                                </option>
                            );
                        })}
                    </select>
                </th>
                <th />
                <th />
            </tr>
        </>
    );
    return tr;
}

export default FreeFieldsListFilter;
