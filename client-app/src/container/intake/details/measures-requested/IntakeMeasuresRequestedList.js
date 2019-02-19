import React from 'react';
import { connect } from 'react-redux';

import IntakeMeasuresItem from './IntakeMeasuresRequestedItem';

const IntakeMeasuresRequestedList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-6">Maatregel</div>
                <div className="col-sm-5" />
                <div className="col-sm-1" />
            </div>
            {props.measuresRequested.length > 0 ? (
                props.measuresRequested.map((measureRequested, i) => {
                    return <IntakeMeasuresItem key={i} measureRequested={measureRequested} />;
                })
            ) : (
                <div>Geen gewenste maatregelen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        measuresRequested: state.intakeDetails.measuresRequested,
    };
};

export default connect(mapStateToProps)(IntakeMeasuresRequestedList);
