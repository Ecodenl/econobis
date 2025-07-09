import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';
import FinancialOverviewDeleteItem from '../list/FinancialOverviewDeleteItem';

// Functionele wrapper voor de class component
const FinancialOverviewDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewDetailsToolbar {...props} navigate={navigate} />;
};

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
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => this.props.navigate(-1)} />
                        {!definitive && statusId === 'concept' ? (
                            <ButtonIcon
                                iconName={'trash'}
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

export default FinancialOverviewDetailsToolbarWrapper;
