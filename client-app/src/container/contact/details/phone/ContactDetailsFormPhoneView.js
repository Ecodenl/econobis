import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const ContactDetailsFormPhoneView = props => {
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
                {props.permissions.updateContactPhone && props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                {props.permissions.deleteContactPhone && props.showActionButtons ? (
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
        phoneNumberTypes: state.systemData.phoneNumberTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormPhoneView);
