import React from 'react';
import { connect } from 'react-redux';

const TeamDetailsDocumentCreatedFormsView = props => {
    const { id, name } = props.documentCreatedFrom;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div className="col-sm-11">{name}</div>
            <div className="col-sm-1">
                {props.showActionButtons && props.permissions.createTeam ? (
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

export default connect(mapStateToProps)(TeamDetailsDocumentCreatedFormsView);
