import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const OpportunityStatusListToolbar = ({ opportunityStatusCount, refreshOpportunityStatusData, permissions }) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={refreshOpportunityStatusData} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Kans statussen</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {opportunityStatusCount}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(
    mapStateToProps,
    null
)(OpportunityStatusListToolbar);
