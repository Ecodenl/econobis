import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import DocumentDetailsFormEdit from './DocumentFormEdit';
import DocumentDetailsFormView from './DocumentFormView';
import DocumentDetailsFormProjectEdit from './DocumentFormProjectEdit';
import DocumentDetailsFormProjectView from './DocumentFormProjectView';
import DocumentDetailsFormParticipantEdit from './DocumentFormParticipantEdit';
import DocumentDetailsFormAdministrationEdit from './DocumentFormAdministrationEdit';
import DocumentDetailsFormParticipantView from './DocumentFormParticipantView';
import DocumentDetailsFormAdministrationView from './DocumentFormAdministrationView';

class DocumentDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
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
                    {this.state.showEdit && this.props.permissions.createDocument ? (
                        this.props.documentCreatedFrom.codeRef === 'project' ? (
                            <DocumentDetailsFormProjectEdit switchToView={this.switchToView} />
                        ) : this.props.documentCreatedFrom.codeRef === 'participant' ? (
                            <DocumentDetailsFormParticipantEdit switchToView={this.switchToView} />
                        ) : this.props.documentCreatedFrom.codeRef === 'administration' ? (
                            <DocumentDetailsFormAdministrationEdit switchToView={this.switchToView} />
                        ) : (
                            <DocumentDetailsFormEdit switchToView={this.switchToView} />
                        )
                    ) : this.props.documentCreatedFrom.codeRef === 'project' ? (
                        <DocumentDetailsFormProjectView switchToEdit={this.switchToEdit} />
                    ) : this.props.documentCreatedFrom.codeRef === 'participant' ? (
                        <DocumentDetailsFormParticipantView switchToEdit={this.switchToEdit} />
                    ) : this.props.documentCreatedFrom.codeRef === 'administration' ? (
                        <DocumentDetailsFormAdministrationView switchToEdit={this.switchToEdit} />
                    ) : (
                        <DocumentDetailsFormView switchToEdit={this.switchToEdit} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        documentCreatedFrom: state.documentDetails.documentCreatedFrom,
    };
};

export default connect(mapStateToProps)(DocumentDetailsFormGeneral);
