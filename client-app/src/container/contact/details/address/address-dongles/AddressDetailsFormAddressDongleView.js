import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
moment.locale('nl');

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';
import GetNameByIdHelper from '../../../../../helpers/GetNameByIdHelper';

const AddressDetailsFormAddressDongleView = props => {
    const { typeReadOut, dateStart } = props.addressDongle;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-3">
                    <GetNameByIdHelper id={typeReadOut} items={props.typesReadOut} />
                </div>
                <div className="col-sm-8">{dateStart ? moment(dateStart).format('L') : 'Onbekend'}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons && props.addressDongleNewOrEditOpen == false ? (
                    <>
                        {/*{props.permissions.updateContactAddress ? (*/}
                        <a role="button" onClick={props.openEdit} title="Wijzigen Dongel">
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                        {/*) : ( '' )}*/}
                        {/*{props.permissions.deleteContactAddress ? (*/}
                        <a role="button" onClick={props.toggleDelete} title="Verwijderen dongel">
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                        {/*) : (*/}
                        {/*    ''*/}
                        {/*)}*/}
                    </>
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
        typesReadOut: state.systemData.dongleTypeReadOut,
    };
};

export default connect(mapStateToProps)(AddressDetailsFormAddressDongleView);