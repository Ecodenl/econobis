import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    setProjectCodeFilter,
    setProjectFilter,
    setTypeProjectFilter,
    clearFilterProjects,
} from '../../../actions/project/ProjectsFiltersActions';

const ProjectsListFilter = props => {
    const onProjectCodeChange = e => {
        props.setProjectCodeFilter(e.target.value);
    };

    const onProjectChange = e => {
        props.setProjectFilter(e.target.value);
    };

    const onTypeProjectChange = e => {
        props.setTypeProjectFilter(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.code.data}
                    onChange={onProjectCodeChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.name.data}
                    onChange={onProjectChange}
                />
            </th>
            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.projectTypeId.data}
                    onChange={onTypeProjectChange}
                >
                    <option />
                    {props.projectTypes.map(projectType => {
                        return (
                            <option key={projectType.id} value={projectType.id}>
                                {projectType.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th />
            <th />
            <th />
            <th />
            <th />
            <th />
            <th />
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.projects.filters,
    projectStatuses: state.systemData.projectStatuses,
    projectTypes: state.systemData.projectTypes,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setProjectCodeFilter,
            setProjectFilter,
            setTypeProjectFilter,
            clearFilterProjects,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListFilter);
