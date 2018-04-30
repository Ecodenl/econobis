import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAdministrations, clearAdministrations } from '../../../actions/administration/AdministrationsActions';
import AdministrationsList from './AdministrationsList';
import AdministrationsListToolbar from './AdministrationsListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class AdministrationsListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAdministrations();
    };

    componentWillUnmount() {
        this.props.clearAdministrations();
    };

    refreshAdministrationsData = () => {
        this.props.clearAdministrations();
        this.props.fetchAdministrations();
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <AdministrationsListToolbar
                            refreshAdministrationsData={() => this.refreshAdministrationsData()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <AdministrationsList
                            administrations={this.props.administrations}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        administrations: state.administrations,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAdministrations: () => {
        dispatch(fetchAdministrations());
    },
    clearAdministrations: () => {
        dispatch(clearAdministrations());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationsListApp);