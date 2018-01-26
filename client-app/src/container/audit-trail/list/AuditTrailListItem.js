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
    };

    onRowLeave() {
        this.setState({
            highlightRow: '',
        });
    };

    render() {
        const { model, field, oldValue, newValue, changedBy, changedAt } = this.props;

        return (
            <tr className={this.state.highlightRow} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{ model }</td>
                <td>{ field }</td>
                <td>{ oldValue ? oldValue : 'Null' }</td>
                <td>{ newValue ? newValue : 'Null' }</td>
                <td>{ changedBy ? changedBy.fullName : ''}</td>
                <td>{ moment(changedAt.date).format('L') }</td>
            </tr>
        );
    }
};

export default AuditTrailListItem;