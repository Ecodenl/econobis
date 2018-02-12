import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');

const IntakeMeasuresRequestedView = props => {
    const {name} = props.measureRequested;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()}
             onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div>
                    <div className="col-sm-11">
                        {name}
                    </div>
                </div>
            </div>
            <div className="col-sm-1">
                {(props.permissions.manageIntake && props.showActionButtons ?
                    <a role="button" onClick={props.openEdit}><span
                        className="glyphicon glyphicon-pencil mybtn-success"/> </a> : '')}
                {(props.permissions.manageIntake && props.showActionButtons ?
                    <a role="button" onClick={props.toggleDelete}><span
                        className="glyphicon glyphicon-trash mybtn-danger"/> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        energyLabels: state.systemData.energyLabels,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(IntakeMeasuresRequestedView);