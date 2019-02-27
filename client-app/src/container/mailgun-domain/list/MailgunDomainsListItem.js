import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

class MailgunDomainsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    };

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    };

    openItem(id) {
        hashHistory.push(`/mailgun-domein/${id}`);
    };

    render() {
        const { id, domain, isVerified } = this.props;

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{ domain }</td>
                <td>{ isVerified ? 'Ja' : 'Nee' }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps, null)(MailgunDomainsListItem);