import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import DocumentTemplateDeleteItem from './DocumentTemplateDeleteItem';
import DocumentTemplateDetailsDuplicate from './DocumentTemplateDetailsDuplicate';

// Functionele wrapper voor de class component
const DocumentTemplateDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <DocumentTemplateDetailsToolbar {...props} navigate={navigate} />;
};

class DocumentTemplateDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
            showDuplicate: false,
        };
    }

    toggleDuplicate = () => {
        this.setState({ showDuplicate: !this.state.showDuplicate });
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        const { permissions = {} } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                        {permissions.createDocumentTemplate && (
                            <ButtonIcon iconName={'copy'} onClickAction={this.toggleDuplicate} />
                        )}
                        {permissions.createDocumentTemplate && (
                            <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">{'Document template: ' + this.props.templateName}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <DocumentTemplateDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        templateName={this.props.templateName}
                        templateId={this.props.templateId}
                    />
                )}
                {this.state.showDuplicate && (
                    <DocumentTemplateDetailsDuplicate
                        closeModal={this.toggleDuplicate}
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
        templateName: state.documentTemplateDetails.name,
        templateId: state.documentTemplateDetails.id,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(DocumentTemplateDetailsToolbarWrapper);
