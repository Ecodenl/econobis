import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const MeasureDetailsFaqView = props => {
    const navigate = useNavigate();

    const { id, question, answer } = props.faq;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-5">{question}</div>
                <div className="col-sm-6">{answer}</div>
            </div>
            <div className="col-sm-1">
                {props.permissions.manageMeasure && props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                &nbsp;
                {props.showActionButtons && props.permissions.manageMeasure ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MeasureDetailsFaqView);
