import React, { Component } from 'react';

import ConceptAttachmentsList from './ConceptAttachmentsList';
import ConceptAttachmentsNew from './ConceptAttachmentsNew';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class ConceptAttachments extends Component {
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
            <div>
                <PanelHeader>
                    <span className="h5 text-bold">Bijlages</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                        <Icon size={14} icon={plus} />
                    </a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ConceptAttachmentsList
                            attachments={this.props.attachments}
                            deleteAttachment={this.props.deleteAttachment}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && (
                            <ConceptAttachmentsNew
                                toggleShowNew={this.toggleShowNew}
                                addAttachment={this.props.addAttachment}
                            />
                        )}
                    </div>
                </PanelBody>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ConceptAttachments);
