import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { setCheckedOpportunity } from '../../../actions/opportunity/OpportunitiesActions';

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

    setCheckedOpportunity(id) {
        this.props.setCheckedOpportunity(id);
    }

    openItem(id) {
        hashHistory.push(`kans/${id}`);
    }

    render() {
        const {
            checked,
            id,
            number,
            createdAt,
            desiredDate,
            contactName,
            measureCategoryName,
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
                {this.props.showCheckbox && (
                    <td>
                        <input type="checkbox" checked={checked} onChange={() => this.setCheckedOpportunity(id)} />
                    </td>
                )}
                <td>{number}</td>
                <td>{createdAt ? moment(createdAt).format('DD-MM-Y') : 'Onbekend'}</td>
                <td>{desiredDate ? moment(desiredDate).format('DD-MM-Y') : 'Onbekend'}</td>
                <td>{contactName}</td>
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

const mapDispatchToProps = dispatch => ({
    setCheckedOpportunity: id => {
        dispatch(setCheckedOpportunity(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesListItem);
