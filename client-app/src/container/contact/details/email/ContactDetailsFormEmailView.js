import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const ContactDetailsFormEmailView = props => {
    const { email, typeId, primary } = props.emailAddress;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-2">
                    <GetNameByIdHelper id={typeId} items={props.emailAddressTypes} />
                </div>
                <div className="col-sm-7">{email}</div>
                <div className="col-sm-2">{primary ? <span className="pull-right">Primair</span> : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.permissions.updateContactEmail && props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                {props.permissions.deleteContactEmail && props.showActionButtons ? (
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
        emailAddressTypes: state.systemData.emailAddressTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormEmailView);
