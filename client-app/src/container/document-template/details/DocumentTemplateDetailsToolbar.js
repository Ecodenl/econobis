import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const DocumentTemplateDetailsToolbar = props => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center">{'Document template: ' + props.templateName}</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        templateName: state.emailTemplate.name,
    };
};

export default connect(mapStateToProps, null)(DocumentTemplateDetailsToolbar);