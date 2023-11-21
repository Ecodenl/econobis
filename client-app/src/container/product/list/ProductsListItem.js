import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

class ProductsListItem extends Component {
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
        hashHistory.push(`/product/${id}`);
    }

    render() {
        const { id, code, name, currentPrice, administration, active } = this.props;
        let vatPercentage = '';

        if (currentPrice) {
            if (currentPrice.vatPercentage !== null) {
                vatPercentage = currentPrice.vatPercentage + '%';
            } else {
                vatPercentage = 'Geen';
            }
        }
        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{code}</td>
                <td>{name}</td>
                {currentPrice && currentPrice.hasVariablePrice ? (
                    <td>Variabel</td>
                ) : (
                    <td>
                        {currentPrice
                            ? '€ ' +
                              currentPrice.price.toLocaleString('nl', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: currentPrice.priceNumberOfDecimals,
                              })
                            : ''}
                    </td>
                )}
                <td>{vatPercentage}</td>
                {currentPrice && currentPrice.hasVariablePrice ? (
                    <td>Variabel</td>
                ) : (
                    <td>
                        {currentPrice
                            ? '€ ' +
                              currentPrice.priceInclVat.toLocaleString('nl', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: currentPrice.priceNumberOfDecimals,
                              })
                            : ''}
                    </td>
                )}
                <td>{administration ? administration.name : ''}</td>
                <td>{active ? 'Nee' : 'Ja'}</td>
                <td>
                    {this.state.showActionButtons && this.props.permissions.manageFinancial ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.manageFinancial ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}>
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

export default connect(mapStateToProps, null)(ProductsListItem);
