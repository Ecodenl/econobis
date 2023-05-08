import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

import Icon from 'react-icons-kit';
// import { trash } from 'react-icons-kit/fa/trash';
// import { pencil } from 'react-icons-kit/fa/pencil';

class HousingFileSpecificationsListItem extends Component {
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

    // openItem(id) {
    //     hashHistory.push(`/woningdossier-specificatie/${id}`);
    // }

    render() {
        const {
            id,
            fullName,
            fullAddress,
            postalCode,
            city,
            measureCategoryName,
            measureName,
            statusName,
            measureDate,
            answer,
            floor,
            side,
            typeBrand,
            externalHoomName,
            typeOfExecution,
            savingsGas,
            savingsElectricity,
            co2Savings,
        } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                // onDoubleClick={permissions.manageFinancial ? () => this.openItem(id) : null}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{fullName}</td>
                <td>{fullAddress}</td>
                <td>{postalCode}</td>
                <td>{city}</td>
                <td>{measureCategoryName}</td>
                <td>{measureName}</td>
                <td>{statusName}</td>
                <td>{measureDate ? moment(measureDate).format('DD-MM-Y') : ''}</td>
                <td>
                    &nbsp;
                    {/*{this.state.showActionButtons && permissions.manageFinancial ? (*/}
                    {/*    <a role="button" onClick={() => this.openItem(id)}>*/}
                    {/*        <Icon className="mybtn-success" size={14} icon={pencil} />*/}
                    {/*        &nbsp;*/}
                    {/*    </a>*/}
                    {/*) : (*/}
                    {/*    ''*/}
                    {/*)}*/}
                    {/*{this.state.showActionButtons &&*/}
                    {/*permissions.manageFinancial &&*/}
                    {/*!definitive &&*/}
                    {/*statusId === 'concept' ? (*/}
                    {/*    <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, description)}>*/}
                    {/*        <Icon className="mybtn-danger" size={14} icon={trash} />*/}
                    {/*        &nbsp;*/}
                    {/*    </a>*/}
                    {/*) : (*/}
                    {/*    ''*/}
                    {/*)}*/}
                </td>
            </tr>
        );
    }
}

export default HousingFileSpecificationsListItem;
