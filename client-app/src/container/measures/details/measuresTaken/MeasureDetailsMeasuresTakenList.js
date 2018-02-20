import React from 'react';
import {connect} from 'react-redux';

import MeasureDetailsMeasureTakenItem from "./MeasureDetailsMeasureTakenItem";

const MeasureDetailsMeasureTakenList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Woningdossier</div>
                <div className="col-sm-4">Adres</div>
                <div className="col-sm-4">Contact</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.measuresTaken.length > 0 ?
                    props.measuresTaken.map(measureTaken => {
                        return <MeasureDetailsMeasureTakenItem
                            key={measureTaken.id}
                            measureTaken={measureTaken}
                        />;
                    })
                    :
                    <div>Geen woningdossiers bekend die deze maatregel hebben genomen</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        measuresTaken: state.measureDetails.measuresTaken,
    };
};
export default connect(mapStateToProps)(MeasureDetailsMeasureTakenList);

