import React from 'react';
import { hashHistory } from 'react-router';

const ContactDetailsGroupView = props => {
    const {id, name, type } = props.group;

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={() => hashHistory.push(`/contact-groep/${id}`)}>
                <div className="col-sm-8">{name}</div>
                <div className="col-sm-4">{type.name}</div>
            </div>
        </div>
    );
};

export default ContactDetailsGroupView;
