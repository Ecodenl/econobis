import React from 'react';
import {connect} from 'react-redux';

import IntakeMeasuresItem from "./IntakeMeasuresTakenItem";

const IntakeMeasuresTakenList = props => {
    return (
        <div>
          <div className="row border header">
            <div className="col-sm-4">Maatregel</div>
            <div className="col-sm-3">Gerealiseerd datum</div>
            <div className="col-sm-4">Energie label</div>
            <div className="col-sm-1"></div>
          </div>
            {
                props.measuresTaken.length > 0 ?
                    props.measuresTaken.map((measureTaken, i) => {
                        return <IntakeMeasuresItem
                            key={i}
                            measureTaken={measureTaken}
                        />;
                    })
                    :
                    <div>Geen maatregelen genomen bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        measuresTaken: state.intakeDetails.address.measuresTaken,
    };
};

export default connect(mapStateToProps)(IntakeMeasuresTakenList);