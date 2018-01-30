import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import TasksList from './TaskList';

const TaskHarmonica = ({toggleShowList, showTasksList, newTask, taskCount, permissions}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-12" onClick={toggleShowList}>
                    <span className="">TAKEN <span className="badge">{ taskCount }</span></span>
                    {permissions.manageTask &&
                    <a role="button" className="pull-right" onClick={newTask}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    } { showTasksList && <TasksList /> }
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(TaskHarmonica);