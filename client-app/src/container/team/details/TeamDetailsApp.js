import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import TeamDetailsToolbar from './TeamDetailsToolbar';
import TeamDetailsForm from './TeamDetailsFrom';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const TeamDetailsAppWrapper = props => {
    const params = useParams();
    return <TeamDetailsApp {...props} params={params} />;
};

class TeamDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTeamDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <TeamDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <TeamDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teamDetails: state.teamDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: id => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsAppWrapper);
