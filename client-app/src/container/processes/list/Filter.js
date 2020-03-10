import React from 'react';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';
import moment from 'moment';
import jobCategories from '../../../data/jobCategories';

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
                <select
                    className="form-control input-sm"
                    value={filter.jobCategoryId}
                    onChange={e => handleChangeFilter('jobCategoryId', e.target.value)}
                >
                    <option />
                    {jobCategories.map(option => {
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
                    value={filter.value}
                    onChange={e => handleChangeFilter('value', e.target.value)}
                />
            </th>
        </tr>
    );
}

export default ProcessesListFilter;
