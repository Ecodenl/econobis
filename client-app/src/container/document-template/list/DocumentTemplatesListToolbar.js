import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { connect } from 'react-redux';

const DocumentTemplatesListToolbar = props => {
    const navigate = useNavigate();

    const newDocumentTemplate = () => {
        navigate(`/document-template/nieuw`);
    };

    const { permissions = {} } = props;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshDocumentTemplatesData} />
                    {permissions.createDocumentTemplate && (
                        <ButtonIcon iconName={'plus'} onClickAction={newDocumentTemplate} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Document templates</h3>
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

export default connect(mapStateToProps)(DocumentTemplatesListToolbar);
