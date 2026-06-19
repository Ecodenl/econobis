import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const AdministrationsListToolbar = props => {
    const navigate = useNavigate();

    const newAdministration = () => {
        navigate(`/administratie/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshAdministrationsData} />
                    {props.permissions.manageFinancial && (
                        <ButtonIcon iconName={'plus'} onClickAction={newAdministration} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Administraties</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {props.administrations ? props.administrations.length : 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        administrations: state.administrations,
    };
};

export default connect(mapStateToProps, null)(AdministrationsListToolbar);
