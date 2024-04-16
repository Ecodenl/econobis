import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const TasksListToolbar = props => {
    const newTask = () => {
        hashHistory.push('taak/nieuw');
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.tasks;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.resetTaskFilters} />
                    {permissions.manageTask && <ButtonIcon iconName={'plus'} onClickAction={newTask} />}
                    {permissions.manageTask && (
                        <ButtonIcon
                            iconName={'check'}
                            onClickAction={props.setMultiSelectEnabled}
                            title="Taakselectie maken"
                        />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">{props.me ? 'Eigen taken' : 'Taken'}</h3>
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
        tasks: state.tasks.list,
    };
};

export default connect(mapStateToProps, null)(TasksListToolbar);
