import React from 'react';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';
import moment from 'moment';
import housingFileLogMessageTypes from '../../../data/housingFileLogMessageTypes';

function HousingFileListFilter({ filter, handleChangeFilter }) {
    return (
        <tr className="thead-filter">
            <DataTableFilterDate
                value={filter.createdAt ? filter.createdAt : null}
                onChangeAction={value =>
                    handleChangeFilter('createdAt', value ? moment(value).format('YYYY-MM-DD') : null)
                }
            />
            <th>
                <select
                    className="form-control input-sm"
                    value={filter.messageType}
                    onChange={e => handleChangeFilter('messageType', e.target.value)}
                >
                    <option />
                    {housingFileLogMessageTypes.map(option => {
                        return (
                            <option key={option.code} value={option.code}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.messageText}
                    onChange={e => handleChangeFilter('messageText', e.target.value)}
                />
            </th>
        </tr>
    );
}

export default HousingFileListFilter;
