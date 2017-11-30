import React from 'react';
import {connect} from 'react-redux';

import RegistrationMeasuresItem from "./RegistrationMeasuresRequestedItem";

const RegistrationMeasuresRequestedList = props => {
    return (
        <div>
          <div className="row border header">
            <div className="col-sm-4">Maatregel</div>
            <div className="col-sm-3">Gewenste datum</div>
            <div className="col-sm-4">Mate van interesse</div>
            <div className="col-sm-1"></div>
          </div>
            {
                props.measuresRequested.length > 0 ?
                    props.measuresRequested.map((measureRequested, i) => {
                        return <RegistrationMeasuresItem
                            key={i}
                            measureRequested={measureRequested}
                        />;
                    })
                    :
                    <div>Geen gewenste maatregelen bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        measuresRequested: state.registrationDetails.address.measuresRequested,
    };
};

export default connect(mapStateToProps)(RegistrationMeasuresRequestedList);