import React from 'react';
import {connect} from 'react-redux';

import HousingFileMeasuresTakenItem from "./HousingFileMeasuresTakenItem";

const HousingFileMeasuresTakenList = props => {
    return (
        <div>
          <div className="row border header">
            <div className="col-sm-11">Maatregel</div>
            <div className="col-sm-1"></div>
          </div>
            {
                props.measuresTaken.length > 0 ?
                    props.measuresTaken.map((measureTaken, i) => {
                        return <HousingFileMeasuresTakenItem
                            key={i}
                            measureTaken={measureTaken}
                        />;
                    })
                    :
                    <div>Geen interesses bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        measuresTaken: state.housingFileDetails.measuresTaken,
    };
};

export default connect(mapStateToProps)(HousingFileMeasuresTakenList);