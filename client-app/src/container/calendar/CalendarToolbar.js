import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../components/button/ButtonIcon';

const CalendarToolbar = props => {
    const navigate = useNavigate();

    const newTask = () => {
        navigate(`/taak/nieuw`);
    };

    return (
        <div className="row margin-10-bottom">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                    <ButtonIcon iconName={'plus'} onClickAction={newTask} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Agenda</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default CalendarToolbar;
