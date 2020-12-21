import React from 'react';
import DataTableFilterDate from '../../../../../components/dataTable/DataTableFilterDate';
import moment from 'moment';
import financialOverviewContactStatuses from '../../../../../data/financialOverviewContactStatuses';

function FinancialOverviewContactListFilter({
    showSelectFinancialOverviewContactsToSend,
    toggleCheckedAll,
    filter,
    handleChangeFilter,
}) {
    return (
        <tr className="thead-filter">
            {showSelectFinancialOverviewContactsToSend && (
                <th>
                    <input type="checkbox" onChange={toggleCheckedAll} />
                </th>
            )}
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.contact}
                    onChange={e => handleChangeFilter('contact', e.target.value)}
                />
            </th>
            <th>
                <select
                    className="form-control input-sm"
                    value={filter.statusId}
                    onChange={e => handleChangeFilter('statusId', e.target.value)}
                >
                    <option />
                    {financialOverviewContactStatuses.map(option => {
                        return (
                            <option key={option.code} value={option.code}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <DataTableFilterDate
                value={filter.dateSent ? filter.dateSent : null}
                onChangeAction={value =>
                    handleChangeFilter('dateSent', value ? moment(value).format('YYYY-MM-DD') : null)
                }
            />
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={filter.emailedTo}
                    onChange={e => handleChangeFilter('emailedTo', e.target.value)}
                />
            </th>
            <th />
        </tr>
    );
}

export default FinancialOverviewContactListFilter;
