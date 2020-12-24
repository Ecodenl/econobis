import React from 'react';

const ProjectView = props => {
    const { id, definitive, statusId, project } = props.financialOverviewProject;
    let status = '';
    switch (statusId) {
        case 'in-progress':
            status = 'Wordt toegevoegd...';
            break;
        case 'concept':
            status = 'Concept';
            break;
        case 'definitive':
            status = 'Definitief';
            break;
    }

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onDoubleClick={() => props.clickItem(id)}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            {/*<div onClick={props.openEdit}>*/}
            <div>
                <div className="col-sm-2">{project.code}</div>
                <div className="col-sm-5">{project.name}</div>
                <div className="col-sm-2">{project.projectType.name}</div>
                <div className="col-sm-2">{status}</div>
            </div>
            <div className="col-sm-1">
                {props.financialOverviewDefinitive ? (
                    <a role="button">
                        <span className="glyphicon glyphicon-ok mybtn-primary" />{' '}
                    </a>
                ) : props.showActionButtons ? (
                    definitive ? (
                        <a role="button" onClick={props.toggleMakeConcept}>
                            <span className="glyphicon glyphicon-remove mybtn-danger" />
                        </a>
                    ) : (
                        <>
                            <a role="button" onClick={props.toggleMakeDefinitive}>
                                <span className="glyphicon glyphicon-ok mybtn-success" />
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a role="button" onClick={props.toggleDelete}>
                                <span className="glyphicon glyphicon-trash mybtn-danger" />
                            </a>
                        </>
                    )
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ProjectView;
