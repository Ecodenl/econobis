import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

const AdministrationDetailsSepasView = props => {
    const { id, name, createdAt, type } = props.sepa;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-3">{id}</div>
                <div className="col-sm-3">{name}</div>
                <div className="col-sm-3">{createdAt ? moment(createdAt).format('L') : ''}</div>
                <div className="col-sm-2">{type ? type.name : ''}</div>
                <div className="col-sm-1">
                    {props.showActionButtons && props.permissions.manageFinancial ? (
                        <a role="button" onClick={() => props.downloadSepa(id)}>
                            <span className="glyphicon glyphicon-open-file mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {props.showActionButtons && props.permissions.manageFinancial ? (
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsSepasView);
