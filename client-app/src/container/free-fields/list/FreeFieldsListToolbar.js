import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

function FreeFieldsListToolbar({ freeFieldsTotal, refreshFreeFieldsFields, permissions }) {
    const newFreeFieldsField = () => {
        hashHistory.push(`/vrije-velden/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshFreeFieldsFields} />
                    {permissions.manageFreeFields && (
                        <ButtonIcon iconName={'plus'} onClickAction={newFreeFieldsField} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Vrije velden</h3>
            </div>
            <div className="col-md-4">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="pull-right">Resultaten: {freeFieldsTotal}</div>
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

export default connect(mapStateToProps, null)(FreeFieldsListToolbar);
