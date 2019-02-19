import React from 'react';
import { hashHistory } from 'react-router';

const ContactGroupComposedGroupView = props => {
    const { id, name } = props.composedGroup;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-11" onClick={() => hashHistory.push(`/contact-groep/${id}`)}>
                    {name}
                </div>
                <div className="col-sm-1">
                    {props.showActionButtons ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
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
