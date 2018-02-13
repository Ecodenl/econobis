import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";

moment.locale('nl');

const HousingFileMeasuresTakenView = props => {
    const {id, name, measureTakenDate} = props.measureTaken;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()}
             onMouseLeave={() => props.onLineLeave()}>
                <div>
                    <div className="col-sm-6">
                        {name}
                    </div>
                    <div className="col-sm-5">
                        {measureTakenDate && moment(measureTakenDate).format('L')}
                    </div>
                </div>
            <div className="col-sm-1">
                {(props.permissions.manageHousingFile && props.showActionButtons ?
                    <a role="button" onClick={props.toggleDelete}><span
                        className="glyphicon glyphicon-trash mybtn-danger"/> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(HousingFileMeasuresTakenView);