import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';

const RegistrationMeasuresTakenView = props => {
    const {pivot, createdAt, energyLabel} = props.measureTaken;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
          <div onClick={props.openEdit}>
            <div className="col-sm-4">
              <GetNameByIdHelper id={1} items={props.measures} />
            </div>
            <div className="col-sm-3">
                {''}
            </div>
            <div className="col-sm-4">
                { energyLabel }
            </div>
          </div>
          <div className="col-sm-1">
              {(props.showActionButtons ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
              {(props.showActionButtons ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
          </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        measures: state.systemData.measures,
    };
};

export default connect(mapStateToProps, null)(RegistrationMeasuresTakenView);