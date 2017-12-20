import React from 'react';
import { hashHistory, Link } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import {connect} from "react-redux";

const TasksListToolbar = props => {
    const newTask = () => {
        hashHistory.push('taak/nieuw');
    };

    const { permissions = {} } = props;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.refreshTasksData} />
                    {permissions.manageTask &&
                    <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newTask}/>
                    }
                </div>

            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Taken</h3></div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(TasksListToolbar);
