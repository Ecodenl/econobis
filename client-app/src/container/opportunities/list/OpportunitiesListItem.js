import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

class OpportunitiesListItem extends Component {
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
            hashHistory.push(`kans/${id}`);
        }
    }

    render() {
        const {
            id,
            address,
            createdAt,
            desiredDate,
            contactName,
            measureCategoryName,
            showCheckbox,
            toggleOpportunityCheck,
            opportunityIds,
            measures,
            campaignName,
            areaName,
            statusName,
            amountQuotations,
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
                            name={id}
                            checked={opportunityIds && opportunityIds.length > 0 ? opportunityIds.includes(id) : false}
                            onChange={toggleOpportunityCheck}
                        />
                    </td>
                )}
                <td>{createdAt ? moment(createdAt).format('DD-MM-Y') : 'Onbekend'}</td>
                <td>{desiredDate ? moment(desiredDate).format('DD-MM-Y') : 'Onbekend'}</td>
                <td>{contactName}</td>
                <td>{address}</td>
                <td>{measureCategoryName}</td>
                <td className="pre-wrap">
                    {measures.length
                        ? measures
                              .map(measure => {
                                  return measure.name;
                              })
                              .join(',\n')
                        : ''}
                </td>
                <td>{campaignName}</td>
                <td>{areaName}</td>
                <td>{statusName}</td>
                <td>{amountQuotations}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {this.state.showActionButtons && this.props.permissions.manageOpportunity ? (
                        <a
                            role="button"
                            onClick={this.props.showDeleteItemModal.bind(this, id, contactName, measureCategoryName)}
                        >
                            <Icon className="mybtn-danger" size={14} icon={trash} />
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

export default connect(mapStateToProps, null)(OpportunitiesListItem);
