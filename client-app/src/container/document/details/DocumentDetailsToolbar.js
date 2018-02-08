import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const DocumentDetailsToolbar = props => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={props.download} />
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center">{'Document: ' + props.documentFilename}</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        documentFilename: state.documentDetails.filename,
    };
};

export default connect(mapStateToProps, null)(DocumentDetailsToolbar);