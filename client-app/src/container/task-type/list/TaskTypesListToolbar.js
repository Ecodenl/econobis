import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const TaskTypesListToolbar = ({ taskTypesCount, refreshTaskTypesData, permissions }) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={refreshTaskTypesData} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Taak types</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {taskTypesCount}</div>
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
)(TaskTypesListToolbar);
