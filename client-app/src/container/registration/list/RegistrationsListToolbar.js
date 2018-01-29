import React from 'react';
import {connect} from "react-redux";

import ButtonIcon from '../../../components/button/ButtonIcon';

const RegistrationsListToolbar = props => {
    const { meta = {} } = props.registrations;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.resetRegistrationFilters} />
                </div>
            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Aanmeldingen</h3></div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: { meta.total || 0 }</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        registrations: state.registrations.list,
    };
};

export default connect(mapStateToProps, null)(RegistrationsListToolbar);