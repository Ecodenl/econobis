import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const MeasureDetailsFaqView = props => {
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
                        <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                    </a>
                ) : (
                    ''
                )}
                {props.showActionButtons && props.permissions.manageMeasure ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
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
