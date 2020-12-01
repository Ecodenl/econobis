import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';
import FinancialOverviewDeleteItem from './FinancialOverviewDeleteItem';

class FinancialOverviewDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        let { year, administrationName, id } = this.props;
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">
                        Financiele jaaroverzicht: {year} {administrationName}
                    </h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <FinancialOverviewDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        year={year}
                        administrationName={administrationName}
                        deleteFinancialOverview={this.props.deleteFinancialOverview}
                    />
                )}
            </div>
        );
    }
}

FinancialOverviewDetailsToolbar.propTypes = { year: PropTypes.any, administrationName: PropTypes.any };

export default FinancialOverviewDetailsToolbar;
