import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchParticipantsProductionProject, clearParticipantsProductionProject } from '../../../../../actions/participants-production-project/ParticipantsProductionProjectActions';
import { clearFilterParticipantsProductionProject } from '../../../../../actions/participants-production-project/ParticipantsProductionProjectFiltersActions';
import { setParticipantsProductionProjectPagination } from '../../../../../actions/participants-production-project/ParticipantsProductionProjectPaginationActions';
import ParticipantsList from './ParticipantsList';
import ParticipantsListToolbar from './ParticipantsListToolbar';
import filterHelper from '../../../../../helpers/FilterHelper';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from "../../../../../components/panel/PanelBody";

class ParticipantsListApp extends Component {
    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchParticipantsProductionProjectData();
    };

    componentWillUnmount() {
        this.props.clearParticipantsProductionProject();
    };

    fetchParticipantsProductionProjectData = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.participantsProductionProjectFilters);
            const sorts = this.props.participantsProductionProjectSorts.reverse();
            const pagination = { limit: 20, offset: this.props.participantsProductionProjectPagination.offset };

            this.props.fetchParticipantsProductionProject(filters, sorts, pagination);
        },100 );
    };

    resetParticipantProductionProjectFilters = () => {
        this.props.clearFilterParticipantsProductionProject();

        this.fetchParticipantsProductionProjectData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.participantsProductionProjectFilters);
        const sorts = this.props.participantsProductionProjectSorts.reverse();

        this.props.setParticipantsProductionProjectPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchParticipantsProductionProjectData();
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setParticipantsProductionProjectPagination({page, offset});

        setTimeout(() => {
            this.fetchParticipantsProductionProjectData();
        },100 );
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <ParticipantsListToolbar
                            resetParticipantProductionProjectFilters={() => this.resetParticipantProductionProjectFilters}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ParticipantsList
                            participantsProductionProject={this.props.participantsProductionProject}
                            participantsProductionProjectPagination={this.props.participantsProductionProjectPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshParticipantsProductionProjectData={() => this.fetchParticipantsProductionProjectData()}
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
        participantsProductionProject: state.participantsProductionProject.list,
        participantsProductionProjectFilters: state.participantsProductionProject.filters,
        participantsProductionProjectSorts: state.participantsProductionProject.sorts,
        participantsProductionProjectPagination: state.participantsProductionProject.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchParticipantsProductionProject, clearParticipantsProductionProject, setParticipantsProductionProjectPagination, clearFilterParticipantsProductionProject }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsListApp);
