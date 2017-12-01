import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRegistrations, clearRegistrations } from '../../../actions/registration/RegistrationsActions';
import RegistrationsList from './RegistrationsList';
import RegistrationsListToolbar from './RegistrationsListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";

class RegistrationsListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            const filters = filterHelper(this.props.registrationsFilters);
            const sorts = this.props.registrationsSorts.reverse();

            this.props.fetchRegistrations(filters, sorts);
        },100 );
    };

    componentWillUnmount() {
        this.props.clearRegistrations();
    };

    refreshRegistrationsData = () => {
        const filters = filterHelper(this.props.registrationsFilters);
        const sorts = this.props.registrationsSorts.reverse();

        this.props.clearRegistrations();
        this.props.fetchRegistrations(filters, sorts);
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.registrationsFilters);
        const sorts = this.props.registrationsSorts.reverse();

        this.props.clearRegistrations();
        this.props.fetchRegistrations(filters, sorts);
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 extra-space-above">
                        <RegistrationsListToolbar
                            refreshRegistrationsData={() => this.refreshRegistrationsData()}
                        />
                    </div>

                    <div className="col-md-12 extra-space-above">
                        <RegistrationsList
                            registrations={this.props.registrations}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshRegistrationsData={() => this.refreshRegistrationsData()}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registrations: state.registrations,
        registrationsFilters: state.registrationsFilters,
        registrationsSorts: state.registrationsSorts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchRegistrations, clearRegistrations }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationsListApp);