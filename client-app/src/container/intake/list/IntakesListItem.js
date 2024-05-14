import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

class IntakesListItem extends Component {
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
        if (!this.props.showCheckbox) {
            hashHistory.push(`/intake/${id}`);
        }
    }

    render() {
        const {
            checked,
            id,
            fullName,
            createdAt,
            fullAddress,
            areaName,
            status,
            campaign,
            measuresRequestedNames = [],
            showCheckbox,
            toggleIntakeCheck,
            intakeIds,
        } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                {showCheckbox && (
                    <td>
                        <input
                            type="checkbox"
                            onChange={toggleIntakeCheck}
                            name={id}
                            checked={intakeIds && intakeIds.length > 0 ? intakeIds.includes(id) : false}
                        />
                    </td>
                )}
                <td>{moment(createdAt).format('DD-MM-Y')}</td>
                <td>{fullName}</td>
                <td>{fullAddress}</td>
                <td>{areaName}</td>
                <td>{measuresRequestedNames.join(', ')}</td>
                <td>{status}</td>
                <td>{campaign.name}</td>
                <td>
                    {this.state.showActionButtons ? (
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

export default IntakesListItem;
