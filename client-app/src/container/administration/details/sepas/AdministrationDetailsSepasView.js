import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";

const AdministrationDetailsSepasView = props => {
    const {id, name, createdAt, type} = props.sepa;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
        <div onDoubleClick={() => props.downloadSepa(id)}>
            <div className="col-sm-3" >{id}</div>
            <div className="col-sm-3">{name}</div>
            <div className="col-sm-3">{createdAt ? moment(createdAt.date).format('L') : ''}</div>
            <div className="col-sm-3">{type ? type.name : ''}</div>
        </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(AdministrationDetailsSepasView);
