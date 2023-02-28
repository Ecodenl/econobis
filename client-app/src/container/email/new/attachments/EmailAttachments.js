import React, { Component } from 'react';

import EmailAttachmentsList from './EmailAttachmentsList';
import EmailAttachmentsNew from './EmailAttachmentsNew';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import Panel from '../../../../components/panel/Panel';
import EmailAttachmentsDocument from './EmailAttachmentsDocument';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class EmailAttachments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            selectDocument: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    toggleSelectDocument = () => {
        this.setState({
            selectDocument: !this.state.selectDocument,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Bijlagen</span>
                    <div className="nav navbar-nav btn-group pull-right" role="group">
                        <button className="btn btn-link" data-toggle="dropdown">
                            <Icon size={14} icon={plus} />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="btn" onClick={this.toggleSelectDocument}>
                                    Kies een document
                                </a>
                            </li>
                            <li>
                                <a className="btn" onClick={this.toggleShowNew}>
                                    Upload bijlage
                                </a>
                            </li>
                        </ul>
                    </div>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <EmailAttachmentsList
                            attachments={this.props.attachments}
                            deleteAttachment={this.props.deleteAttachment}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && (
                            <EmailAttachmentsNew
                                toggleShowNew={this.toggleShowNew}
                                addAttachment={this.props.addAttachment}
                            />
                        )}
                        {this.state.selectDocument && (
                            <EmailAttachmentsDocument
                                toggleSelectDocument={this.toggleSelectDocument}
                                addDocumentAsAttachment={this.props.addDocumentAsAttachment}
                            />
                        )}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(EmailAttachments);
