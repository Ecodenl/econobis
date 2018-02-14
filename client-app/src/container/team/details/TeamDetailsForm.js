import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import TeamDetailsFormGeneral from './general/TeamDetailsFormGeneral';
import TeamDetailsUsers from './team-users/TeamDetailsUsers';
import Panel from "../../../components/panel/Panel";
import PanelHeader from "../../../components/panel/PanelHeader";

class TeamDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.teamDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <TeamDetailsFormGeneral />
                    <TeamDetailsUsers />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        teamDetails: state.teamDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: (id) => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsForm);
