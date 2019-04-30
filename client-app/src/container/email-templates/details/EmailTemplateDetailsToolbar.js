import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import EmailTemplateDeleteItem from './general/EmailTemplateDeleteItem';

class EmailTemplateDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">{'E-mail template: ' + this.props.templateName}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <EmailTemplateDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        templateName={this.props.templateName}
                        templateId={this.props.templateId}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        templateName: state.emailTemplate.name,
        templateId: state.emailTemplate.id,
    };
};

export default connect(
    mapStateToProps,
    null
)(EmailTemplateDetailsToolbar);
