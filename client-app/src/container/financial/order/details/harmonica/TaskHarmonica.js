import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import TasksList from './TasksList';

const TaskHarmonica = ({ toggleShowList, showTasksList, newTask, taskCount, permissions }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span>
                        TAKEN/NOTITIES <span className="badge">{taskCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    {permissions.manageTask && (
                        <div className="pull-right">
                            <span
                                className="glyphicon glyphicon-plus glyphicon-white"
                                data-toggle="dropdown"
                                role="button"
                            />
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="btn" onClick={() => newTask('open')}>
                                        Maak taak
                                    </a>
                                </li>
                                <li>
                                    <a className="btn" onClick={() => newTask('afgehandeld')}>
                                        Maak notitie
                                    </a>
                                </li>
                            </ul>
                        </div>
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

export default connect(
    mapStateToProps,
    null
)(TaskHarmonica);
