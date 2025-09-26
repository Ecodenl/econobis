import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const WebformsListToolbar = props => {
    const navigate = useNavigate();

    const newWebform = () => {
        navigate(`/webformulier/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshWebformsData} />
                    {props.permissions.manageWebform && <ButtonIcon iconName={'plus'} onClickAction={newWebform} />}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Webformulieren</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {props.webforms ? props.webforms.length : 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        webforms: state.webforms,
    };
};

export default connect(mapStateToProps, null)(WebformsListToolbar);
