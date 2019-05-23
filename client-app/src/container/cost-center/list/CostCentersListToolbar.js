import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from "prop-types";

class CostCentersListToolbar extends Component {
    render() {
        let {costCentersCount, refreshCostCentersData, permissions} = this.props;
        const newCostCenter = () => {
            hashHistory.push(`/kostenplaats/nieuw`);
        };

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'glyphicon-refresh'}
                                    onClickAction={refreshCostCentersData}/>
                        {permissions.manageFinancial && (
                            <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newCostCenter}/>
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
    permissions: PropTypes.any
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(
    mapStateToProps,
    null
)(CostCentersListToolbar);
