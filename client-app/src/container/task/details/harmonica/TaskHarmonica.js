import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import TasksList from './TasksList';

const TaskHarmonica = ({ toggleShowList, showTasksList, taskCount, permissions }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-12" onClick={toggleShowList} role="button">
                    <span className="">
                        OPEN TAKEN <span className="badge">{taskCount}</span>
                    </span>
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

export default connect(
    mapStateToProps,
    null
)(TaskHarmonica);
