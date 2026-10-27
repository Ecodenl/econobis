import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import EmailTemplateFormEdit from './EmailTemplateFormEdit';
import EmailTemplateFormView from './EmailTemplateFormView';

class EmailTemplateFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        if (!this.props.permissions.manageEmailTemplate) {
            return;
        }

        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        if (!this.props.permissions.manageEmailTemplate) {
            return;
        }

        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    {this.state.showEdit && this.props.permissions.manageEmailTemplate ? (
                        <EmailTemplateFormEdit switchToView={this.switchToView} />
                    ) : (
                        <EmailTemplateFormView
                            switchToEdit={this.props.permissions.manageEmailTemplate ? this.switchToEdit : null}
                        />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        emailTemplate: state.emailTemplateDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(EmailTemplateFormGeneral);
