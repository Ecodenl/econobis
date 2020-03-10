import React from 'react';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';
import moment from 'moment';

function ProcessesListFilter({ filter, handleChangeFilter }) {
    return (
        <tr className="thead-filter">
            <DataTableFilterDate
                value={filter.createdAt ? filter.createdAt : null}
                onChangeAction={value =>
                    handleChangeFilter('createdAt', value ? moment(value).format('YYYY-MM-DD') : null)
                }
            />
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.value}
                    onChange={e => handleChangeFilter('value', e.target.value)}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.jobCategoryId}
                    onChange={e => handleChangeFilter('jobCategoryId', e.target.value)}
                />
            </th>
        </tr>
    );
}

export default ProcessesListFilter;
