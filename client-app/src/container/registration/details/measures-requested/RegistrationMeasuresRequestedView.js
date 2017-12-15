import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const RegistrationMeasuresRequestedView = props => {
    const {name, desiredDate, degreeInterest } = props.measureRequested;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
          <div>
            <div className="col-sm-4">
                { name }
            </div>
            <div className="col-sm-3">
                { desiredDate && moment(desiredDate.date).format('L') }
            </div>
            <div className="col-sm-4">
                { degreeInterest }
            </div>
          </div>
          <div className="col-sm-1">
              {(props.permissions.manageRegistration && props.showActionButtons ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
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

export default connect(mapStateToProps, null)(RegistrationMeasuresRequestedView);