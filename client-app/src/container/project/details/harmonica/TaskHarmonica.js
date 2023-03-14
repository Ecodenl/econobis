import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import TasksList from './TasksList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const TaskHarmonica = ({ toggleShowList, showTasksList, taskCount, newTask, permissions }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">
                        OPEN TAKEN <span className="badge">{taskCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    {permissions.manageTask && (
                        <a role="button" className="pull-right" onClick={newTask}>
                            <Icon class="harmonica-button" size={14} icon={plus} />
                        </a>
                    )}
                </div>
                <div className="col-sm-12">{showTasksList && <TasksList />}</div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(TaskHarmonica);
