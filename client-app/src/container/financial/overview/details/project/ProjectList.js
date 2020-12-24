import React from 'react';

import ProjectItem from './ProjectItem';

const ProjectList = props => {
    //todo WM: opschonen log
    // console.log('hello ProjectList');
    // console.log(
    //     props.financialOverview && props.financialOverview.financialOverviewProjects
    //         ? props.financialOverview.financialOverviewProjects[0]
    //         : 'nog niet beschikbaar'
    // );

    return (
        <div>
            <div className="row header">
                <div className="col-sm-2">Projectcode</div>
                <div className="col-sm-5">Project</div>
                <div className="col-sm-2">Type project</div>
                <div className="col-sm-2">Status</div>
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
                            setShowNewFalse={props.setShowNewFalse}
                        />
                    );
                })
            ) : (
                <div>Geen projecten bekend.</div>
            )}
        </div>
    );
};

export default ProjectList;
