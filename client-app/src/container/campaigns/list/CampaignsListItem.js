import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
class CampaignsListItem extends Component {
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
        hashHistory.push(`campagne/${id}`);
    }

    render() {
        const { id, number, startDate, endDate, name, type, status, amountResponses} = this.props;
        return (
          <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
              <td>{ number }</td>
              <td>{ startDate ? moment(startDate).format('L') : ''}</td>
              <td>{ endDate ? moment(endDate).format('L') : ''}</td>
              <td>{ name }</td>
              <td>{ type }</td>
              <td>{ status }</td>
              <td>{ amountResponses }</td>
              <td>
                  {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                  {(this.state.showActionButtons && this.props.permissions.manageMarketing && false ? <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
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

export default connect(mapStateToProps)(CampaignsListItem);