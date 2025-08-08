import React, { Component } from 'react';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

// Functionele wrapper voor de class component
const OrdersListItemWrapper = props => {
    const navigate = useNavigate();
    return <OrdersListItem {...props} navigate={navigate} />;
};

class OrdersListItem extends Component {
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
        this.props.navigate(`/order/${id}`);
    }

    render() {
        const {
            id,
            number,
            dateNextInvoice,
            subject,
            contact,
            totalInclVatInclReductionPerYear,
            paymentType,
            status,
            checked,
        } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                {this.props.showSelectOrdersToCreate && (
                    <td>
                        <input
                            type="checkbox"
                            name={id}
                            onChange={this.props.toggleOrderCheck}
                            checked={this.props.orderIds ? this.props.orderIds.includes(id) : false}
                        />
                    </td>
                )}
                <td>{number}</td>
                <td>{dateNextInvoice ? moment(dateNextInvoice).format('DD-MM-Y') : ''}</td>
                <td>{subject ? subject : ''}</td>
                <td>{contact ? contact.fullName : ''}</td>
                <td className={`${totalInclVatInclReductionPerYear <= 0 ? 'warning-td' : ''}`}>
                    {'€ ' +
                        totalInclVatInclReductionPerYear.toLocaleString('nl', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                </td>
                <td>{paymentType ? paymentType.name : ''}</td>
                <td>{status ? status.name : ''}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, subject)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default OrdersListItemWrapper;
