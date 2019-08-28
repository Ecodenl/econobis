import React from 'react';
import { connect } from 'react-redux';

import ProjectDetailsFormValueCourseItem from './ProjectDetailsFormValueCourseItem';

const ProjectDetailsFormValueCourseList = ({ projectType, valueCourses }) => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-3">Project</div>
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-2">{projectType.codeRef === 'obligation' ? 'Hoofdsom' : 'Boekwaarde'}</div>
                <div className="col-sm-2">Overdrachtswaarde</div>
                <div className="col-sm-2">Actief</div>
                <div className="col-sm-1" />
            </div>
            {valueCourses.length > 0 ? (
                valueCourses.map(valueCourse => {
                    return <ProjectDetailsFormValueCourseItem key={valueCourse.id} valueCourse={valueCourse} />;
                })
            ) : (
                <div>Geen waardeverloop bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        valueCourses: state.projectDetails.valueCourses,
        projectType: state.projectDetails.projectType,
    };
};

export default connect(mapStateToProps)(ProjectDetailsFormValueCourseList);
