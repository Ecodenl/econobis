import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const TeamsListToolbar = props => {
    const newTeam = () => {
        hashHistory.push(`/team/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.refreshTeamsData} />
                    {props.permissions.createTeam && <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newTeam} />}
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

export default connect(
    mapStateToProps,
    null
)(TeamsListToolbar);
