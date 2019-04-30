import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

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
        const { id, code, name, currentPrice, administration } = this.props;
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
                            ? '€' +
                              currentPrice.price.toLocaleString('nl', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
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
                        ? '€' +
                        currentPrice.priceInclVat.toLocaleString('nl', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        })
                        : ''}
                    </td>
                )}
                <td>{administration ? administration.name : ''}</td>
                <td>
                    {this.state.showActionButtons && this.props.permissions.manageFinancial ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.manageFinancial ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}>
                            <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
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

export default connect(
    mapStateToProps,
    null
)(ProductsListItem);
