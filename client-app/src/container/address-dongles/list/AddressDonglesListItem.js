import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

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
        const {
            id,
            fullContactName,
            fullAddress,
            typeReadOut,
            dateStart,
            dateEnd,
            typeDongleName,
            energieId,
        } = this.props;
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
                <td>{typeReadOut}</td>
                <td>{dateStart}</td>
                <td>{dateEnd}</td>
                <td>{typeDongleName}</td>
                <td>{energieId}</td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(AddressDonglesListItem);
