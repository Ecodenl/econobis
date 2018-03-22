import React from 'react';
import { connect } from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const DocumentDetailsToolbar = props => {
    const {documentFilename = ''} = props;
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={props.download} />
                    {documentFilename.endsWith('.pdf') &&
                    <ButtonIcon iconName={"glyphicon-eye-open"} onClickAction={() => hashHistory.push(`/document/inzien/${props.documentId}`)} />
                    }
                    <ButtonIcon iconName={"glyphicon-envelope"} onClickAction={() => hashHistory.push(`/email/nieuw/document/${props.documentId}`)} />
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center">{'Document: ' + documentFilename}</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        documentFilename: state.documentDetails.filename,
        documentId: state.documentDetails.id,
    };
};

export default connect(mapStateToProps, null)(DocumentDetailsToolbar);