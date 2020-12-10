import React from 'react';

import ProjectItem from './ProjectItem';

const ProjectList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-2">Projectcode</div>
                <div className="col-sm-5">Project</div>
                <div className="col-sm-3">Type project</div>
                <div className="col-sm-1">
                    <span className="pull-right">Definitive</span>
                </div>
                <div className="col-sm-1" />
            </div>
            {props.financialOverview &&
            props.financialOverview.financialOverviewProjects &&
            props.financialOverview.financialOverviewProjects.length > 0 ? (
                props.financialOverview.financialOverviewProjects.map(financialOverviewProject => {
                    return (
                        <ProjectItem
                            key={financialOverviewProject.id}
                            financialOverviewProject={financialOverviewProject}
                            financialOverview={props.financialOverview}
                            callFetchFinancialOverviewDetails={props.callFetchFinancialOverviewDetails}
                            // updateProjectToState={props.updateProjectToState}
                            // deleteProjectToState={props.deleteProjectToState}
                        />
                    );
                })
            ) : (
                <div>Geen projecten bekend.</div>
            )}
        </div>
    );
};

// const mapStateToProps = state => {
//     return {
//         projects: state.financialOverview.projects,
//     };
// };

// export default connect(mapStateToProps)(ProjectList);
export default ProjectList;
