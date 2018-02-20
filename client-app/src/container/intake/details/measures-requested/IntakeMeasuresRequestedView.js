import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {hashHistory, Link} from "react-router";
import ButtonText from "../../../../components/button/ButtonText";
moment.locale('nl');

const IntakeMeasuresRequestedView = props => {
    const {name} = props.measureRequested;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()}
             onMouseLeave={() => props.onLineLeave()}>
                <div>
                    <div className="col-sm-6">
                        {name}
                    </div>
                    <div className="col-sm-5">
                        {
                            props.permissions.manageOpportunity &&
                            <ButtonText buttonText={"Maak kans"} onClickAction={() => hashHistory.push(`/kans/nieuw/intake/${props.intakeId}`)} buttonClassName={'btn-success btn-padding-small'}/>
                        }
                    </div>
                </div>
            <div className="col-sm-1">
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
        permissions: state.meDetails.permissions,
        intakeId: state.intakeDetails.id
    };
};

export default connect(mapStateToProps, null)(IntakeMeasuresRequestedView);