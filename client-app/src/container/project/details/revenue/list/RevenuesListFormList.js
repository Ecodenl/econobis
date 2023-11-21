import React from 'react';
import { connect } from 'react-redux';

import RevenuesListFormItem from './RevenuesListFormItem';

const RevenuesListFormList = ({ revenues, projectTypeCodeRef }) => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-2">Soort</div>
                <div className={projectTypeCodeRef !== 'loan' ? 'col-sm-1' : 'col-sm-2'}>Begin periode</div>
                <div className={projectTypeCodeRef !== 'loan' ? 'col-sm-1' : 'col-sm-2'}>Eind periode</div>
                <div className="col-sm-1">Uitgekeerd op</div>
                {projectTypeCodeRef !== 'loan' ? <div className="col-sm-2">Type opbrengst</div> : null}
                <div className="col-sm-2">Status</div>
                <div className="col-sm-2">Bedrag</div>
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
        revenues: state.projectDetails.revenues,
        projectTypeCodeRef: state.projectDetails.projectType?.codeRef,
    };
};

export default connect(mapStateToProps)(RevenuesListFormList);
