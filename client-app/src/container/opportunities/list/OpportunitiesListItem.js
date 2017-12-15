import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

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
        hashHistory.push(`kans/${id}`);
    }

    render() {
        const { id, number, createdAt, contactName, measureName, campaignName, statusName, amountQuotations, amountRelatedOpportunities} = this.props;
        return (
          <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
              <td>{ number }</td>
              <td>{ createdAt ? moment(createdAt.date).format('DD-MM-Y') : 'Onbekend'}</td>
              <td>{ contactName }</td>
              <td>{ measureName }</td>
              <td>{ campaignName }</td>
              <td>{ statusName }</td>
              <td>{ amountQuotations }</td>
              <td>{ amountRelatedOpportunities }</td>
              <td>
                  {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                  {(this.state.showActionButtons && this.props.permissions.manageOpportunity ? <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, contactName, measureName)}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
              </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(OpportunitiesListItem);