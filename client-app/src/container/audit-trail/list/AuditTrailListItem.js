import React, { Component } from 'react';

import moment from 'moment';

class AuditTrailListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            highlightRow: 'highlight-row',
        });
    }

    onRowLeave() {
        this.setState({
            highlightRow: '',
        });
    }

    render() {
        const { model, revisionableId, field, oldValue, newValue, valueChanged, changedBy, changedAt } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{model}</td>
                <td>{revisionableId}</td>
                <td>{field}</td>
                <td>
                    {valueChanged ? (
                        oldValue ? (
                            oldValue
                        ) : (
                            'Null'
                        )
                    ) : (
                        <span style={{ color: 'green' }} title="Waarde is niet gewijzigd">
                            {oldValue ? oldValue : 'Null'}
                        </span>
                    )}
                </td>
                <td>
                    {valueChanged ? (
                        newValue ? (
                            newValue
                        ) : (
                            'Null'
                        )
                    ) : (
                        <span style={{ color: 'green' }} title="Waarde is niet gewijzigd">
                            {newValue ? newValue : 'Null'}
                        </span>
                    )}
                </td>
                <td>{changedBy ? changedBy.fullName : ''}</td>
                <td>{moment(changedAt).format('L')}</td>
            </tr>
        );
    }
}

export default AuditTrailListItem;
