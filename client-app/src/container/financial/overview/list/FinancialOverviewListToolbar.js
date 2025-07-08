import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

// Functionele wrapper voor de class component
const FinancialOverviewListToolbarWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewListToolbar {...props} navigate={navigate} />;
};

class FinancialOverviewListToolbar extends Component {
    render() {
        let { financialOverviewsCount, refreshFinancialOverviewsData, permissions } = this.props;
        const newFinancialOverview = () => {
            this.props.navigate(`/waardestaat/nieuw`);
        };

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshFinancialOverviewsData} />
                        {permissions.manageFinancial && (
                            <ButtonIcon iconName={'plus'} onClickAction={newFinancialOverview} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Waardestaten</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {financialOverviewsCount}</div>
                </div>
            </div>
        );
    }
}

FinancialOverviewListToolbar.propTypes = {
    financialOverviewsCount: PropTypes.any,
    refreshFinancialOverviewsData: PropTypes.any,
    permissions: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(FinancialOverviewListToolbarWrapper);
