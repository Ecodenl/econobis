import React, { Component } from 'react';
import { browserHistory, hashHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';
import FinancialOverviewDeleteItem from '../list/FinancialOverviewDeleteItem';

class FinancialOverviewDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                description: '',
            },
        };
    }

    showDeleteItemModal = (id, description) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id,
                description,
            },
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem: {
                ...this.state.deleteItem,
                id: '',
                description: '',
            },
        });
    };

    render() {
        let { id, description, statusId, definitive } = this.props.financialOverview;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        {!definitive && statusId === 'concept' ? (
                            <ButtonIcon
                                iconName={'glyphicon-trash'}
                                onClickAction={this.showDeleteItemModal.bind(this, id, description)}
                            />
                        ) : null}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Waardestaat: {description}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDeleteItem && (
                    <FinancialOverviewDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                        deleteFinancialOverview={this.props.deleteFinancialOverview}
                    />
                )}
            </div>
        );
    }
}

FinancialOverviewDetailsToolbar.propTypes = { description: PropTypes.any };

export default FinancialOverviewDetailsToolbar;
