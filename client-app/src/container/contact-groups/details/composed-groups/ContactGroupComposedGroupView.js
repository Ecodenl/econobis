import React from 'react';
import {hashHistory} from "react-router";

const ContactGroupComposedGroupView = props => {
    const {id, name} = props.composedGroup;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={() => hashHistory.push(`/contacten-in-groep/${id}`)}>
                <div className="col-sm-12">{name}</div>
            </div>
        </div>
    );
};

export default ContactGroupComposedGroupView;
