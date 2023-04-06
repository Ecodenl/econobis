import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class HousingFilesListItem extends Component {
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
        hashHistory.push(`/woningdossier/${id}`);
    }

    render() {
        const { id, fullName, createdAt, fullAddress, postalCode, city, buildYear, buildingType, isHouseForSale, energyLabel } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{moment(createdAt).format('DD-MM-Y')}</td>
                <td>{fullAddress}</td>
                <td>{postalCode}</td>
                <td>{city}</td>
                <td>{fullName}</td>
                <td>{buildYear ? buildYear : ''}</td>
                <td>{buildingType ? buildingType : ''}</td>
                <td>{isHouseForSale ? isHouseForSale : ''}</td>
                <td>{energyLabel ? energyLabel : ''}</td>

                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default HousingFilesListItem;
