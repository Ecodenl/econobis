import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const PostalCodeLinkListToolbar = props => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshPostalCodeLinksData} />
                    <ButtonIcon iconName={'plus'} onClickAction={props.toggleShowNew} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Postcoderoos</h3>
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

export default connect(mapStateToProps, null)(PostalCodeLinkListToolbar);
