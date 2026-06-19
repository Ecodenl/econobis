import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { connect } from 'react-redux';

const UsersListToolbar = props => {
    const navigate = useNavigate();

    const newUser = () => {
        navigate(`/gebruiker/nieuw`);
    };

    const { permissions = {} } = props;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon
                        iconName={'refresh'}
                        onClickAction={props.refreshContactsData}
                        title="Vernieuwen scherm"
                    />
                    {permissions.manageUser ? (
                        <>
                            <ButtonIcon
                                iconName={'cog'}
                                onClickAction={props.getRolesPermissionsExcel}
                                title="Downloaden roles/permissions naar Excel"
                            />
                            <ButtonIcon iconName={'plus'} onClickAction={newUser} title="Toevoegen gebruiker" />
                        </>
                    ) : null}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Gebruikers</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(UsersListToolbar);
