import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import GetNameByIdHelper from '../../../helpers/GetNameByIdHelper';

class AddressDonglesListItem extends Component {
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
        // hashHistory.push(`maatregel/${id}`);
    }

    render() {
        const { id, fullContactName, fullAddress, typeReadOut, dateStart, dateEnd, typeDongle, energieId } = this.props;
        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{fullContactName}</td>
                <td>
                    {fullAddress.street} {fullAddress.number} {fullAddress.addition}
                </td>
                <td>{fullAddress.postal_code}</td>
                <td>{fullAddress.city}</td>
                <td>
                    <GetNameByIdHelper id={typeReadOut} items={this.props.typesReadOut} />
                </td>
                <td>{dateStart}</td>
                <td>{dateEnd}</td>
                <td>
                    <GetNameByIdHelper id={typeDongle} items={this.props.typesDongle} />
                </td>
                <td>{energieId}</td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        typesReadOut: state.systemData.dongleTypeReadOut,
        typesDongle: state.systemData.dongleTypeDongle,
    };
};

export default connect(mapStateToProps)(AddressDonglesListItem);
