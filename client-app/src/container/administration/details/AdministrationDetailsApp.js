import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import AdministrationDetailsToolbar from './AdministrationDetailsToolbar';
import AdministrationDetailsForm from './AdministrationDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class AdministrationDetailsApp extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.fetchTeamDetails(this.props.params.id);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                < AdministrationDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <AdministrationDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationDetailsApp);
