import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

const ContactGroupComposedGroupView = props => {
    const navigate = useNavigate();

    const { id, name } = props.composedGroup;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-11" onClick={() => navigate(`/contact-groep/${id}`)}>
                    {name}
                </div>
                <div className="col-sm-1">
                    {props.showActionButtons ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactGroupComposedGroupView;
