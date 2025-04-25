import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactDetailsGroupView = props => {
    const navigate = useNavigate();

    const { id, name, type } = props.group;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => navigate(`/contact-groep/${id}`)}>
                <div className="col-sm-8">{name}</div>
                <div className="col-sm-4">{type.name}</div>
            </div>
        </div>
    );
};

export default ContactDetailsGroupView;
