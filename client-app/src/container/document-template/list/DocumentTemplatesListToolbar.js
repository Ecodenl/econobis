import React from 'react';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const DocumentTemplatesListToolbar = props => {
    const newDocumentTemplate = () => {
        hashHistory.push(`/document-template/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.refreshDocumentTemplatesData} />
                    <ButtonIcon iconName={"glyphicon-plus"} onClickAction={newDocumentTemplate} />
                </div>
            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Document templates</h3></div>
            <div className="col-md-4" />
        </div>
    );
};

export default DocumentTemplatesListToolbar;