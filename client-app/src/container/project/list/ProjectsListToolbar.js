import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

const ProjectsListToolbar = props => {
    const navigate = useNavigate();

    const newProject = () => {
        navigate('project/nieuw');
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.projects;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                    {permissions.manageProject && <ButtonIcon iconName={'plus'} onClickAction={newProject} />}
                    <ButtonIcon iconName={'refresh'} onClickAction={props.resetProjectFilters} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Projecten</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projects: state.projects.list,
    };
};

export default connect(mapStateToProps)(ProjectsListToolbar);
