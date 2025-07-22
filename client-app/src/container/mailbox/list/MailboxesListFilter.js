import React from 'react';
import { connect } from 'react-redux';

const MailboxesListFilter = props => {
    return (
        <tr className="thead-filter">
            <th />
            <th />
            <th />
            <th />
            <th />
            <th>
                <select
                    className="form-control input-sm"
                    onChange={e => props.refreshData(e.target.value)}
                >
                    <option key={1} value="1">
                        ja
                    </option>
                    <option key={0} value="0">
                        nee
                    </option>
                </select>
            </th>
            <th />
        </tr>
    );
};

export default connect(null, null)(MailboxesListFilter);
