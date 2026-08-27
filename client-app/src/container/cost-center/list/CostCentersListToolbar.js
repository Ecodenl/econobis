import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

// Functionele wrapper voor de class component
const CostCentersListToolbarWrapper = props => {
    const navigate = useNavigate();
    return <CostCentersListToolbar {...props} navigate={navigate} />;
};

class CostCentersListToolbar extends Component {
    newCostCenter = () => {
        this.props.navigate(`/kostenplaats/nieuw`);
    };

    render() {
        let { costCentersCount, refreshCostCentersData, permissions } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshCostCentersData} />
                        {permissions.manageFinancial && (
                            <ButtonIcon iconName={'plus'} onClickAction={this.newCostCenter} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Kostenplaatsen</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {costCentersCount}</div>
                </div>
            </div>
        );
    }
}

CostCentersListToolbar.propTypes = {
    costCentersCount: PropTypes.any,
    refreshCostCentersData: PropTypes.any,
    permissions: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(CostCentersListToolbarWrapper);
