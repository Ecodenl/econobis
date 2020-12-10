import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

class FinancialOverviewProjectDetailsToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { description } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Waardestaat: {description}</h4>
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

FinancialOverviewProjectDetailsToolbar.propTypes = {
    description: PropTypes.any,
};

export default FinancialOverviewProjectDetailsToolbar;
