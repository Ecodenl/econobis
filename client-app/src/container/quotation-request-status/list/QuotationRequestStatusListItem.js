import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

class QuotationRequestStatusListItem extends Component {
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
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        hashHistory.push(`/offerte-verzoek-status/${id}`);
    }

    render() {
        // todo WM: opschonen velden emailTemplateIdWf, mailCcToCoachWf en numberOfDaysToSendEmail
        const { id, name, usesWf, numberOfDaysToSendEmail, permissions, opportunityActionName } = this.props;
        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={permissions.manageFinancial ? () => this.openItem(id) : null}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>
                    {opportunityActionName} - {name}
                </td>
                <td>{usesWf ? 'Ja' : 'Nee'}</td>
                {/*todo WM: opschonen velden emailTemplateIdWf, mailCcToCoachWf en numberOfDaysToSendEmail*/}
                {/*<td>{usesWf ? (numberOfDaysToSendEmail === 0 ? 'Direct' : numberOfDaysToSendEmail) : ''}</td>*/}
                <td>
                    {this.state.showActionButtons && permissions.manageFinancial ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(QuotationRequestStatusListItem);
