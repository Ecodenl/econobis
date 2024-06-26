import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

function ContactsToImportListToolbar({ ContactsToImportTotal, refreshContactsToImport, permissions }) {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshContactsToImport} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Signaleringslijst importeren Energieklanten</h3>
            </div>
            <div className="col-md-4">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="pull-right">Resultaten: {ContactsToImportTotal}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ContactsToImportListToolbar);
