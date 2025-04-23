import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import EmailTemplateDeleteItem from './general/EmailTemplateDeleteItem';

// Functionele wrapper voor de class component
const EmailTemplateDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <EmailTemplateDetailsToolbar {...props} navigate={navigate} />;
};

class EmailTemplateDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
    };

    render() {
        const { navigate } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                        <ButtonIcon iconName={'trash'} onClickAction={this.showDeleteModal} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">{'E-mail template: ' + (this.props.templateName || '...')}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <EmailTemplateDeleteItem
                        closeDeleteItemModal={this.hideDeleteModal}
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
        templateName: state.emailTemplateDetails.name,
        templateId: state.emailTemplateDetails.id,
    };
};

export default connect(mapStateToProps, null)(EmailTemplateDetailsToolbarWrapper);
