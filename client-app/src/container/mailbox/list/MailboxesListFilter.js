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
                    <option key={1} value="ja">
                        ja
                    </option>
                    <option key={0} value="nee">
                        nee
                    </option>
                </select>
            </th>
            <th />
        </tr>
    );
};

export default connect(null, null)(MailboxesListFilter);
