import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const TeamsListToolbar = props => {
    const navigate = useNavigate();

    const newTeam = () => {
        navigate(`/team/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshTeamsData} />
                    {props.permissions.createTeam && <ButtonIcon iconName={'plus'} onClickAction={newTeam} />}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Teams</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(TeamsListToolbar);
