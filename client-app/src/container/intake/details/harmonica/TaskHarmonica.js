import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import TasksList from './TasksList';

const TaskHarmonica = ({ toggleShowList, showTasksList, newTask, taskCount, permissions }) => (
    <Panel className={'harmonica-button'}>
        <PanelBody>
            <div className="col-sm-10" onClick={toggleShowList} role="button">
                <span>
                    OPEN TAKEN <span className="badge">{taskCount}</span>
                </span>
            </div>
            <div className={'col-sm-2'}>
                {permissions.manageTask && (
                    <a role="button" className="pull-right" onClick={newTask}>
                        <span className="glyphicon glyphicon-plus glyphicon-white" />
                    </a>
                )}
            </div>
            <div className="col-sm-12">{showTasksList && <TasksList />}</div>
        </PanelBody>
    </Panel>
);

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(
    mapStateToProps,
    null
)(TaskHarmonica);
