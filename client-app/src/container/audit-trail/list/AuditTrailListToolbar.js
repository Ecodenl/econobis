import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const AuditTrailListToolbar = props => {
    const { meta = {} } = props.auditTrail;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.resetAuditTrailFilters} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Audit trail</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        auditTrail: state.auditTrail.list,
    };
};

export default connect(
    mapStateToProps,
    null
)(AuditTrailListToolbar);
