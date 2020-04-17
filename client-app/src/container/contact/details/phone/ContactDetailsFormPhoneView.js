import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';

const ContactDetailFormPhoneView = props => {
    const { number, typeId, primary } = props.phoneNumber;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-2">
                    <GetNameByIdHelper id={typeId} items={props.phoneNumberTypes} />
                </div>
                <div className="col-sm-7">{number}</div>
                <div className="col-sm-2 push">{primary ? <span className="pull-right">Primair</span> : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                    </a>
                ) : (
                    ''
                )}
                {props.showActionButtons ? (
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
        phoneNumberTypes: state.systemData.phoneNumberTypes,
    };
};

export default connect(
    mapStateToProps,
    null
)(ContactDetailFormPhoneView);
