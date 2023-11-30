import React from 'react';

import { connect } from 'react-redux';
import RevenuesListFormItem from './RevenuesListFormItem';

const RevenuesListFormList = ({ revenues, projectTypeCodeRef }) => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-4">Project</div>
                <div className="col-sm-2">Soort</div>
                <div className="col-sm-3">Periode</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-1" />
            </div>
            {revenues.length > 0 ? (
                revenues.map(revenue => {
                    return <RevenuesListFormItem key={revenue.id} revenue={revenue} />;
                })
            ) : (
                <div>Geen opbrengsten bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenues: state.participantProjectDetails.relatedRevenues,
        projectTypeCodeRef: state.participantProjectDetails.project.typeCodeRef,
    };
};

export default connect(mapStateToProps)(RevenuesListFormList);
