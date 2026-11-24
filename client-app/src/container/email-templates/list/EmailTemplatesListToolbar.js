import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

const EmailTemplatesListToolbar = props => {
    const navigate = useNavigate();

    const newEmailTemplate = () => {
        navigate(`/email-template/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshEmailTemplatesData} />
                    {props.permissions.manageEmailTemplate && (
                        <ButtonIcon iconName={'plus'} onClickAction={newEmailTemplate} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">E-mail templates</h3>
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

export default connect(mapStateToProps)(EmailTemplatesListToolbar);
