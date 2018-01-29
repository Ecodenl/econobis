import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRegistrations, clearRegistrations } from '../../../actions/registration/RegistrationsActions';
import { clearFilterRegistration } from '../../../actions/registration/RegistrationsFiltersActions';
import { setRegistrationsPagination } from '../../../actions/registration/RegistrationsPaginationActions';
import RegistrationsList from './RegistrationsList';
import RegistrationsListToolbar from './RegistrationsListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";

class RegistrationsListApp extends Component {
    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchRegistrationsData();
    };

    componentWillUnmount() {
        this.props.clearRegistrations();
    };

    fetchRegistrationsData = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.registrationsFilters);
            const sorts = this.props.registrationsSorts.reverse();
            const pagination = { limit: 20, offset: this.props.registrationsPagination.offset };

            this.props.fetchRegistrations(filters, sorts, pagination);
        },100 );
    };

    resetRegistrationFilters = () => {
        this.props.clearFilterRegistration();

        this.fetchRegistrationsData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.registrationsFilters);
        const sorts = this.props.registrationsSorts.reverse();

        this.props.setRegistrationsPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchRegistrationsData();
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setRegistrationsPagination({page, offset});

        setTimeout(() => {
            this.fetchRegistrationsData();
        },100 );
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <RegistrationsListToolbar
                            resetRegistrationFilters={() => this.resetRegistrationFilters()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <RegistrationsList
                            registrations={this.props.registrations}
                            registrationsPagination={this.props.registrationsPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshRegistrationsData={() => this.fetchRegistrationsData()}
                            handlePageClick={this.handlePageClick}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registrations: state.registrations.list,
        registrationsFilters: state.registrations.filters,
        registrationsSorts: state.registrations.sorts,
        registrationsPagination: state.registrations.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchRegistrations, clearRegistrations, setRegistrationsPagination, clearFilterRegistration }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationsListApp);
