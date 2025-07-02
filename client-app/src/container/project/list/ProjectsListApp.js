import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProjects, clearProjects } from '../../../actions/project/ProjectsActions';
import {
    setProjectCodeFilter,
    setProjectFilter,
    setTypeProjectFilter,
    clearFilterProjects,
} from '../../../actions/project/ProjectsFiltersActions';
import { setProjectsPagination } from '../../../actions/project/ProjectsPaginationActions';
import ProjectsListToolbar from './ProjectsListToolbar';
import ProjectsList from './ProjectsList';
import { bindActionCreators } from 'redux';
import filterHelper from '../../../helpers/FilterHelper';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const ProjectsListAppWrapper = props => {
    const params = useParams();
    return <ProjectsListApp {...props} params={params} />;
};

class ProjectsListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterType: 'and',
            amountOfFilters: 0,
        };

        this.fetchProjectsData = this.fetchProjectsData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchProjectsData();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.params.value !== nextProps.params.value) {
            if (!isEmpty(nextProps.params)) {
                switch (nextProps.params.filter) {
                    case 'type':
                        this.props.clearFilterProjects();
                        this.props.setTypeProjectFilter(nextProps.params.value);
                        break;
                    default:
                        break;
                }
            } else {
                this.props.clearFilterProjects();
            }

            setTimeout(() => {
                this.fetchProjectsData();
            }, 100);
        }
    }

    componentWillUnmount() {
        this.props.clearProjects();
    }

    fetchProjectsData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.projectsFilters);
            const sorts = this.props.projectsSorts;
            const pagination = { limit: 20, offset: this.props.projectsPagination.offset };
            const filterType = this.state.filterType;

            this.props.fetchProjects(filters, sorts, pagination, filterType);
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setProjectsPagination({ page, offset });

        this.fetchProjectsData();
    }

    resetProjectFilters = () => {
        this.props.clearFilterProjects();

        this.setState({
            filterType: 'and',
            amountOfFilters: 0,
            extraFilters: [],
        });

        this.fetchProjectsData();
    };

    onSubmitFilter() {
        this.props.clearProjects();

        this.props.setProjectsPagination({ page: 0, offset: 0 });

        this.fetchProjectsData();
    }

    render() {
        const { keyUserRole, ProjectmedewerkerRole, ParticipatiemedewerkerRole } = this.props;

        return (
            (keyUserRole?.hasRole || ProjectmedewerkerRole?.hasRole || ParticipatiemedewerkerRole?.hasRole) && (
                <div>
                    <div className="panel panel-default col-md-12">
                        <div className="panel-body">
                            <div className="col-md-12 margin-10-top">
                                <ProjectsListToolbar resetProjectFilters={() => this.resetProjectFilters()} />
                            </div>
                            <div className="col-md-12 margin-10-top">
                                <ProjectsList
                                    projects={this.props.projects}
                                    projectsPagination={this.props.projectsPagination}
                                    onSubmitFilter={() => this.onSubmitFilter()}
                                    handlePageClick={this.handlePageClick}
                                    fetchProjectsListData={this.fetchProjectsData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        );

    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.list,
        projectsFilters: state.projects.filters,
        projectsSorts: state.projects.sorts,
        projectsPagination: state.projects.pagination,

        keyUserRole: state.meDetails.roles.find(role => role.name === 'Beheerder'),
        ProjectmedewerkerRole: state.meDetails.roles.find(role => role.name === 'Projectmedewerker'),
        ParticipatiemedewerkerRole: state.meDetails.roles.find(role => role.name === 'Participatie medewerker'),
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchProjects,
            clearProjects,
            setProjectCodeFilter,
            setProjectFilter,
            setTypeProjectFilter,
            clearFilterProjects,
            setProjectsPagination,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListAppWrapper);
