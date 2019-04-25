import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTeams, clearTeams } from '../../../actions/team/TeamsActions';
import TeamsList from './TeamsList';
import TeamsListToolbar from './TeamsListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class TeamsListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTeams();
    }

    componentWillUnmount() {
        this.props.clearTeams();
    }

    refreshTeamsData = () => {
        this.props.clearTeams();
        this.props.fetchTeams();
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <TeamsListToolbar refreshTeamsData={() => this.refreshTeamsData()} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <TeamsList teams={this.props.teams} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.teams,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeams: () => {
        dispatch(fetchTeams());
    },
    clearTeams: () => {
        dispatch(clearTeams());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsListApp);
