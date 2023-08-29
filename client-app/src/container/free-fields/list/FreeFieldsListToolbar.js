import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const FreeFieldsListToolbar = props => {
    const { meta = {} } = props.freeFields;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.resetFreeFieldsFilters} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Vrije velden</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        freeFields: state.freeFields.list,
    };
};

export default connect(mapStateToProps, null)(FreeFieldsListToolbar);
