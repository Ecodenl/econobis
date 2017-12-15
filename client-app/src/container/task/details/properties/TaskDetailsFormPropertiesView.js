import React from 'react';
import {connect} from "react-redux";

const TaskDetailFormPropertiesView = props => {
    const { value, property } = props.property;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-6">{property.name}</div>
                <div className="col-sm-5">{value}</div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.manageTask ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(TaskDetailFormPropertiesView);