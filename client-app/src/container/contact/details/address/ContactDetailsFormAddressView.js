import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';

const ContactDetailFormAddressView = props => {
    const {typeId, street, number, postalCode, city, primary, country, deletedAt } = props.address;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-1">
                    {deletedAt ?
                        <span className="h5" style={{color: '#e64a4a'}}><strong>Verwijderd</strong></span>
                        :
                        <GetNameByIdHelper id={typeId} items={props.addressTypes}/>
                    }
                </div>
                <div className="col-sm-2">
                    { street + ' ' + number }
                </div>
                <div className="col-sm-2">
                    { postalCode }
                </div>
                <div className="col-sm-2">
                    { city }
                </div>
                <div className="col-sm-2">
                    { country ? country.name : 'Onbekend' }
                </div>
                <div className="col-sm-2">
                    { primary ? <span className="h6 pull-right">Primair</span> : '' }
                </div>
            </div>
            {!deletedAt &&
            <div className="col-sm-1">
                {(props.showActionButtons ? <a role="button" onClick={props.openEdit}><span
                    className="glyphicon glyphicon-pencil mybtn-success"/> </a> : '')}
                {(props.showActionButtons ? <a role="button" onClick={props.toggleDelete}><span
                    className="glyphicon glyphicon-trash mybtn-danger"/> </a> : '')}
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        addressTypes: state.systemData.addressTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailFormAddressView);
