import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetNameByIdHelper from '../../../helpers/GetNameByIdHelper';
import moment from 'moment/moment';

class AddressDonglesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMore: false,
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

    render() {
        const {
            id,
            fullName,
            fullAddress,
            postalCode,
            city,
            typeReadOut,
            dateStart,
            dateEnd,
            typeDongle,
            energyId,
            showCheckboxList,
        } = this.props;
        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                {showCheckboxList ? (
                    <td>
                        <div>
                            <input
                                type="checkbox"
                                name={id}
                                onChange={this.props.toggleAddressDongleCheck}
                                checked={this.props.addressDongleIds ? this.props.addressDongleIds.includes(id) : false}
                            />
                        </div>
                    </td>
                ) : null}
                <td>{fullName}</td>
                <td>{fullAddress}</td>
                <td>{postalCode}</td>
                <td>{city}</td>
                <td>
                    <GetNameByIdHelper id={typeReadOut} items={this.props.typesReadOut} />
                </td>
                <td>{dateStart ? moment(dateStart).format('DD-MM-Y') : ''}</td>
                <td>{dateEnd ? moment(dateEnd).format('DD-MM-Y') : ''}</td>
                <td>
                    <GetNameByIdHelper id={typeDongle} items={this.props.typesDongle} />
                </td>
                <td>{energyId}</td>
                <td>&nbsp;</td>
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