import React from 'react';
import {browserHistory, hashHistory} from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';

const CalendarToolbar = props => {
    const newTask = () => {
        hashHistory.push(`/taak/nieuw`);
    };

    return (
        <div className="row margin-10-bottom">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                    <ButtonIcon iconName={"glyphicon-plus"} onClickAction={newTask} />
                </div>
            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Agenda</h3></div>
            <div className="col-md-4" />
        </div>
    );
};

export default CalendarToolbar;