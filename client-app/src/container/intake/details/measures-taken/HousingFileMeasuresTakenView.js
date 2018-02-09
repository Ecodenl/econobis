import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';

const IntakeMeasuresTakenView = props => {
    const {name, measureDate, energyLabelId} = props.measureTaken;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
          <div>
            <div className="col-sm-4">
                { name }
            </div>
            <div className="col-sm-3">
                { measureDate && moment(measureDate.date).format('L') }
            </div>
            <div className="col-sm-4">
                <GetNameByIdHelper id={energyLabelId} items={props.energyLabels} />
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

export default connect(mapStateToProps, null)(IntakeMeasuresTakenView);