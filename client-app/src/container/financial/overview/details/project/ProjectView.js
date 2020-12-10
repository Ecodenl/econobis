import React from 'react';

const ProjectView = props => {
    const { id, definitive, project } = props.financialOverviewProject;

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
                <div className="col-sm-3">{project.projectType.name}</div>
                <div className="col-sm-1 push">
                    <span className="pull-right">{definitive ? 'Definitief' : 'Concept'}</span>
                </div>
            </div>
            <div className="col-sm-1">
                {props.financialOverviewDefinitive ? (
                    <a role="button">
                        <span className="glyphicon glyphicon-ok mybtn-primary" />{' '}
                    </a>
                ) : props.showActionButtons ? (
                    definitive ? (
                        <a role="button" onClick={props.makeConcept}>
                            <span className="glyphicon glyphicon-remove mybtn-danger" />
                        </a>
                    ) : (
                        <a role="button" onClick={props.makeDefinitive}>
                            <span className="glyphicon glyphicon-ok mybtn-success" />
                        </a>
                    )
                ) : (
                    ''
                )}
                {props.showActionButtons ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <span className="glyphicon glyphicon-trash mybtn-danger" />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ProjectView;
