import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProjects, clearProjects } from '../../../actions/project/ProjectsActions';
import { setProjectsPagination } from '../../../actions/project/ProjectsPaginationActions';
import ProjectsListToolbar from './ProjectsListToolbar';
import ProjectsList from './ProjectsList';

class ProjectsListApp extends Component {
    constructor(props) {
        super(props);

        this.fetchProjectsData = this.fetchProjectsData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchProjectsData();
    }

    componentWillUnmount() {
        this.props.clearProjects();
    }

    fetchProjectsData() {
        setTimeout(() => {
            const pagination = { limit: 20, offset: this.props.projectsPagination.offset };

            this.props.fetchProjects(pagination);
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setProjectsPagination({ page, offset });

        this.fetchProjectsData();
    }

    render() {
        return (
            <div>
                <div className="panel panel-default col-md-12">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <ProjectsListToolbar />
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <ProjectsList
                                handlePageClick={this.handlePageClick}
                                fetchProjectsData={this.fetchProjectsData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectsPagination: state.projects.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProjects: pagination => {
        dispatch(fetchProjects(pagination));
    },
    clearProjects: () => {
        dispatch(clearProjects());
    },
    setProjectsPagination: pagination => {
        dispatch(setProjectsPagination(pagination));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsListApp);
