import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const PostalCodeLinkListToolbar = props => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.refreshPostalCodeLinksData} />
                    <ButtonIcon iconName={'glyphicon-plus'} onClickAction={props.toggleShowNew} />
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

export default connect(
    mapStateToProps,
    null
)(PostalCodeLinkListToolbar);
