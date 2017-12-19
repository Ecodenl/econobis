import React from 'react';
import {connect} from "react-redux";
import { hashHistory } from 'react-router';

const CampaignDetailsOrganisationView = props => {
    const {id, name, contact, requestedQutations, wonQuotations} = props.organisation;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
               <div onClick={() => hashHistory.push(`/contact/${id}`)}>
                <div className="col-sm-2">{id}</div>
                <div className="col-sm-2">{name}</div>
                <div className="col-sm-2">{ contact ? contact.city : '' }</div>
                <div className="col-sm-2">{ contact ? contact.fullName : '' }</div>
                <div className="col-sm-2">{requestedQutations}</div>
                <div className="col-sm-1">{wonQuotations}</div>
               </div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.manageMarketing ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(CampaignDetailsOrganisationView);
