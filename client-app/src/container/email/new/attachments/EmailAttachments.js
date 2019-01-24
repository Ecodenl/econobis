import React, { Component } from 'react';

import EmailAttachmentsList from './EmailAttachmentsList';
import EmailAttachmentsNew from './EmailAttachmentsNew';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import Panel from '../../../../components/panel/Panel';

class EmailAttachments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Bijlagen</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                        <span className="glyphicon glyphicon-plus" />
                    </a>
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
