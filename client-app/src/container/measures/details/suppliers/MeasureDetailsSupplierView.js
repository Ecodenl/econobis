import React from 'react';
import {connect} from "react-redux";
import { hashHistory } from 'react-router';

const MeasureDetailsSupplierView = props => {
    const {id, name, address, contactId} = props.supplier;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
        <div onClick={() => hashHistory.push(`/contact/${contactId}`)}>
            <div className="col-sm-5" >{name}</div>
                <div className="col-sm-6">{ address ? address.city : 'Niet bekend' }</div>
        </div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.manageMeasure ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(MeasureDetailsSupplierView);
